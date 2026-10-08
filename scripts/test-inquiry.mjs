import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import worker from "../workers/inquiry-api/worker.js";

function load(file, extra = {}) {
  const module = { exports: {} };
  const context = vm.createContext({ module, exports: module.exports, process: { env: {} }, fetch: (...args) => globalThis.fetch(...args), AbortSignal, Error, ...extra });
  vm.runInContext(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText, context);
  return module.exports;
}
const { emptyInquiry, inquiryValidation, inquiryMessage, submitInquiry } = load("src/lib/inquiry.ts");
const draft = { ...emptyInquiry, name: "Sample buyer", email: "buyer@example.invalid", notes: "Bagasse containers for a sample review", market: "Destination to confirm" };
const items = [{ sku: "AW-BG-H66", name: "Bagasse clamshell", category: "Containers" }];
assert(inquiryValidation(emptyInquiry, [], true, "token").includes("name"));
assert(inquiryValidation({ ...draft, email: "invalid" }, [], true, "token").includes("email"));
assert(inquiryValidation({ ...draft, notes: "" }, [], true, "token").includes("describe"));
assert.equal(inquiryValidation({ ...draft, notes: "" }, items, true, "token"), "");
assert(inquiryValidation(draft, items, false, "token").includes("privacy"));
assert(inquiryValidation(draft, items, true, "").includes("verification"));
assert(inquiryValidation(draft, Array(21).fill(items[0]), true, "token").includes("20"));
assert.equal(inquiryValidation(draft, [], true, "token"), "");
assert(inquiryMessage(draft, items).includes("AW-BG-H66"));
assert(inquiryMessage(draft, items).includes(draft.notes));

const realFetch = globalThis.fetch;
let calls = [];
const request = (changes = {}) => new Request("https://anwellup-inquiry-api.q919237359.workers.dev/submit", {
  method: "POST", headers: { "Content-Type": "application/json", Origin: "https://anwellup.com" },
  body: JSON.stringify({ ...draft, items, privacyAccepted: true, turnstileToken: "mock-token", ...changes }),
});
try {
  // All requests in this test use fake providers. No email or analytics is sent.
  globalThis.fetch = async (url, init) => { calls.push({ url, init }); throw new Error("Unexpected provider call"); };
  for (const body of [null, [], ["product"], "text", 1, true, false]) {
    const invalid = new Request(request(), { body: JSON.stringify(body) });
    const response = await worker.fetch(invalid, {});
    assert.equal(response.status, 400, "Only a top-level JSON object is an enquiry");
    assert.deepEqual(await response.json(), { ok: false, error: "Invalid enquiry data." });
  }
  assert.equal(calls.length, 0, "Invalid JSON shapes must not call security or email providers");
  const blocked = await worker.fetch(request({ turnstileToken: "" }), {});
  assert.equal(blocked.status, 400);
  assert.equal(calls.length, 0);
  const badOrigin = new Request(request(), { headers: { Origin: "https://unrelated.invalid", "Content-Type": "application/json" } });
  assert.equal((await worker.fetch(badOrigin, {})).status, 403);

  for (const verification of [{ success: false }, { success: true, hostname: "unrelated.invalid", action: "inquiry_submit" }, { success: true, hostname: "anwellup.com", action: "wrong" }]) {
    calls = [];
    globalThis.fetch = async (url, init) => { calls.push({ url, init }); return Response.json(verification); };
    assert.equal((await worker.fetch(request(), { TURNSTILE_SECRET: "mock" })).status, 400);
    assert.equal(calls.length, 1, "Failed verification must not call email delivery");
  }
  for (const emailStatus of [502, 200]) {
    calls = [];
    globalThis.fetch = async (url, init) => {
      calls.push({ url, init });
      return url.includes("siteverify") ? Response.json({ success: true, hostname: "anwellup.com", action: "inquiry_submit" }) : Response.json({ id: "mock-message" }, { status: emailStatus });
    };
    const response = await worker.fetch(request(), { TURNSTILE_SECRET: "mock", RESEND_API_KEY: "mock" });
    assert.equal(response.status, emailStatus === 200 ? 200 : 502);
    assert.equal(calls.length, 2);
    const email = JSON.parse(calls[1].init.body);
    assert.equal(email.reply_to, draft.email);
    assert.deepEqual(email.to, ["admin@anwellup.com"]);
    assert(email.text.includes("AW-BG-H66"));
    if (emailStatus === 200) assert.match((await response.json()).reference, /^AW-\d{8}-[A-F0-9]{8}$/);
  }
  const payload = { ...draft, items, privacyAccepted: true, turnstileToken: "mock", website: "", pageUrl: "https://anwellup.com/contact/" };
  for (const body of [{ ok: true }, { ok: false }, { ok: true, reference: "AW-RECEIVED" }, { ok: true, reference: "unexpected" }]) {
    globalThis.fetch = async () => Response.json(body);
    await assert.rejects(submitInquiry(payload));
  }
  globalThis.fetch = async () => Response.json({ ok: true, reference: "AW-20260930-ABCDEF12" });
  assert.equal(await submitInquiry(payload), "AW-20260930-ABCDEF12");
  globalThis.fetch = async () => Response.json({ ok: false }, { status: 502 });
  await assert.rejects(submitInquiry(payload));
} finally { globalThis.fetch = realFetch; }

