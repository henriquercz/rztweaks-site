# RZ Tweaks Landing v2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesenhar todas as seções da landing da RZ Tweaks em duas ondas, com direção dark performance-lab, copy forte e prova social apenas na seção de resultados.

**Architecture:** Site estático sem framework. `build.mjs` monta `index.html` e `styles.css` a partir de `src/page.html`, `src/sections/*.html` e `src/styles/*.css`. Cada seção tem HTML e CSS próprios; `script.js` centraliza interações. O controlador é dono dos arquivos compartilhados (`00-base.css`, `script.js`, `build.mjs`, `page.html`, fontes, imagens). Os agentes de seção são donos apenas dos dois arquivos da sua seção.

**Tech Stack:** HTML, CSS, JavaScript vanilla, Node 26, Playwright (cache npx), Firebase Hosting. Sem dependências novas.

**Spec:** `docs/superpowers/specs/2026-10-23-rz-tweaks-redesign-design.md`

## Global Constraints

- Direção: dark performance-lab; fundo `--bg: #08080a`; texto `--text: #f4f2ef`; acento único `--accent: #e02830`; sem segunda cor de destaque.
- Fontes: Archivo (display), Instrument Sans (corpo), IBM Plex Mono (dados em `[data-ui]`). Nenhuma outra família.
- Raio 0 em tudo. Sem sombra em repouso. Sem gradiente decorativo. Sem vidro/blur.
- Imagens de depoimento **somente** em `src/sections/30-results.html` e no lightbox. Hero, problema, serviços, pacote, como funciona, FAQ, CTA e footer não podem exibir prints.
- Imagens da marca em hero, CTA e footer: `assets/brand/v2/hero-panel-1000.webp`, `hero-wallpaper-2400.webp`, `brand-band-1600.webp`, `logo-mark.webp`, `logo-panel-900.webp`.
- Não inventar cliente, número, preço, prazo, garantia ou métrica. Manter os preços e links existentes.
- Não editar `src/styles/00-base.css`, `script.js`, `build.mjs`, `src/page.html`, `index.html`, `styles.css` nem a seção de outro agente.
- Preservar todos os ganchos de JS da seção (listados em cada task).
- Mobile sem overflow horizontal em 390px; tablet 768px; desktop 1440px.
- `prefers-reduced-motion` desliga animações.
- Contraste AA; foco visível; `h1` único no hero; `h2` por seção; `h3` nos itens.
- Toda imagem com `width`, `height` e `alt` real. Fora da primeira dobra, `loading="lazy"`.
- Copy em português do Brasil, direta e técnica; sem “eleve”, “transforme”, “desbloqueie”, “jornada”, “solução completa”.
- Nada de emoji, travessão decorativo, card com ícone, três cards iguais, eyebrow em toda seção.
- Cada seção deve ter composição própria e densidade suficiente; nenhuma metade vazia sem intenção.

## Review Focus

- Hero em 1440px cabe na primeira dobra sem CTA escondido; em 390px o painel não estoura a largura.
- Parede de prints: 12 visíveis, 13 com `hidden`; `#moreProof` alterna e o lightbox abre o índice correto.
- Montador de pedido: `.is-selected`, `aria-pressed`, texto dos botões alterado pelo JS e pacote substituindo serviços incluídos.
- Contraste no bloco vermelho do pacote e nos botões vermelhos; foco visível no teclado.
- Nenhuma imagem de depoimento fora de `30-results`; imagens da marca carregam nos caminhos corretos.

---

## Task 0: Fundação compartilhada (controlador)

**Files:**
- Modify: `src/styles/00-base.css`
- Modify: `src/page.html`
- Modify: `script.js`
- Modify: `build.mjs`
- Modify: `DESIGN.md`
- Modify: `.gitignore`
- Create: `src/styles/50-package.css` (vazio; o agente do pacote preenche)
- Create: `_extracted/qa/preview-section.cjs`
- Create: `_extracted/qa/shoot.cjs` (já criado)
- Assets: `assets/fonts/v2/*`, `assets/brand/v2/*`

**Interfaces:**
- Produces: tokens e classes base da spec; `data-hero`, `data-reveal`, `data-stagger`; `preview-section.cjs <seção>`; build com `50-package.css`.

