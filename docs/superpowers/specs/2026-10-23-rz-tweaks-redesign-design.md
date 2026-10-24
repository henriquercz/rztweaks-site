# RZ Tweaks — redesenho total da landing (v2)

**Data:** 2026-10-23
**Status:** aprovado por instrução direta do dono; executar em duas ondas.
**Substitui:** a direção visual de `DESIGN.md` (paper/dark alternado, Schibsted Grotesk).

## 1. Leitura de design

Landing de conversão para jogadores competitivos brasileiros (Fortnite, CS, Valorant), com compra assistida no Discord. O visitante quer prova concreta de FPS e uma saída rápida para o atendimento. A página deve parecer um **instrumento de performance**, não um catálogo de serviços.

**Tese:** preto de laboratório, vermelho RZ como único acento, tipografia grande e editorial, dados reais dos prints e imagens da própria marca. Composição assimétrica, densa, com movimento contido e preciso. Nada de cards iguais, eyeballs genéricos, gradientes roxos, vidro, sombra difusa ou ícones desenhados à mão.

**Design read:** landing premium de gaming/tech para jogador competitivo, linguagem dark-tech editorial, próxima de Archivo + Instrument Sans + IBM Plex Mono, com vermelho de marca e prova visual real.

**Dials:** `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6`, `VISUAL_DENSITY: 5`.

## 2. Objetivos

- Refazer **todas** as seções: header, hero, problema, resultados, serviços, pacote, como funciona, FAQ, CTA, footer e overlays.
- Aumentar densidade e hierarquia: nenhuma seção pode parecer vazia.
- Copy mais direta, técnica e confiante, sem inventar número, cliente, preço ou promessa.
- Prova social (prints) **somente** na seção de resultados. Outras seções podem citar números reais em texto, nunca exibir imagens de depoimento.
- Usar mais imagens da marca: `RZ-logo/wallpaper.png` e derivados em hero, CTA e footer; logo no header/footer.
- Motion real: entrada do hero, reveals com stagger, contadores, hover, acordeão, barra de pedido e lightbox.
- Preservar todo o contrato de JavaScript e os links reais.

## 3. Não objetivos

- Não trocar a stack (HTML + CSS + JS estático, sem framework, sem build novo).
- Não criar novas páginas, rotas, formulário de pagamento ou backend.
- Não mudar preços, nomes de serviços, prints ou links do Discord.
- Não usar depoimento falso, benchmark inventado, logo de cliente fictício ou métrica sem fonte.
- Não adicionar biblioteca de animação, ícones ou CSS externo.
- Não usar imagens de depoimento fora de `30-results`.

## 4. Anti-objetivos (reprovam)

- Grade de três cards iguais; card com ícone; card em volta de cada print.
- Eyebrow pequeno em cima de todo título; monospace decorativo; 01/02/03 decorativo.
- Gradiente roxo/azul, glow neon, vidro/blur gratuito, sombra em repouso.
- Texto cinza claro em fundo claro, botão sem contraste, CTA quebrando linha no desktop.
- Seção com metade da tela vazia sem intenção composicional.
- Exibir print de depoimento no hero, serviços, pacote ou CTA.
- Copy com “eleve”, “transforme”, “desbloqueie”, “solução completa”, “jornada”.
- Emoji, travessão decorativo, ponto de exclamação em excesso.

## 5. Sistema visual

### 5.1 Cores (só `src/styles/00-base.css` define)

```css
--bg: #08080a;
--bg-2: #0d0d10;
--bg-3: #141418;
--surface: #101014;
--surface-2: #18181d;
--line: rgba(244, 242, 239, 0.12);
--line-strong: rgba(244, 242, 239, 0.24);
--text: #f4f2ef;
--text-2: #c9c7c3;
--muted: #8f8d89;
--accent: #e02830;
--accent-2: #ff3b43;
--accent-ink: #ffffff;
--black: #050506;
```

- Um único acento: vermelho RZ. Não criar outra cor de destaque.
- Sem `#000` e `#fff` puros em superfícies grandes.
- Opacidades de texto usam `color-mix(in srgb, var(--text) 60%, transparent)` ou tokens.
- A seção `50-package` pode inverter para vermelho cheio com texto preto (`--black`), por ser bloco de conversão.

