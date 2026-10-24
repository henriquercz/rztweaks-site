# RZ Tweaks — direção de design (v2)

Leia a spec completa antes de escrever:
`docs/superpowers/specs/2026-10-23-rz-tweaks-redesign-design.md`

## A ideia

A landing é um **instrumento de performance**, não um catálogo. O visitante vê FPS real, entende o gargalo e monta o pedido na própria página. O produto se prova com prints reais e com o montador de pedido.

## Regras da casa

- Tema único escuro: `--bg #08080a`, `--text #f4f2ef`, acento único `--accent #e02830`.
- Fontes: Archivo (display), Instrument Sans (corpo), IBM Plex Mono (dados em `[data-ui]`). Nada além disso.
- Raio 0. Sem sombra em repouso. Sem gradiente decorativo. Sem vidro/blur.
- Título com no máximo 2 linhas no desktop. Sem palavra destacada no título.
- Cada seção tem composição própria; nada de três cards iguais, card com ícone ou grade de cards.
- **Prints de depoimento só em `30-results`** e no lightbox. Hero/CTA/footer usam imagens da marca.
- Imagens da marca: `assets/brand/v2/hero-panel-1000.webp`, `hero-wallpaper-2400.webp`, `brand-band-1600.webp`, `logo-mark.webp`, `logo-panel-900.webp`.
- Copy direta e técnica. Não inventar cliente, número, preço, prazo ou garantia.
- Motion: `[data-hero]`, `[data-reveal]`, `[data-stagger]`, contadores. Respeitar `prefers-reduced-motion`.
- Contraste AA, foco visível, um `h1`, `h2` por seção, imagens com `alt` real.
- Sem overflow horizontal em 390px, 768px e 1440px.

## Tokens

Só `src/styles/00-base.css` define valores. Use as classes prontas:
`.wrap` `.section` `.field-base` `.field-alt` `.field-raised` `.field-black` `.field-accent`
`.display` `.head` `.mega` `.lead` `.body` `.small` `.soft` `.muted` `.num` `.mono` `.kicker`
`.btn` `.btn-light` `.btn-dark` `.btn-ghost` `.link` `.rule` `.measure` `.grid-12`.

## Contrato de JavaScript

Não edite `script.js`. Mantenha os ganchos da sua seção (ver spec, seção 9). Não crie JavaScript novo.

## Como trabalhar

1. Leia a spec, o brief da sua seção, seu HTML/CSS atual e `00-base.css`.
2. Carregue as skills de design: `design-director`, `design-taste-frontend`, `frontend-design`, `high-end-visual-design`, `ui-ux-pro-max`, `redesign-existing-projects`, `web-design-guidelines`, `transitions-dev`, `revenue-centric-design`.
3. Reescreva HTML + CSS da sua seção. Conteúdo real; não invente dado.
4. Rode `node _extracted/qa/preview-section.cjs <seção>` e **olhe os PNGs** em `/tmp/opencode/rzt-qa/sections/<seção>/`.
5. Corrija overflow, contraste, hierarquia e responsivo. Repita uma vez.
6. Não rode `node build.mjs` (arquivo compartilhado). O controlador monta.