- [ ] **Step 1:** Criar branch `redesign/landing-v2` e commitar a spec/plano.
- [ ] **Step 2:** Reescrever `00-base.css` com os tokens da spec, classes base, botões, foco, motion e `body.has-order`.
- [ ] **Step 3:** Atualizar `page.html` com as novas fontes, preloads, meta/OG e sentinela do header.
- [ ] **Step 4:** Atualizar `script.js` com stagger genérico, nav ativa, header `is-scrolled` e manutenção do contrato existente.
- [ ] **Step 5:** Adicionar `50-package.css` ao `build.mjs`; criar o arquivo vazio.
- [ ] **Step 6:** Reescrever `DESIGN.md` para a nova direção; ignorar `_extracted/qa/` no Git.
- [ ] **Step 7:** Criar `preview-section.cjs` e validar com uma seção existente.
- [ ] **Step 8:** Rodar `node build.mjs` e conferir que não há placeholder.
- [ ] **Step 9:** Commit `chore: fundação visual v2`.

---

## Task 1: Header

**Files:**
- Modify: `src/sections/00-header.html`
- Modify: `src/styles/00-header.css`

**Interfaces:**
- Consumes: tokens/classes da Task 0.
- Produces: `.menu-toggle`, `#mobileMenu` com `hidden`, `.nav a[href^="#"]`, `.brand`, botão Discord.

- [ ] **Step 1:** Ler a spec, este brief, `00-header.html`, `00-header.css`, `00-base.css` e `script.js`.
- [ ] **Step 2:** Reescrever o HTML do header com logo `assets/brand/v2/logo-mark.webp`, wordmark, nav, CTA Discord e menu mobile.
- [ ] **Step 3:** Reescrever o CSS com barra de 72px, fundo sólido, linha inferior, nav ativa, menu mobile e estados de foco.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 00-header`; olhar os PNGs em `/tmp/opencode/rzt-qa/sections/00-header/`.
- [ ] **Step 5:** Corrigir overflow, contraste e alinhamento; repetir uma vez.
- [ ] **Step 6:** Commit `feat(header): barra v2`.

---

## Task 2: Hero

**Files:**
- Modify: `src/sections/10-hero.html`
- Modify: `src/styles/10-hero.css`

**Interfaces:**
- Consumes: `assets/brand/v2/hero-panel-1000.webp`, tokens, `data-hero`, `data-count`.
- Produces: `h1#hero-title`, CTA para `#servicos`, link para `#resultados`; **sem** `[data-proof]`.

- [ ] **Step 1:** Ler a spec, este brief, os arquivos atuais, `00-base.css` e `script.js`.
- [ ] **Step 2:** Reescrever o HTML: headline em 2 linhas, lead ≤ 20 palavras, CTA primário, link de resultados, nota de 25 prints, painel de marca com readout 130→240 e 150→200+.
- [ ] **Step 3:** Reescrever o CSS: grid 7/5, painel vertical, readout `[data-ui]`, entrada `data-hero`, responsivo 768/390, `fetchpriority="high"` na imagem do painel.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 10-hero`; olhar os PNGs.
- [ ] **Step 5:** Verificar primeira dobra em 1440×900, ausência de prints e overflow em 390px; corrigir.
- [ ] **Step 6:** Commit `feat(hero): instrumento de performance`.

---

## Task 3: Problema

**Files:**
- Modify: `src/sections/20-problem.html`
- Modify: `src/styles/20-problem.css`

**Interfaces:**
- Consumes: tokens/classes da Task 0.
- Produces: seção editorial com 4 sintomas e faixa de 5 revisões; sem hooks de JS obrigatórios além de `data-reveal`.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML com título “O gargalo não é o seu PC. É a configuração.”, lead curto, 4 sintomas (FPS instável, stutter, input lag, ping) e faixa “o que a otimização revisa”.
- [ ] **Step 3:** Reescrever o CSS com composição assimétrica, grade 2×2, faixa de 5 itens e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 20-problem`; olhar os PNGs.
- [ ] **Step 5:** Corrigir vazio, hierarquia e overflow; repetir uma vez.
- [ ] **Step 6:** Commit `feat(problem): diagnóstico denso`.

---

## Task 4: Resultados

**Files:**
- Modify: `src/sections/30-results.html`
- Modify: `src/styles/30-results.css`

