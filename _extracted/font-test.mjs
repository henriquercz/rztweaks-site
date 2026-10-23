import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";
const browser = await Browser.launch({ width: 1440, height: 900 });
const page = await browser.newPage({ width: 1440, height: 900 });
await page.goto("http://127.0.0.1:4173/_extracted/preview/first-screen.html", { settleMs: 900 });
const info = await page.eval(async () => {
  const status = await fetch("/assets/fonts/schibsted-grotesk-latin.woff2").then((r) => r.status).catch((e) => String(e));
  const faces = [...document.fonts].map((f) => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
  const load = await document.fonts.load('800 132px "Schibsted Grotesk"').then((f) => f.length).catch((e) => String(e));
  const h1 = document.querySelector("h1");
  return { status, faces, load, family: getComputedStyle(h1).fontFamily, check: document.fonts.check('800 132px "Schibsted Grotesk"') };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
