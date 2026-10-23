import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const browser = await Browser.launch({ width: 1200, height: 630 });
const page = await browser.newPage({ width: 1200, height: 630 });
await page.goto("http://127.0.0.1:4173/_extracted/og.html", { settleMs: 1500 });
await page.eval(`document.fonts.ready.then(() => true)`);
await page.screenshot({ path: "assets/brand/og.jpg", format: "jpeg", quality: 88 });
console.log(await page.eval(`({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, fonts: document.fonts.status })`));
await page.close();
await browser.close();