**Interfaces:**
- Consumes: `assets/proof/*.png`, `#proofWall`, `.proof-item[data-proof][data-caption]`, `#moreProof`, `[data-count]`.
- Produces: 25 prints, 12 visíveis + 13 `hidden`; lightbox via `script.js`.

- [ ] **Step 1:** Ler a spec, este brief, os arquivos atuais, `00-base.css` e `script.js`.
- [ ] **Step 2:** Reescrever o HTML com cabeçalho + nota de metodologia, 4 leituras grandes, blockquote, parede de 25 prints e rodapé.
- [ ] **Step 3:** Reescrever o CSS com colunas 4/3/2, vão 8px, grayscale + hover, foco, stagger e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 30-results`; olhar os PNGs.
- [ ] **Step 5:** Verificar 12 visíveis, 13 `hidden`, contadores, largura das imagens e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(results): parede de provas v2`.

---

## Task 5: Serviços

**Files:**
- Modify: `src/sections/40-services.html`
- Modify: `src/styles/40-services.css`

**Interfaces:**
- Consumes: `[data-add="fps|limpeza|internet|formatacao|bios"]`, `.service[data-service]`.
- Produces: 5 linhas de serviço com preço, inclusos e botão; `.is-selected` estilizado.

- [ ] **Step 1:** Ler a spec, este brief, os arquivos atuais, `00-base.css` e `script.js`.
- [ ] **Step 2:** Reescrever o HTML com cabeçalho sticky, instrução do montador e 5 serviços em linhas.
- [ ] **Step 3:** Reescrever o CSS com linhas, preço tabular, hover, `.is-selected`, botão e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 40-services`; olhar os PNGs.
- [ ] **Step 5:** Verificar que os botões são text-only (o JS troca o texto), `aria-pressed`, foco e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(services): preços e montador v2`.

---

## Task 6: Pacote

**Files:**
- Modify: `src/sections/50-package.html`
- Modify: `src/styles/50-package.css`

**Interfaces:**
- Consumes: `[data-add="completo"]`.
- Produces: bloco vermelho com preço, lista inclusa, nota de R$ 61,50, selo de economia e CTA.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML do pacote com preço `R$ 50`, lista dos 4 serviços, nota de BIOS e selo “Economize R$ 11,50”.
- [ ] **Step 3:** Reescrever `50-package.css` com campo vermelho, texto preto, preço dominante, CTA preto e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 50-package`; olhar os PNGs.
- [ ] **Step 5:** Verificar contraste preto/vermelho, botão `[data-add="completo"]`, overflow e foco; corrigir.
- [ ] **Step 6:** Commit `feat(package): bloco de conversão v2`.

---

## Task 7: Como funciona

**Files:**
- Modify: `src/sections/60-how.html`
- Modify: `src/styles/60-how.css`

**Interfaces:**
- Consumes: tokens/classes, `data-reveal`, `data-stagger`.
- Produces: 4 passos em timeline e bloco de 3 compromissos.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML com título, intro, 4 passos (diagnóstico, escopo, ajuste, teste) e 3 compromissos.
- [ ] **Step 3:** Reescrever o CSS com timeline vertical, linha vermelha que cresce, números grandes, bloco de compromissos e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 60-how`; olhar os PNGs.
- [ ] **Step 5:** Verificar linha no reveal, reduced motion e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(how): processo em timeline`.

---

## Task 8: FAQ

**Files:**
- Modify: `src/sections/70-faq.html`
- Modify: `src/styles/70-faq.css`

**Interfaces:**
- Consumes: `<details name="faq">`, tokens/classes.
- Produces: 12 perguntas, acordeão com sinal de mais CSS, CTA lateral.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML mantendo as 12 perguntas e respostas, com CTA “Ainda com dúvida?”.
- [ ] **Step 3:** Reescrever o CSS com coluna sticky, itens `--surface`, aberto `--accent`/preto, sinal de mais e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 70-faq`; olhar os PNGs.
- [ ] **Step 5:** Verificar contraste do aberto, foco, `name="faq"` e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(faq): acordeão v2`.

---

## Task 9: CTA

**Files:**
- Modify: `src/sections/80-cta.html`
- Modify: `src/styles/80-cta.css`

**Interfaces:**
- Consumes: `assets/brand/v2/brand-band-1600.webp`, tokens.
- Produces: bloco final com headline, apoio e botão Discord.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML com “Chama no Discord.”, apoio ≤ 20 palavras e botão.
- [ ] **Step 3:** Reescrever o CSS com fundo de marca, overlay escuro, zoom sutil e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 80-cta`; olhar os PNGs.
- [ ] **Step 5:** Verificar contraste sobre a imagem, reduced motion e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(cta): fechamento com marca`.

---

## Task 10: Footer

**Files:**
- Modify: `src/sections/90-footer.html`
- Modify: `src/styles/90-footer.css`

**Interfaces:**
- Consumes: `assets/brand/v2/logo-mark.webp`, `logo-panel-900.webp`, tokens.
- Produces: mosaico com declaração, nav, redes, contato, wordmark e bloco Discord.

- [ ] **Step 1:** Ler a spec, este brief e os arquivos atuais.
- [ ] **Step 2:** Reescrever o HTML do mosaico com logo, declaração, copyright, nav, redes, contato, wordmark e bloco vermelho.
- [ ] **Step 3:** Reescrever o CSS com grid 12, wordmark gigante, bloco vermelho, hover e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 90-footer`; olhar os PNGs.
- [ ] **Step 5:** Verificar links, contraste, overflow e empilhamento mobile; corrigir.
- [ ] **Step 6:** Commit `feat(footer): mosaico v2`.

