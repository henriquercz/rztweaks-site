import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const shots = [
  ["footer", `document.querySelector("footer").scrollIntoView({block:"end"}); new Promise(r => setTimeout(r, 600))`],
  ["services", `document.querySelector("#servicos").scrollIntoView(); new Promise(r => setTimeout(r, 600))`],
  ["package", `document.querySelector(".package").scrollIntoView(); new Promise(r => setTimeout(r, 600))`],
  ["cta", `document.querySelector(".cta").scrollIntoView(); new Promise(r => setTimeout(r, 600))`]
];

const b = await Browser.launch({ width: 1440, height: 900 });
for (const [name, script] of shots) {
  const p = await b.newPage({ width: 1440, height: 900 });
  await p.goto("http://127.0.0.1:4173/", { settleMs: 900 });
  await p.eval(script);
  await p.screenshot({ path: `_extracted/preview/live-${name}.png`, format: "png" });
  await p.close();
}
await b.close();
console.log("ok");
