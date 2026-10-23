import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const browser = await Browser.launch({ width: 1440, height: 900 });
for (const w of [1920, 1440, 1280, 1100, 1024, 901, 768, 390]) {
  const page = await browser.newPage({ width: w, height: 900 });
  await page.goto("http://127.0.0.1:4173/_extracted/preview/10-hero.html", { settleMs: 500 });
  const info = await page.eval(() => {
    const h1 = document.querySelector("h1");
    const cs = getComputedStyle(h1);
    const probe = document.createElement("span");
    probe.style.cssText = `position:absolute;visibility:hidden;white-space:nowrap;font-family:${cs.fontFamily};font-size:${cs.fontSize};font-weight:${cs.fontWeight};letter-spacing:${cs.letterSpacing};`;
    probe.textContent = "Menos lag.";
    document.body.append(probe);
    const width = probe.getBoundingClientRect().width;
    probe.remove();
    const range = document.createRange();
    range.selectNodeContents(h1);
    const rects = [...range.getClientRects()].map((r) => Math.round(r.width));
    return {
      font: cs.fontSize,
      tracking: cs.letterSpacing,
      lineWidth: Math.round(width),
      col: Math.round(h1.parentElement.getBoundingClientRect().width),
      h1: Math.round(h1.getBoundingClientRect().width),
      rects,
    };
  });
  console.log(w, JSON.stringify(info));
  await page.close();
}
await browser.close();