// One event delivery route, including actions occurring before gtag loads.
const directWindow = { location: { hostname: "anwellup.com" } };
load("src/lib/analytics.ts", { window: directWindow }).trackEvent("email_click", { location: "test" });
assert.equal(directWindow.dataLayer.length, 1);
assert.equal(directWindow.dataLayer[0][0], "event");
assert.equal(directWindow.dataLayer[0][1], "email_click");
assert.equal(Object.prototype.toString.call(directWindow.dataLayer[0]), "[object Arguments]", "Google's gtag dispatcher does not treat Arrays as commands");
const earlyBootstrap = directWindow.gtag;
// The inline loader keeps an early bootstrap, so config and subsequent events
// must retain the same Arguments command shape as the standard Google snippet.
vm.runInNewContext(`window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date()); window.gtag('config', 'G-MOCK');`, { window: directWindow });
load("src/lib/analytics.ts", { window: directWindow }).trackEvent("generate_lead", { method: "website_form" });
assert.equal(directWindow.gtag, earlyBootstrap);
assert(directWindow.dataLayer.every(command => Object.prototype.toString.call(command) === "[object Arguments]"));
assert.deepEqual(Array.from(directWindow.dataLayer, command => command[0]), ["event", "js", "config", "event"]);
assert.equal(directWindow.dataLayer.at(-1)[1], "generate_lead");
const gtmWindow = { location: { hostname: "anwellup.com" } };
load("src/lib/analytics.ts", { window: gtmWindow, process: { env: { NEXT_PUBLIC_ANALYTICS_MODE: "gtm" } } }).trackEvent("whatsapp_click", { location: "test" });
assert.equal(gtmWindow.dataLayer.length, 1);
assert.equal(gtmWindow.dataLayer[0].event, "whatsapp_click");
assert.equal(gtmWindow.gtag, undefined);
const previewWindow = { location: { hostname: "127.0.0.1" } };
load("src/lib/analytics.ts", { window: previewWindow }).trackEvent("generate_lead");
assert.equal(previewWindow.dataLayer, undefined, "Local previews must not pollute production analytics");

