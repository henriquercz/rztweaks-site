import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const browser = await Browser.launch({ width: 1440, height: 900 });
const page = await browser.newPage({ width: 1440, height: 900 });
await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
await page.goto("http://127.0.0.1:4173/", { settleMs: 1000 });
const a = await page.eval(() => {
  const s = document.getElementById("heroStrip");
  return { left: s.scrollLeft, sw: s.scrollWidth, cw: s.clientWidth, children: s.children.length, toggleHidden: document.getElementById("stripToggle").hidden, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
});
await page.eval(`new Promise(r => setTimeout(r, 2000))`);
const b = await page.eval(() => {
  const s = document.getElementById("heroStrip");
  return { left: s.scrollLeft, sw: s.scrollWidth, cw: s.clientWidth };
});
console.log(JSON.stringify({ a, b }, null, 2));
await page.close();
await browser.close();
