import { Browser } from "file:///C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs";

const widths = [
  { w: 1440, h: 900, name: "desktop" },
  { w: 768, h: 1024, name: "tablet" },
  { w: 390, h: 844, name: "mobile" },
];

const browser = await Browser.launch({ width: 1440, height: 900 });
for (const { w, h, name } of widths) {
  const page = await browser.newPage({ width: w, height: h });
  await page.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });
  await page.goto("http://127.0.0.1:4173/", { settleMs: 2500 });
  // Rolagem em passos: carrega todas as imagens lazy antes do print.
  const total = await page.eval(`document.documentElement.scrollHeight`);
  for (let y = 0; y < total; y += Math.round(h * 0.8)) {
    await page.eval(`window.scrollTo(0, ${y}); new Promise(r => setTimeout(r, 220))`);
  }
  await page.eval(`window.scrollTo(0, document.body.scrollHeight); new Promise(r => setTimeout(r, 900))`);
  await page.eval(`window.scrollTo(0, 0); new Promise(r => setTimeout(r, 700))`);
  await page.screenshot({ path: `.taste-skill/full-${name}.png`, format: "png", fullPage: true });
  console.log(name, await page.eval(`({ h: document.documentElement.scrollHeight, errs: [] })`));
  await page.close();
}
await browser.close();