### 5.2 Tipografia

- Display: **Archivo** variável (400–900, width 75–125), `--font-display`.
- Corpo/UI: **Instrument Sans** variável (400–700), `--font-body`.
- Dados: **IBM Plex Mono** 400/500, `--font-mono`, somente dentro de `[data-ui]` e micro-rótulos numéricos.
- Arquivos em `assets/fonts/v2/`; `@font-face` e preload em `src/page.html`.
- Títulos: `letter-spacing: -0.055em`, `line-height: 0.9`, peso 800.
- Corpo: 17px, `line-height: 1.55`.
- Micro-rótulo: 12–13px, 500, tracking `0.12em`, uppercase; no máximo 3 por página.
- Não usar itálico decorativo nem misturar serif.

### 5.3 Espaço e forma

- `--gutter: clamp(20px, 4vw, 64px)`
- `--section-y: clamp(96px, 10vw, 180px)`
- `--gap: clamp(16px, 2vw, 32px)`
- `--measure: 64ch`
- `--radius: 0` — cantos retos em tudo.
- Linhas de 1px são permitidas; não usar fio de 1px como decoração em todo bloco.
- Grid principal de 12 colunas; composições assimétricas no desktop, coluna única no mobile.

### 5.4 Classes base disponíveis

`.wrap`, `.section`, `.field-base`, `.field-alt`, `.field-raised`, `.field-accent`, `.field-black`,
`.display`, `.head`, `.lead`, `.body`, `.small`, `.soft`, `.num`, `.mono`, `.kicker`,
`.btn`, `.btn-light`, `.btn-ghost`, `.link`, `.rule`, `.measure`, `.grid-12`.

### 5.5 Movimento

- `[data-hero]`: entrada na carga, `opacity` + `translateY`, delays por `--delay`.
- `[data-reveal]`: entrada ao rolar, via IntersectionObserver existente.
- `[data-stagger]`: o script distribui `--delay` nos filhos `[data-reveal]`.
- Contadores: `[data-count="240"]` já existentes.
- Hover: apenas `transform` e `opacity`; sem animar `width`, `top` ou `left`.
- `prefers-reduced-motion`: tudo estático e visível.
- Uma única marquee por página, se houver; preferir não usar.

## 6. Imagens

- `assets/brand/v2/hero-panel-1000.webp` — hero, painel vertical da marca.
- `assets/brand/v2/hero-wallpaper-2400.webp` / `-1200.webp` — fundo amplo do hero/CTA.
- `assets/brand/v2/brand-band-1600.webp` — CTA/footer.
- `assets/brand/v2/logo-mark.webp` — header/footer/pequenos selos.
- `assets/brand/v2/logo-panel-900.webp` — bloco de marca no pacote/footer.
- `assets/proof/Screenshot_*.png` — **somente** `30-results` e lightbox.
- Toda imagem precisa de `width`/`height`, `alt` real e `loading="lazy"` fora do hero.
- Não criar ilustração SVG à mão. Ícones permitidos: logo Discord existente e setas geométricas simples.

## 7. Copy

Voz: direta, técnica, segura, brasileira. Frases curtas. “Você” e “a gente”. Sem hype.

**Mensagens-chave**
- O problema é configuração, não necessariamente hardware.
- O atendimento é remoto, acompanhado e pelo Discord.
- O antes/depois é medido e registrado.
- O pacote completo custa R$ 50 e substitui os serviços que inclui.
- A BIOS é o serviço mais sensível e só é feita quando compatível.
- Não há cheat, não há acesso a arquivos pessoais, há ponto de restauração.

**Frases que podem ser mantidas**
- “Mais FPS. Menos lag.”
- “O gargalo é configuração.” (pode virar “O gargalo não é o seu PC. É a configuração.”)
- “Resultados reais.”
- “Serviços e preços.”
- “Pacote completo.”
- “Como funciona.”
- “Perguntas diretas.”
- “Chama no Discord.”
- “Tô a 0 delay, muito FPS, suporte perfeito.” — Senna Pr1me!

