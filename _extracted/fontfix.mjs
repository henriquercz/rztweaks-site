import fs from "node:fs";
let s = fs.readFileSync("src/styles/00-base.css", "utf8");
s = s.replaceAll('url("assets/fonts/', 'url("/assets/fonts/');
fs.writeFileSync("_extracted/preview/base-fontfix.css", s);
console.log("ok", s.includes('/assets/fonts/'));
