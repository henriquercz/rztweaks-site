// Monta index.html e styles.css a partir de src/. Único dono desses dois arquivos.
import fs from "node:fs";

const sections = [
  "00-header",
  "10-hero",
  "20-problem",
  "30-results",
  "40-services",
  "50-package",
  "60-how",
  "70-faq",
  "80-cta",
  "90-footer",
  "99-overlays"
];

let page = fs.readFileSync("src/page.html", "utf8");
for (const name of sections) {
  const file = `src/sections/${name}.html`;
  if (!fs.existsSync(file)) throw new Error(`falta ${file}`);
  // Função, não string: o HTML tem "R$&nbsp;", que o replace interpretaria como $&.
  page = page.replace(`{{${name}}}`, () => fs.readFileSync(file, "utf8").trim());
}
const left = page.match(/\{\{[a-z0-9-]+\}\}/g);
if (left) throw new Error(`placeholders sem seção: ${left.join(", ")}`);

const styles = [
  "00-base",
  "00-header",
  "10-hero",
  "20-problem",
  "30-results",
  "40-services",
  "50-package",
  "60-how",
  "70-faq",
  "80-cta",
  "90-footer",
  "95-overlays"
];
const css = styles
  .map((name) => `/* ===== ${name} ===== */\n${fs.readFileSync(`src/styles/${name}.css`, "utf8").trim()}`)
  .join("\n\n");

fs.writeFileSync("index.html", page);
fs.writeFileSync("styles.css", css + "\n");
console.log(`index.html ${page.length}b · styles.css ${css.length}b`);
