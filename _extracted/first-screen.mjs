import fs from "node:fs";
import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const header = fs.readFileSync("src/sections/00-header.html", "utf8");
const hero = fs.readFileSync("src/sections/10-hero.html", "utf8");
const html = `<!doctype html>
<html lang="pt-BR" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="http://127.0.0.1:4173/">
<link rel="stylesheet" href="/_extracted/preview/base-fontfix.css">
<link rel="stylesheet" href="/src/styles/00-header.css">
<link rel="stylesheet" href="/src/styles/10-hero.css">
</head>
<body>
${header}
<main>${hero}</main>
<script src="/script.js"></script>
</body>
</html>`;
fs.writeFileSync("_extracted/preview/first-screen.html", html);

const browser = await Browser.launch({ width: 1440, height: 900 });
for (const [w, h] of [[1920, 1080], [1440, 900], [1280, 800], [1024, 768], [901, 800], [768, 1024], [390, 844]]) {
  const page = await browser.newPage({ width: w, height: h });
  await page.goto("http://127.0.0.1:4173/_extracted/preview/first-screen.html", { settleMs: 900 });
  await page.eval("document.fonts.ready.then(() => true)").catch(() => {});
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
      loaded: document.fonts.check(`${cs.fontWeight} ${cs.fontSize} "Schibsted Grotesk"`),
      lineWidth: Math.round(width),
      col: Math.round(h1.parentElement.getBoundingClientRect().width),
      h1: Math.round(h1.getBoundingClientRect().width),
      rects,
      pageH: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log(w, JSON.stringify(info));
  if ([1440, 1024, 901, 768, 390].includes(w)) {
    await page.screenshot({ path: `_extracted/preview/first-screen-${w}.png`, format: "png", fullPage: true });
  }
  if (w === 390) {
    await page.eval(`document.querySelector(".menu-toggle").click(); new Promise(r => setTimeout(r, 250))`);
    const menu = await page.eval(() => ({
      hidden: document.getElementById("mobileMenu").hidden,
      expanded: document.querySelector(".menu-toggle").getAttribute("aria-expanded"),
    }));
    console.log("menu", JSON.stringify(menu));
    await page.screenshot({ path: "_extracted/preview/first-screen-390-menu.png", format: "png", fullPage: true });
  }
  await page.close();
}
await browser.close();
