import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const browser = await Browser.launch({ width: 1440, height: 900 });
const page = await browser.newPage({ width: 1440, height: 900 });
await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
await page.goto("http://127.0.0.1:4173/", { settleMs: 800 });
const out = [];
for (let i = 0; i < 5; i++) {
  await page.eval(`new Promise(r => setTimeout(r, 500))`);
  out.push(await page.eval(() => {
    const s = document.getElementById("heroStrip");
    return { left: s.scrollLeft, vis: document.visibilityState, raf: window.__rafCount ?? null };
  }));
}
console.log(JSON.stringify(out, null, 2));
await page.close();
await browser.close();