---

## Task 11: Overlays

**Files:**
- Modify: `src/sections/99-overlays.html`
- Modify: `src/styles/95-overlays.css`

**Interfaces:**
- Consumes: todos os IDs do contrato de overlays.
- Produces: barra de pedido, lightbox e fallback de cópia no visual v2.

- [ ] **Step 1:** Ler a spec, este brief, os arquivos atuais e `script.js`.
- [ ] **Step 2:** Reescrever o HTML dos overlays mantendo todos os IDs e a estrutura necessária.
- [ ] **Step 3:** Reescrever o CSS da barra fixa, lightbox, backdrop, fallback e responsivo.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs 99-overlays`; olhar os PNGs.
- [ ] **Step 5:** Verificar `hidden`, foco, safe-area, teclado e overflow; corrigir.
- [ ] **Step 6:** Commit `feat(overlays): pedido e lightbox v2`.

---

## Tasks 12–22: Onda 2 — crítica e refinamento por seção

Uma task por seção, na mesma ordem da Onda 1. Cada agente recebe os screenshots da sua seção e da página inteira.

**Files:** os mesmos dois arquivos da seção correspondente.

**Interfaces:** as mesmas da Onda 1.

- [ ] **Step 1:** Ler a spec, o brief, os screenshots da sua seção (desktop/tablet/mobile) e o full-page.
- [ ] **Step 2:** Criticar com a rubrica: hierarquia, composição, tipografia, espaçamento, contraste, responsivo, motion, copy, marca, conversão. Listar achados com severidade.
- [ ] **Step 3:** Corrigir todos os achados P0/P1/P2 no HTML/CSS da seção.
- [ ] **Step 4:** Rodar `node _extracted/qa/preview-section.cjs <seção>` e olhar os PNGs de novo.
- [ ] **Step 5:** Verificar hooks, overflow, contraste e reduced motion.
- [ ] **Step 6:** Commit `refine(<seção>): onda 2`.

**Critérios:** score ≥ 90/100; nenhum P0/P1; copy sem dado inventado; contrato de JS intacto.

---

## Task 23: Integração e revisão final

**Files:**
- Modify: `index.html`, `styles.css` (gerados)
- Modify: `README.md` se necessário
- Modify: `assets/brand/og.jpg` (opcional, se houver tempo)

- [ ] **Step 1:** Rodar `node build.mjs`.
- [ ] **Step 2:** Subir servidor local e rodar `node _extracted/qa/shoot.cjs`.
- [ ] **Step 3:** Olhar full-page desktop/tablet/mobile e todas as seções.
- [ ] **Step 4:** Corrigir problemas cross-section (espaçamento entre seções, repetição de layout, contraste, header/footer).
- [ ] **Step 5:** Rodar revisão final independente com o diff do branch.
- [ ] **Step 6:** Verificar contrato de JS manualmente: menu, lightbox, contadores, parede, montador.
- [ ] **Step 7:** Commit final e resumo com rulings.
