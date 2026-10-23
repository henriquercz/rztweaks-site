// Prévia isolada de uma seção: node _extracted/preview.mjs 10-hero
// Escreve _extracted/preview/<seção>.html e tira prints em 1440 e 390.
import fs from "node:fs";
import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const name = process.argv[2];
if (!name) {
  console.error("uso: node _extracted/preview.mjs <nome-da-seção>");
  process.exit(1);
}

const fragment = fs.readFileSync(`src/sections/${name}.html`, "utf8");
const html = `<!doctype html>
<html lang="pt-BR" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="http://127.0.0.1:4173/">
<link rel="stylesheet" href="/src/styles/00-base.css">
<link rel="stylesheet" href="/src/styles/${name}.css">
</head>
<body>
${fragment}
</body>
</html>`;

fs.mkdirSync("_extracted/preview", { recursive: true });
fs.writeFileSync(`_extracted/preview/${name}.html`, html);

const browser = await Browser.launch({ width: 1440, height: 900 });
for (const [w, h] of [[1440, 900], [390, 844]]) {
  const page = await browser.newPage({ width: w, height: h });
  await page.goto(`http://127.0.0.1:4173/_extracted/preview/${name}.html`, { settleMs: 900 });
  await page.eval(`window.scrollTo(0, document.body.scrollHeight); new Promise(r => setTimeout(r, 400))`);
  await page.eval(`window.scrollTo(0, 0); new Promise(r => setTimeout(r, 200))`);
  await page.screenshot({ path: `_extracted/preview/${name}-${w}.png`, format: "png", fullPage: true });
  const info = await page.eval(() => ({
    h: document.documentElement.scrollHeight,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  console.log(`${name} @${w}: altura ${info.h}px, overflow ${info.overflow}px`);
  await page.close();
}
await browser.close();
