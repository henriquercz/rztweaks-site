import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const b = await Browser.launch({ width: 1440, height: 900 });
const p = await b.newPage({ width: 1440, height: 900 });
await p.goto("http://127.0.0.1:4173/", { settleMs: 1200 });
const out = await p.eval(() => {
  const doc = document.documentElement;
  const word = document.querySelector(".footer-wordmark, .footer-brand, footer .display, footer [class*=word]");
  const foot = document.querySelector("footer");
  const rect = (el) => el && { top: Math.round(el.getBoundingClientRect().top + scrollY), h: Math.round(el.getBoundingClientRect().height), bottom: Math.round(el.getBoundingClientRect().bottom + scrollY) };
  return {
    docH: doc.scrollHeight,
    foot: rect(foot),
    wordTag: word && word.className,
    word: rect(word),
    lastChild: rect(foot && foot.lastElementChild),
    priceText: (() => {
      const el = document.querySelector(".service-price");
      return el && { text: el.textContent, w: Math.round(el.getBoundingClientRect().width) };
    })()
  };
});
console.log(JSON.stringify(out, null, 2));
await p.close();
await b.close();
