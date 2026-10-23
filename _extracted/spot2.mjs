import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const b = await Browser.launch({ width: 1440, height: 900 });
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:4173/", { settleMs: 900 });
await p.eval(`document.querySelector(".how").scrollIntoView(); new Promise(r => setTimeout(r, 700))`);
await p.screenshot({ path: `_extracted/preview/live-how.png`, format: "png" });
await p.eval(`document.querySelector("#faq").scrollIntoView(); new Promise(r => setTimeout(r, 500))`);
await p.eval(`document.querySelectorAll("#faq details")[1].open = true; new Promise(r => setTimeout(r, 400))`);
await p.screenshot({ path: `_extracted/preview/live-faq-open.png`, format: "png" });
const box = await p.eval(() => {
  const d = document.querySelectorAll("#faq details")[1];
  const r = d.getBoundingClientRect();
  return { h: Math.round(r.height), bg: getComputedStyle(d).backgroundColor, color: getComputedStyle(d).color };
});
console.log(box);
await p.close();
await b.close();
