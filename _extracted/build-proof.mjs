import fs from "node:fs";

const items = [
  { n: 16, w: 429, h: 560, author: "enzo gangstar", caption: "Fortnite · 130 → 240 FPS", alt: "Print do Discord em que enzo gangstar relata 130 FPS caindo para 90 e agora 240 no Fortnite." },
  { n: 3, w: 448, h: 520, author: "galoppo", caption: "Fortnite · 400 FPS no criativo", alt: "Print do Discord em que galoppo relata 400 FPS no criativo e fim do input lag." },
  { n: 21, w: 441, h: 340, author: "drake", caption: "CS · 150 → 200+ FPS", alt: "Print do Discord em que drake relata 150 FPS no CS e agora mais de 200." },
  { n: 25, w: 382, h: 190, author: "Dukki", caption: "Fortnite · 250 → 360 FPS", alt: "Print do Discord em que Dukki relata 250 FPS no criativo e agora 360 fixos." },
  { n: 18, w: 437, h: 172, author: "fellfn", caption: "Fortnite · 200 → 400 FPS + BIOS", alt: "Print do Discord em que fellfn relata 200 FPS no criativo e agora 400 após ajuste de BIOS." },
  { n: 19, w: 434, h: 164, author: "borges8934", caption: "+100 FPS e fim dos drops", alt: "Print do Discord em que borges8934 relata mais de 100 FPS e fim das quedas." },
  { n: 15, w: 442, h: 123, author: "icezinx", caption: "+100 FPS e sem input lag", alt: "Print do Discord em que icezinx relata 100 FPS a mais e remoção do input lag." },
  { n: 13, w: 446, h: 153, author: "whitez", caption: "0 delay e menos uso de CPU", alt: "Print do Discord em que whitez relata 0 delay, mais FPS e menos uso de CPU." },
  { n: 24, w: 385, h: 118, author: "guizinhx", caption: "+100 FPS e pouco delay", alt: "Print do Discord em que guizinhx relata 100 FPS a mais e pouco delay." },
  { n: 9, w: 448, h: 401, author: "Senna Pr1me!", caption: "0 delay e suporte imediato", alt: "Print do Discord em que Senna Pr1me! relata 0 delay, mais FPS e suporte rápido." },
  { n: 1, w: 448, h: 308, author: "sadx★", caption: "120 FPS fixos no lobby", alt: "Print do Discord em que sadx relata 120 FPS fixos no lobby, sem as quedas anteriores." },
  { n: 23, w: 382, h: 124, author: "JoaoVitim", caption: "Input e ping melhores", alt: "Print do Discord em que JoaoVitim relata melhora no input e no ping." },
  { n: 4, w: 448, h: 123, author: "NARCISSIST DINO!", caption: "+FPS e menos input lag", alt: "Print do Discord em que NARCISSIST DINO! relata mais FPS e menos input lag." },
  { n: 11, w: 446, h: 101, author: "celest", caption: "Delay e FPS melhores", alt: "Print do Discord em que celest relata menos delay e mais FPS." },
  { n: 14, w: 444, h: 133, author: "yutuk", caption: "0 input lag e sem drops", alt: "Print do Discord em que yutuk relata 0 input lag e fim dos drops." },
  { n: 2, w: 448, h: 122, author: "night knight", caption: "Jogabilidade e internet", alt: "Print do Discord em que night knight elogia a jogabilidade e a internet." },
  { n: 8, w: 448, h: 450, author: "Vidal", caption: "+FPS e menos delay", alt: "Print do Discord em que Vidal relata mais FPS e remoção do delay." },
  { n: 26, w: 382, h: 125, author: "Kt", caption: "Avaliação de cliente", alt: "Print do Discord em que Kt agradece o atendimento." },
  { n: 5, w: 447, h: 105, author: "night knight", caption: "10/10", alt: "Print do Discord em que night knight dá nota 10 para a otimização." },
  { n: 6, w: 448, h: 59, author: "gelado__71", caption: "10/10", alt: "Print do Discord em que gelado__71 dá nota 10 e diz não ter reclamações." },
  { n: 20, w: 432, h: 129, author: "brabox fv!", caption: "Avaliação de cliente", alt: "Print do Discord com elogio de brabox fv! ao atendimento." },
  { n: 7, w: 448, h: 468, author: "joaozin", caption: "Minecraft em i3 com 4 GB", alt: "Print do Discord em que joaozin mostra Minecraft rodando em um i3 de 10ª geração com 4 GB de RAM." },
  { n: 10, w: 447, h: 134, author: "vtxchutatrans", caption: "Resolução 3D ajustada", alt: "Print do Discord em que vtxchutatrans relata ajuste na resolução 3D e elogia o resultado." },
  { n: 12, w: 445, h: 181, author: "vtxchutatrans", caption: "Drops resolvidos", alt: "Print do Discord em que vtxchutatrans relata fim dos drops de FPS em partida ranqueada." },
  { n: 17, w: 446, h: 200, author: "liu!", caption: "Jogo rodando a 100 FPS", alt: "Print do Discord em que liu! relata que o jogo passou a rodar a uma média de 100 FPS." },
];

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const strip = items.slice(0, 12).map((item, i) => `          <button class="strip-item" type="button" data-proof="${i}" aria-label="Ampliar print: ${esc(item.caption)}">
            <img src="assets/proof/Screenshot_${item.n}.png" width="${item.w}" height="${item.h}" alt="${esc(item.alt)}" loading="eager" decoding="async">
          </button>`).join("\n");

const wall = items.map((item, i) => `          <button class="proof-item" type="button" data-proof="${i}" data-caption="${esc(item.author)} · ${esc(item.caption)}" aria-label="Ampliar print: ${esc(item.caption)}"${i >= 12 ? " hidden" : ""}>
            <img src="assets/proof/Screenshot_${item.n}.png" width="${item.w}" height="${item.h}" alt="${esc(item.alt)}" loading="lazy" decoding="async">
          </button>`).join("\n");

let html = fs.readFileSync("index.html", "utf8");
html = html.replace("<!-- HERO_STRIP -->", strip);
html = html.replace("<!-- PROOF_WALL -->", wall);
html = html.replace("27 feedbacks reais enviados por clientes no Discord.", "25 prints enviados por clientes no Discord.");
html = html.replace("27 prints. Toque para ampliar.", "25 prints. Toque para ampliar.");
html = html.replace("Ver todos os 27 prints", "Ver todos os 25 prints");
fs.writeFileSync("index.html", html);
console.log(`strip: ${items.slice(0, 12).length}, wall: ${items.length}`);