**Proibido inventar**
- Número de clientes, taxa de sucesso, garantia sem lastro, tempo exato, “resposta em minutos”, “mais de X atendimentos”.
- Nomes de clientes, prints ou números diferentes dos que existem no HTML atual.

## 8. Brief por seção

### 00-header
Barra de 72px, fundo `--bg` sólido, linha inferior de 1px, sticky. Logo 30px + “RZ TWEAKS” 16px/700. Nav central com 4 links, 14px/500, estado ativo vermelho. Botão Discord 44px. Mobile: botão “Menu” e painel `#mobileMenu` logo abaixo, fundo `--bg`, links grandes, botão Discord. Sem blur, sem ícone de hambúrguer desenhado à mão (usar texto “Menu” ou duas barras CSS).

### 10-hero
Grid 7/5. Esquerda: `h1.display` “Mais FPS.<br>Menos lag.”, lead de até 20 palavras, CTA primário “Montar meu pacote”, link “Ver resultados”, linha `.small` “25 prints de clientes no Discord”. Direita: painel vertical com `hero-panel-1000.webp` e um readout `[data-ui]` com 130 → 240 FPS (Fortnite, enzo gangstar) e 150 → 200+ FPS (CS, drake). **Sem imagens de print no hero.** O painel deve parecer instrumento, não card decorativo. Altura alinhada ao texto; no mobile, texto e painel empilhados, painel 16:10.

### 20-problem
Seção editorial densa. Título grande “O gargalo não é o seu PC. É a configuração.”, lead curto e 4 sintomas em grade 2×2: FPS instável, stutter, input lag, ping. Cada sintoma com título 20–24px e explicação de 2 linhas. Fechar com uma faixa de 5 itens “o que a otimização revisa” (serviços, inicialização, energia, GPU, rede) separados por linha. Sem card, sem imagem, sem botão grande. Aproveitar o espaço com composição, não com vazio.

### 30-results
Prova social. Cabeçalho com “Resultados reais” + nota de metodologia em bloco de borda. Quatro leituras grandes: 130→240, 150→200+, 250→360, 200→400, com fonte e contexto. Blockquote “Tô a 0 delay, muito FPS, suporte perfeito.” + cite “Senna Pr1me!”. Parede `#proofWall` com 25 prints reais, 12 visíveis, colunas 4/3/2, vão 8px, imagens `filter: grayscale(1) brightness(.85)`, hover cor cheia + scale. `#moreProof` como link/botão de texto. Nota final. **Todas as imagens de depoimento ficam aqui.**

### 40-services
Duas colunas: esquerda sticky com “Serviços e preços”, intro e instrução do montador; direita lista de 5 serviços em linhas (não cards). Cada linha: nome 28–32px + preço 24px + botão `[data-add]` na primeira linha; descrição e inclusos abaixo. `li.service[data-service]`, `.is-selected` com fundo `--surface-2` e borda esquerda vermelha. Sem fio separador em cada linha; usar espaço e uma linha entre grupos. No mobile, bloco empilhado.

### 50-package
Bloco vermelho cheio. Texto preto. “Pacote completo” + preço `R$ 50` em `--t-display` + frase de valor + lista dos 4 serviços inclusos + nota “Separado, somam R$ 61,50. BIOS não incluído.” + selo “Economize R$ 11,50” + botão `[data-add="completo"]` preto. Objeto dominante: o preço. Sem card, sem sombra.

### 60-how
Duas colunas: esquerda sticky com “Como funciona” e os 3 compromissos em bloco `--surface` com borda vermelha; direita timeline vertical de 4 passos, com linha vermelha que cresce no reveal, número grande, título, descrição e nota. Sem cards. No mobile, coluna única.

### 70-faq
Duas colunas: esquerda sticky com “Perguntas diretas” + CTA “Ainda com dúvida? Chama no Discord”; direita 12 `<details name="faq">` com fundo `--surface`, pergunta 20–22px, sinal de mais CSS, aberto em `--accent` com texto preto. Resposta 17px, máximo 52ch. Mobile: título em cima, sem sticky.