// A drawer unmount/reopen must not abandon an in-flight request or its receipt.
const { createInquirySubmission } = load("src/lib/inquiry-submission.ts");
const payload = { ...draft, items, privacyAccepted: true, turnstileToken: "mock", website: "", pageUrl: "https://anwellup.com/contact/" };
let release;
let deliveries = 0;
const events = [];
const sender = createInquirySubmission(() => { deliveries++; return new Promise(resolve => { release = resolve; }); }, (...event) => events.push(event));
assert.equal(sender.getSnapshot(), sender.getSnapshot(), "Snapshots must be stable between changes");
assert.equal(sender.getSnapshot(), sender.getServerSnapshot(), "Server/client initial snapshots must match");
let drawerUpdates = 0;
const unmount = sender.subscribe(() => drawerUpdates++);
const first = sender.submit(payload, "rfq_drawer");
assert.equal(sender.getSnapshot().status, "sending");
assert.equal(sender.locked(), true);
assert.equal(sender.reset(), false, "Cannot clear an in-flight enquiry");
unmount();
await sender.submit(payload, "contact_page");
assert.equal(deliveries, 1, "Different forms must share one in-flight guard");
release("AW-20260930-ABCDEF12");
await first;
assert.equal(drawerUpdates, 1, "Unmounted listeners must no longer receive updates");
assert.equal(sender.getSnapshot().reference, "AW-20260930-ABCDEF12", "Receipt survives drawer unmount");
assert.equal(sender.getSnapshot().status, "accepted");
await sender.submit(payload, "rfq_drawer");
assert.equal(deliveries, 1, "Reopening a successful enquiry must not resubmit");
assert.deepEqual(events, [[true, "rfq_drawer", 1]], "Only one lead event, without buyer data");
assert.equal(sender.reset(), true);
assert.equal(sender.getSnapshot().status, "idle");
assert.equal(sender.locked(), false);

let attempts = 0;
const failures = [];
const retry = createInquirySubmission(async () => {
  if (++attempts === 1) throw Object.assign(new Error("Timeout"), { name: "TimeoutError" });
  return "AW-20260930-ABCDEF12";
}, (...event) => failures.push(event));
await retry.submit(payload, "contact_page");
assert.equal(retry.getSnapshot().status, "error");
assert.match(retry.getSnapshot().error, /may have been received/);
assert.equal(retry.locked(), false);
await retry.submit(payload, "contact_page");
assert.equal(retry.getSnapshot().status, "accepted");
assert.deepEqual(failures, [[false, "contact_page", 1], [true, "contact_page", 1]]);
const analyticsFailure = createInquirySubmission(async () => "AW-20260930-ABCDEF12", () => { throw new Error("Analytics unavailable"); });
await analyticsFailure.submit(payload, "contact_page");
assert.equal(analyticsFailure.getSnapshot().status, "accepted", "Analytics must not mask acceptance");

