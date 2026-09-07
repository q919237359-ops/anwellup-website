const host = "anwellup.com";
const key = "a680f67e82022c38117b9661810d86dfdd6d8a4549fbbda6";
const keyLocation = `https://${host}/${key}.txt`;
const sitemapUrl = `https://${host}/sitemap.xml`;
const dryRun = process.argv.includes("--dry-run");

const sitemapResponse = await fetch(sitemapUrl, { headers: { "user-agent": "ANWELLUP-IndexNow/1.0" } });
if (!sitemapResponse.ok) throw new Error(`Could not read live sitemap: HTTP ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).filter(url => url.startsWith(`https://${host}/`));
if (!urlList.length) throw new Error("No ANWELLUP URLs found in live sitemap.");

const verificationResponse = await fetch(keyLocation, { cache: "no-store" });
const verificationBody = verificationResponse.ok ? (await verificationResponse.text()).trim() : "";
if (!dryRun && verificationBody !== key) throw new Error(`IndexNow key is not live at ${keyLocation}. Deploy before submitting.`);

const payload = { host, key, keyLocation, urlList };
if (dryRun) {
  console.log(JSON.stringify({ dryRun: true, keyLocation, urls: urlList.length, first: urlList[0], last: urlList.at(-1) }, null, 2));
} else {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow rejected the submission: HTTP ${response.status} ${await response.text()}`);
  console.log(JSON.stringify({ submitted: true, status: response.status, urls: urlList.length, keyLocation }, null, 2));
}
