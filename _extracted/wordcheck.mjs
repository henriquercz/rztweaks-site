import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const b = await Browser.launch({ width: 1440, height: 900 });
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:4173/", { settleMs: 1000 });
console.log(JSON.stringify(await p.eval(() => {
  const w = document.querySelector(".footer-wordmark");
  const r = document.createRange();
  r.selectNodeContents(w);
  const g = r.getBoundingClientRect();
  const t = w.getBoundingClientRect();
  const cs = getComputedStyle(w);
  return {
    tile: { top: Math.round(t.top + scrollY), bottom: Math.round(t.bottom + scrollY), h: Math.round(t.height) },
    glyph: { top: Math.round(g.top + scrollY), bottom: Math.round(g.bottom + scrollY), h: Math.round(g.height) },
    font: cs.fontSize, line: cs.lineHeight, pad: cs.padding, docH: document.documentElement.scrollHeight
  };
}), null, 2));
await p.close();
await b.close();