// Run the form's real effects and retry handler with controllable hooks/DOM.
// Script loading and Turnstile remain fake; no browser or provider is contacted.
function formHarness() {
  const scripts = [], hooks = [], pendingEffects = [];
  const browser = {};
  let cursor = 0, alive = true, lateUpdates = 0;
  const changed = (previous, next) => !previous || next.some((value, index) => value !== previous[index]);
  const react = {
    useId: () => "mock-form",
    useRef(initial) { const index = cursor++; return hooks[index] ??= { current: initial }; },
    useState(initial) {
      const index = cursor++;
      const state = hooks[index] ??= { value: initial };
      return [state.value, value => {
        if (!alive) { lateUpdates++; return; }
        state.value = typeof value === "function" ? value(state.value) : value;
      }];
    },
    useCallback(callback, dependencies) {
      const index = cursor++, previous = hooks[index];
      if (!previous || changed(previous.dependencies, dependencies)) hooks[index] = { callback, dependencies };
      return hooks[index].callback;
    },
    useEffect(effect, dependencies) {
      const index = cursor++, previous = hooks[index];
      if (!previous || changed(previous.dependencies, dependencies)) {
        const hook = hooks[index] = { dependencies, cleanup: previous?.cleanup };
        pendingEffects.push(() => { hook.cleanup?.(); hook.cleanup = effect(); });
      }
    },
  };
  const jsx = (type, props) => ({ type, props: props || {} });
  const imports = {
    react, "react/jsx-runtime": { jsx, jsxs: jsx }, "next/link": { default: "Link" },
    "./InquiryProvider": { useInquiry: () => ({ items, draft, updateDraft() {}, submission: { status: "idle", reference: "", error: "" }, sendInquiry() {}, startNewInquiry() {} }) },
    "../lib/contact": { CONTACT_EMAIL: "admin@example.invalid", emailInquiryUrl: () => "", whatsappInquiryUrl: () => "" },
    "../lib/inquiry": { inquiryMessage, inquiryValidation, turnstileSiteKey: "mock-site-key" },
    "../lib/analytics": { trackEvent() {} },
  };
  const dom = {
    createElement: () => ({ remove() { this.removed = true; } }),
    head: { appendChild(script) { scripts.push(script); } },
    getElementById: () => null,
  };
  const api = load("src/components/InquiryForm.tsx", { window: browser, document: dom, require: id => {
    assert(id in imports, `Unexpected component import: ${id}`);
    return imports[id];
  } });
  function walk(node, visitor) {
    if (Array.isArray(node)) { node.forEach(child => walk(child, visitor)); return; }
    if (!node || typeof node !== "object") return;
    visitor(node);
    walk(node.props?.children, visitor);
  }
  return {
    api, browser, scripts,
    render() {
      cursor = 0;
      const tree = api.InquiryForm({});
      walk(tree, node => { if (node.props?.ref) node.props.ref.current ??= { focus() {} }; });
      pendingEffects.splice(0).forEach(effect => effect());
      return tree;
    },
    retry(tree) {
      let button;
      walk(tree, node => { if (node.type === "button" && node.props.className === "text-button") button = node; });
      assert(button, "A failed load must offer verification retry");
      button.props.onClick();
    },
    unmount() { alive = false; hooks.forEach(hook => hook?.cleanup?.()); },
    lateUpdates: () => lateUpdates,
  };
}
const form = formHarness();
form.render();
const firstLoad = form.api.loadTurnstileApi();
assert.equal(firstLoad, form.api.loadTurnstileApi(), "Concurrent forms must share a pending script request");
assert.equal(form.scripts.length, 1);
form.scripts[0].onerror();
await assert.rejects(firstLoad);
assert.equal(form.scripts[0].removed, true, "Failed scripts must be removed before retry");
form.retry(form.render());
const reloaded = form.api.loadTurnstileApi();
assert.equal(form.scripts.length, 2, "Retry must issue a fresh script load");
const widgets = { rendered: 0, reset: [], removed: [], options: null };
form.browser.turnstile = {
  render(_container, options) { widgets.rendered++; widgets.options = options; return "mock-widget"; },
  reset(id) { widgets.reset.push(id); }, remove(id) { widgets.removed.push(id); },
};
form.scripts[1].onload();
await reloaded;
form.render();
assert.equal(widgets.rendered, 1, "A recovered load must render exactly one widget");
assert.equal(form.scripts[1].onload, null);
assert.equal(form.scripts[1].onerror, null);
widgets.options["error-callback"]();
form.retry(form.render());
assert.deepEqual(widgets.reset, ["mock-widget"], "A rendered widget should reset without reloading the API");
assert.equal(form.scripts.length, 2);
form.unmount();
assert.deepEqual(widgets.removed, ["mock-widget"], "Unmount must remove the owned widget");
assert.equal(form.lateUpdates(), 0);

const closedForm = formHarness();
closedForm.render();
const delayedLoad = closedForm.api.loadTurnstileApi();
closedForm.unmount();
let delayedRenders = 0;
closedForm.browser.turnstile = { render() { delayedRenders++; }, remove() {} };
closedForm.scripts[0].onload();
await delayedLoad;
assert.equal(delayedRenders, 0, "A late script load must not render into an unmounted form");
assert.equal(closedForm.lateUpdates(), 0, "A late script load must not update an unmounted form");
console.log("PASS: JSON object validation, product preservation, CORS, verification action/hostname, provider failure/success, reply-to, accepted-reference handling, GA4 Arguments bootstrap/GTM single delivery, shared submission lifecycle, duplicate-submit guard, timeout/retry, receipt preservation, verification script failure/reload/deduplication and widget cleanup. All providers mocked; no live email or analytics sent.");
