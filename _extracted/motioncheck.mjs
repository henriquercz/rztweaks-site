import { Browser, sleep } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const RECORDER = `(() => {
  const seen = new WeakSet(); const c = { elements: 0, css: 0, transitions: 0, scripted: 0 };
  const note = (t, k) => { if (!(t instanceof Element) || seen.has(t)) return; seen.add(t); c.elements++; c[k]++; };
  addEventListener('animationstart', (e) => note(e.target, 'css'), true);
  addEventListener('transitionrun', (e) => note(e.target, 'transitions'), true);
  const watch = () => new MutationObserver((list) => { for (const m of list) { const s = m.target.getAttribute && m.target.getAttribute('style') || ''; if (/transform|translate|opacity|scale|rotate|clip-path/.test(s)) note(m.target, 'scripted'); } })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['style'], subtree: true });
  if (document.documentElement) watch(); else addEventListener('DOMContentLoaded', watch);
  window.__motionSample = () => { for (const a of document.getAnimations ? document.getAnimations() : []) { const t = a.effect && a.effect.target; if (t) note(t, a.constructor && a.constructor.name === 'CSSTransition' ? 'transitions' : 'css'); } };
  window.__motion = () => { window.__motionSample(); return { ...c }; };
})();`;

const browser = await Browser.launch({ width: 1440, height: 900 });
const page = await browser.newPage({ width: 1440, height: 900 });
await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
await page.send("Page.addScriptToEvaluateOnNewDocument", { source: RECORDER });
await page.goto("http://127.0.0.1:4173/", { settleMs: 1200 });
await page.eval(`new Promise(r => setTimeout(r, 1200))`);
await page.eval(`window.scrollTo(0, document.body.scrollHeight); new Promise(r => setTimeout(r, 1600))`);
const motion = await page.eval(`window.__motion()`);
const info = await page.eval(() => {
  const s = document.getElementById("heroStrip");
  return { stripLeft: s.scrollLeft, reduced: matchMedia("(prefers-reduced-motion: reduce)").matches };
});
console.log(JSON.stringify({ motion, info }, null, 2));
await page.close();
await browser.close();
