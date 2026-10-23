// One-off: split the v1 index.html into src/sections fragments + src/page.html.
import fs from "node:fs";

const html = fs.readFileSync("index.html", "utf8");
const body = html.slice(html.indexOf("<body>"), html.indexOf("<script src="));

const header = body.match(/<header[\s\S]*?<\/header>/)[0];
const footer = body.match(/<footer[\s\S]*?<\/footer>/)[0];
const sections = [...body.matchAll(/<section[\s\S]*?<\/section>/g)].map((m) => m[0]);
const names = ["10-hero", "20-problem", "30-results", "40-services", "50-package", "60-how", "70-faq", "80-cta"];

if (sections.length !== names.length) throw new Error(`expected ${names.length} sections, got ${sections.length}`);

fs.writeFileSync("src/sections/00-header.html", header.trim() + "\n");
names.forEach((name, i) => fs.writeFileSync(`src/sections/${name}.html`, sections[i].trim() + "\n"));
fs.writeFileSync("src/sections/90-footer.html", footer.trim() + "\n");

const overlays = body.slice(body.indexOf('<div class="order-bar"')).trim();
fs.writeFileSync("src/sections/99-overlays.html", overlays + "\n");

const head = html.slice(0, html.indexOf("<body>") + 6);
const page = `${head}
  <a class="skip" href="#conteudo">Pular para o conteúdo</a>

{{00-header}}

  <main id="conteudo">
{{10-hero}}

{{20-problem}}

{{30-results}}

{{40-services}}

{{50-package}}

{{60-how}}

{{70-faq}}

{{80-cta}}
  </main>

{{90-footer}}

{{99-overlays}}
</body>
</html>
`;
fs.writeFileSync("src/page.html", page);
console.log(`header ${header.length}, sections ${sections.map((s) => s.length).join(",")}, footer ${footer.length}, overlays ${overlays.length}`);
