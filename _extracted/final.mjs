import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const b = await Browser.launch({ width: 1440, height: 900 });

// Desktop com pedido montado: a barra fixa não pode cobrir conteúdo.
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:4173/", { settleMs: 900 });
await p.eval(`document.querySelector('[data-add="fps"]').click(); document.querySelector('[data-add="bios"]').click(); document.querySelector("#servicos").scrollIntoView(); new Promise(r => setTimeout(r, 600))`);
await p.screenshot({ path: `_extracted/preview/final-order.png`, format: "png" });
console.log(await p.eval(() => {
  const bar = document.getElementById("orderBar").getBoundingClientRect();
  return { barTop: Math.round(bar.top), barH: Math.round(bar.height), bodyPad: getComputedStyle(document.body).paddingBottom };
}));
await p.close();

// Mobile: menu aberto e FAQ aberto.
const m = await b.newPage({ width: 390, height: 844, mobile: true });
await m.goto("http://127.0.0.1:4173/", { settleMs: 900 });
await m.eval(`document.querySelector(".menu-toggle").click(); new Promise(r => setTimeout(r, 400))`);
await m.screenshot({ path: `_extracted/preview/final-menu.png`, format: "png" });
await m.eval(`document.querySelector(".menu-toggle").click(); document.querySelector("#faq").scrollIntoView(); document.querySelectorAll("#faq details")[0].open = true; new Promise(r => setTimeout(r, 500))`);
await m.screenshot({ path: `_extracted/preview/final-faq-mobile.png`, format: "png" });
await m.close();
await b.close();
console.log("ok");
