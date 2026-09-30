import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const requireProductionConfig = process.argv.includes("--production");
if (requireProductionConfig) {
  const contact = readFileSync(new URL("../out/contact/index.html", import.meta.url), "utf8");
  assert(contact.includes('class="inquiry-verification"'), "Production export must include verification; configure NEXT_PUBLIC_TURNSTILE_SITE_KEY before building.");
  assert(contact.includes("Send enquiry"), "Production export must expose online enquiry submission.");
  const mode = process.env.NEXT_PUBLIC_ANALYTICS_MODE || "ga4";
  assert(["ga4", "gtm"].includes(mode), "Unknown production analytics mode.");
  assert(mode === "gtm"
    ? /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID || "")
    : /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA4_ID || ""), "The selected production analytics mode needs a valid public identifier.");
}

// Own an ephemeral-port preview so checks cannot accidentally hit another
// project, reuse stale output, or interrupt the user's preview server.
const preview = fork(new URL("./serve-static.mjs", import.meta.url), [], {
  cwd: projectRoot, env: { ...process.env, ANWELLUP_PREVIEW_PORT: "0" }, stdio: ["ignore", "inherit", "inherit", "ipc"],
});
const closed = new Promise(resolve => preview.once("close", resolve));
try {
  const port = await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Release preview did not become ready.")), 15000);
    const cleanup = () => { clearTimeout(timer); preview.off("message", onMessage); preview.off("error", onError); preview.off("exit", onExit); };
    const onMessage = message => {
      if (message?.type === "ready" && Number.isInteger(message.port) && message.port > 0) { cleanup(); resolve(message.port); }
    };
    const onError = error => { cleanup(); reject(error); };
    const onExit = code => { cleanup(); reject(new Error(`Release preview exited before readiness (${code}).`)); };
    preview.on("message", onMessage); preview.on("error", onError); preview.on("exit", onExit);
  });
  for (const script of ["check-site.mjs", "audit-images.mjs"]) {
    await new Promise((resolve, reject) => {
      const child = fork(new URL(script, import.meta.url), [], {
        cwd: projectRoot, env: { ...process.env, ANWELLUP_PREVIEW_PORT: String(port) }, stdio: ["ignore", "inherit", "inherit", "ipc"],
      });
      child.once("error", reject);
      child.once("exit", (code, signal) => code === 0 ? resolve() : reject(new Error(`${script} failed (${signal || code}).`)));
    });
  }
  console.log("PASS: exported pages, catalogue, internal resources and image assets. Browser interaction and live email delivery still require separate verification.");
} finally {
  if (preview.exitCode === null && preview.signalCode === null) preview.kill();
  await closed;
}
