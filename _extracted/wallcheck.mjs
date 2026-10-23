import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const b = await Browser.launch({ width: 1440, height: 900 });
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:4173/", { settleMs: 1200 });
await p.eval(`document.getElementById("proofWall").scrollIntoView(); new Promise(r => setTimeout(r, 1500))`);
console.log(JSON.stringify(await p.eval(() => {
  const w = document.getElementById("proofWall");
  const items = [...w.querySelectorAll(".proof-item")];
  const cs = getComputedStyle(w);
  return {
    count: items.length,
    hidden: items.filter((i) => i.hidden).length,
    display: cs.display,
    columns: cs.columnCount,
    boxes: items.slice(0, 8).map((i) => ({
      hidden: i.hidden,
      h: Math.round(i.getBoundingClientRect().height),
      y: Math.round(i.getBoundingClientRect().top),
      x: Math.round(i.getBoundingClientRect().left),
      imgH: Math.round(i.querySelector("img").getBoundingClientRect().height),
      src: i.querySelector("img").getAttribute("src").split("/").pop()
    })),
    wallH: Math.round(w.getBoundingClientRect().height)
  };
}), null, 2));
await p.close();
await b.close();