### 80-cta
Campo escuro com `brand-band-1600.webp` como fundo à direita, overlay escuro da esquerda. “Chama no Discord.” em `--t-head`, frase de apoio de até 20 palavras, botão “Entrar no servidor”. Nada mais. Movimento sutil de zoom no fundo, respeitando reduced motion.

### 90-footer
Mosaico 12 colunas. Linha 1: declaração + copyright (1–5), navegação (6–8), redes (9–10), contato (11–12). Linha 2: wordmark “RZ TWEAKS” gigante (1–8) e bloco vermelho clicável para o Discord (9–12) com seta. Logo mark no bloco de declaração. Sem ícones de rede, sem créditos. No mobile: wordmark em largura total, bloco vermelho, depois navegação e contato em 2 colunas.

### 99-overlays
Barra de pedido fixa, fundo `--surface`, linha superior vermelha, contagem e total, “Limpar” e “Copiar pedido e abrir Discord”. Lightbox com backdrop preto, imagem central, barra de legenda, fechar/anterior/próximo. Fallback de cópia em painel `--surface`. Todos os IDs e ganchos preservados.

## 9. Contrato de JavaScript (não quebrar)

| Seção | Ganchos |
|---|---|
| header | `.menu-toggle`, `#mobileMenu` (hidden), `.nav a[href^="#"]` |
| hero | opcional `[data-count]`; sem `[data-proof]` |
| results | `#proofWall`, `.proof-item[data-proof][data-caption]`, `#moreProof`, `[data-count]` |
| services | `[data-add="fps|limpeza|internet|formatacao|bios|completo"]`, `.service[data-service]` |
| package | `[data-add="completo"]` |
| overlays | `#orderBar`, `#orderCount`, `#orderTotal`, `#orderClear`, `#copyOrder`, `#orderFallback`, `#orderText`, `#orderFallbackClose`, `#lightbox`, `#lightboxImage`, `#lightboxCaption`, `#lightboxClose`, `#lightboxPrev`, `#lightboxNext` |
| qualquer | `[data-reveal]`, `[data-stagger]`, `[data-hero]` |

## 10. Acessibilidade e performance

- Contraste AA: corpo ≥ 4.5:1; títulos grandes ≥ 3:1. Botão vermelho com texto branco; bloco vermelho com texto preto.
- Foco visível em todos os controles; `:focus-visible` com 3px vermelho.
- Um `h1` (hero); cada seção `h2`; serviços `h3`.
- Imagens com `alt` real; prints com descrição do relato.
- `prefers-reduced-motion` desliga animações.
- Sem overflow horizontal em 390px, 768px e 1440px.
- Hero sem CLS: `width`/`height` e `fetchpriority="high"` na imagem principal.
- Fontes self-hosted com `font-display: swap`; preload das duas principais.
- Prova social lazy; primeira dobra sem lazy.

## 11. Processo de execução

**Onda 1 — redesign:** 11 agentes independentes, um por seção. Cada um lê esta spec, o brief da sua seção, o HTML/CSS atual, `00-base.css` e o contrato de JS. Reescreve HTML + CSS da sua seção, roda preview isolado em 1440/768/390, olha os PNGs e corrige. Não edita arquivos compartilhados.

**Onda 2 — crítica e refinamento:** 11 agentes independentes, um por seção. Cada um recebe os screenshots da sua seção e da página inteira, a spec e uma rubrica. Critica hierarquia, composição, tipografia, contraste, responsivo, motion, copy, marca e conversão. Corrige o que estiver abaixo de 90/100. Não edita outras seções.

**Integração:** o controlador monta `index.html`/`styles.css`, tira screenshots full-page, corrige problemas cross-section, roda revisão final e valida o build.

## 12. Critérios de aceite

- `node build.mjs` roda sem erro e sem placeholder.
- Nenhuma seção vazia; todas com hierarquia clara e composição própria.
- Nenhuma imagem de depoimento fora de `30-results`.
- Hero, CTA e footer usam imagens da marca.
- 390px sem overflow; 768px e 1440px composições íntegras.
- Contrato de JS intacto: menu, lightbox, contadores, parede de prints, montador de pedido.
- Copy sem dado inventado; preços e links preservados.
- Motion presente e com `prefers-reduced-motion`.
- Score de design ≥ 90/100 na rubrica do design-director.
