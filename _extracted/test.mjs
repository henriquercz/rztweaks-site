import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const browser = await Browser.launch({ width: 1440, height: 900 });
const page = await browser.newPage({ width: 1440, height: 900 });
await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
await page.goto("http://127.0.0.1:4173/", { settleMs: 1200 });

const click = (sel) => page.eval(`document.querySelector(${JSON.stringify(sel)}).click(); true`);
const text = (sel) => page.eval(`document.querySelector(${JSON.stringify(sel)}).textContent.trim()`);
const hidden = (sel) => page.eval(`document.querySelector(${JSON.stringify(sel)}).hidden`);

const results = {};
await click('[data-add="fps"]');
await click('[data-add="limpeza"]');
await click('[data-add="internet"]');
await click('[data-add="formatacao"]');
results.afterFour = { count: await text("#orderCount"), total: await text("#orderTotal"), barHidden: await hidden("#orderBar") };

await click('[data-add="completo"]');
results.afterPackage = {
  count: await text("#orderCount"),
  total: await text("#orderTotal"),
  fpsDisabled: await page.eval(`document.querySelector('[data-add="fps"]').disabled`),
  fpsLabel: await text('[data-add="fps"]'),
  packageLabel: await text('[data-add="completo"]'),
};

await click('[data-add="bios"]');
results.afterBios = { count: await text("#orderCount"), total: await text("#orderTotal") };

await click("#orderClear");
results.afterClear = { barHidden: await hidden("#orderBar") };

await page.eval(`document.querySelectorAll(".proof-item")[0].click(); true`);
results.lightboxOpen = await page.eval(`document.getElementById("lightbox").open`);
results.lightboxCaption = await text("#lightboxCaption");
results.lightboxSrc = await page.eval(`document.getElementById("lightboxImage").getAttribute("src")`);
await page.eval(`document.getElementById("lightboxNext").click(); true`);
results.lightboxNextSrc = await page.eval(`document.getElementById("lightboxImage").getAttribute("src")`);
await page.eval(`document.getElementById("lightboxClose").click(); true`);
results.lightboxClosed = await page.eval(`document.getElementById("lightbox").open`);

results.consoleErrors = page.consoleErrors;
console.log(JSON.stringify(results, null, 2));
await page.close();

const mobile = await browser.newPage({ width: 390, height: 844, mobile: true });
await mobile.goto("http://127.0.0.1:4173/", { settleMs: 1000 });
await mobile.eval(`document.querySelector(".menu-toggle").click(); true`);
console.log(JSON.stringify({
  menuOpen: await mobile.eval(`!document.getElementById("mobileMenu").hidden`),
  menuExpanded: await mobile.eval(`document.querySelector(".menu-toggle").getAttribute("aria-expanded")`),
  menuLinks: await mobile.eval(`document.querySelectorAll("#mobileMenu a").length`),
  horizontalOverflow: await mobile.eval(`document.documentElement.scrollWidth - document.documentElement.clientWidth`),
}, null, 2));
await mobile.close();
await browser.close();
