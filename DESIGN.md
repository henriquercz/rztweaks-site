# RZ Tweaks — direção de design (leia antes de escrever)

Página estática. `src/sections/*.html` + `src/styles/*.css` são montados em `index.html` e `styles.css` pelo `build.mjs`.
Você edita **só os arquivos da sua seção**. Não edite `build.mjs`, `script.js`, `00-base.css` nem a seção de outro agente.

## A ideia

O produto se prova funcionando na frente do visitante: os números que os clientes mandaram no Discord viram leitura de instrumento, e o pedido se monta na própria página.

**A coisa viva:** o montador de pedido (já funciona: `[data-add]` + barra fixa). Não invente outro JavaScript.

## Regras da casa (medidas pelo inspetor — reprovam)

- Título com **no máximo 2 linhas em qualquer largura**. Corte palavra antes de aumentar largura.
- Frase solta grande é `<p>`/`<blockquote>` de até 36px no desktop (24px no celular) e ~25 palavras.
- **Sem** rótulo pequeno em cima de título (eyebrow), **sem** monospace, **sem** 01/02/03, **sem** fio de 1px, **sem** gradiente, **sem** sombra em repouso, **sem** vidro/blur, **sem** card com ícone, **sem** emoji, **sem** forma decorativa, **sem** dashboard de barras cinzas.
- **Sem** palavra destacada no título (itálico, cor, sublinhado).
- Texto corrido em tinta cheia, 16px ou mais. Cinza só para nota secundária.
- Uma família (Schibsted Grotesk). Uma forma de botão, um raio (0).
- Cada seção tem composição diferente da vizinha. Nenhuma é grade de cards iguais.

## Tokens — só `00-base.css` define valores

Cor: `--paper` `--paper-2` `--paper-3` `--ink` `--ink-soft` `--muted` `--dark` `--dark-2` `--on-dark` `--on-dark-soft` `--accent` `--accent-ink`.
Tipo: `--t-small` (14) `--t-body` (17) `--t-lead` (22–28) `--t-head` (32–64) `--t-display` (52–136).
Espaço: `--gutter` `--section-y` `--gap` `--measure` `--radius` `--ease`.

Use as classes prontas: `.wrap` `.section` `.field-paper` `.field-paper-2` `.field-dark` `.field-accent` `.display` `.head` `.lead` `.body` `.small` `.measure` `.soft` `.num` `.btn` `.btn-light` `.btn-dark` `.link`.

**Proibido** criar cor, tamanho de fonte, sombra ou raio novo no seu CSS. Dentro de `[data-ui]` (fragmento de interface do produto) vale 13–15px e linha de 1px — só ali.

## Campos (ritmo da página)

`hero` paper → `problem` paper → `results` dark → `services` paper → `package` accent → `how` paper-2 → `faq` paper → `cta` dark → `footer` dark.
A seção troca o campo inteiro. Nada de degradê entre seções.

## Contrato de JavaScript (não quebre)

O `script.js` já existe e não será alterado por você. Mantenha estes ganchos:

| Seção | Ganchos |
|---|---|
| header | `.menu-toggle`, `#mobileMenu` (nav com `hidden`) |
| hero | `[data-proof="N"]` em botões que abrem o print (N = índice na parede) |
| results | `#proofWall`, `.proof-item[data-proof][data-caption]`, `#moreProof`, `[data-count="240"]` e `[data-count="200"]` |
| services | `[data-add="fps|limpeza|internet|formatacao|bios|completo"]`, `.service[data-service="id"]` (o JS alterna `.is-selected`) |
| qualquer | `[data-reveal]` para entrada ao rolar |

Sem JavaScript novo. FAQ usa `<details>` nativo. Nada de conteúdo que só aparece com script.

## Como trabalhar

1. Leia `src/sections/<sua>.html` (conteúdo real, preços e links) e `src/styles/00-base.css`.
2. Carregue a skill `design-taste-frontend` e siga as regras dela.
3. Reescreva seu HTML e seu CSS. Conteúdo real: não invente cliente, número ou preço.
4. `node _extracted/preview.mjs <sua-seção>` e **olhe os PNGs** em `_extracted/preview/`. Corrija o que estiver feio.
5. `node C:/Users/Administrator/.agents/skills/design-taste-frontend/scripts/lint.mjs src/sections/<sua>.html src/styles/<sua>.css`
6. Repita 4–5 duas vezes.
7. **Não rode `node build.mjs`** (arquivo quente; o orquestrador monta).

---

# Brief por seção

## A · `00-header` + `10-hero` — a prova vira instrumento

**Header:** barra simples, sem borda e sem sticky. Logo 30px + "RZ Tweaks" 17px/700 à esquerda; 4 links de 15px no centro; "Discord" como `.btn` de 44px à direita. No celular: botão "Menu" e painel `#mobileMenu` logo abaixo, fundo `--paper`, sem blur.

**Hero (paper):** grade de 12 colunas.
- Colunas 1–6: `h1.display` "Mais FPS.<br>Menos lag." (2 linhas, 9–10vw no desktop), uma frase de apoio de até 40ch em `--t-lead` (máx. 2 linhas), botão primário "Montar meu pacote" → `#servicos`, `.link` "Ver resultados", e uma linha `.small` "25 prints de clientes no Discord".
- Colunas 7–12: **painel escuro `data-ui`**, o objeto dominante da primeira tela. Cabeçalho "Relatório de cliente · Discord", duas leituras grandes com número tabular: `130 → 240` FPS em partida (Fortnite, enzo gangstar) e `150 → 200+` FPS em partida (CS, drake), e três miniaturas reais de prints (`data-proof="0"`, `"2"`, `"3"`) com legenda. Rodapé do painel: "Ver os 25 prints" → `#resultados`.
- O painel parece instrumento de medição: números reais, prints reais, nenhuma barra cinza falsa. Altura alinhada ao bloco de texto.
- Celular: texto, botões, painel empilhado; miniaturas em linha, 3 colunas iguais.

## B · `20-problem` — coluna estreita, campo vazio

**paper.** Sem card, sem imagem, sem botão.
- `h2` em `--t-lead`/600: "O gargalo é configuração." (2 linhas no máximo).
- Coluna de 320–360px começando a 12–15% da largura: quatro parágrafos curtos em `--t-body`, o primeiro em peso 500 e tinta cheia, os outros em `--ink-soft`. Um `.link` discreto pode fechar ("Ver os serviços").
- O resto da tela é campo vazio de propósito. É o único respiro da página — não preencha.
- Celular: coluna com 78% da largura, margem de 20px, respiro de 72px em cima e 96px embaixo.

## C · `30-results` — a parede de provas

**dark.** A seção mais importante depois do hero.
- `h2.head` "Resultados reais" + uma frase `.soft` de até 52ch com a ressalva (números variam; cada print mostra o que o cliente relatou).
- Duas leituras grandes lado a lado (não cards): `130 → 240` e `150 → 200+`, com `[data-count]` no número final, unidade/contexto em `.small`, e a fonte "relato de enzo gangstar · print 16". Use `.num` e `--t-head` ou maior.
- `blockquote` com “Tô a 0 delay, muito FPS, suporte perfeito.” e `cite` "Senna Pr1me!" — no máximo `--t-lead`, sem aspas gigantes decorativas.
- `#proofWall`: as 25 provas. Colunas CSS (4 desktop / 3 tablet / 2 celular), vão de 8px, imagem com `width/height` reais e `loading="lazy"`, `filter: brightness(.9)`, hover sobe para 1. Os 12 primeiros visíveis; os outros com `hidden`.
- `#moreProof` como `.link` (o JS troca o texto).
- Nota final `.small`: "Valores relatados nos prints. Não são benchmarks controlados."
- Nada de card em volta de cada print, nada de moldura de navegador.

## D · `40-services` + `50-package` — preço grande, pedido vivo

**services (paper):** `h2.head` "Serviços e preços" + uma frase. Cada serviço é uma **linha**, não card:
`nome` em `--t-lead`/700 · descrição `.soft` até 44ch · lista de inclusos em `.small` · preço em `--t-lead`/700 tabular · botão `[data-add]`.
`li.service[data-service="fps"]` etc. Espaço entre linhas (48–64px), sem fio separador. `.is-selected` (o JS aplica) muda o fundo para `--paper-2`.
No celular a linha vira bloco: nome e preço na primeira linha, descrição, inclusos, botão.

**package (accent):** campo vermelho inteiro. `h2` "Pacote completo", o preço `R$ 50` em `--t-display` (tabular), o que inclui em uma frase, a nota "Separado, esses serviços somam R$ 61,50. O ajuste de BIOS não está incluído." em `.small`, e botão `.btn-light` `[data-add="completo"]`.
O preço é o objeto da seção: grande, sozinho, sem card.

## E · `60-how` — quatro passos, sem cartão

**paper-2.** `h2.head` "Como funciona" + frase curta.
Quatro passos em grade de 4 colunas (2×2 no tablet, 1 no celular), separados por espaço, sem card e **sem número**.
Cada passo: `h3` em `--t-lead`/700, `p` em `--t-body`/`--ink-soft` até 34ch, e uma nota `.small` ("no Discord", "antes de alterar", "com acompanhamento", "antes e depois").
Feche com os três compromissos ("Ponto de restauração antes de alterar." / "Escopo combinado no Discord." / "Nenhum acesso a arquivos pessoais.") como bloco de fundo `--paper` com bastante padding — o único bloco preenchido da seção.

## F · `70-faq` — acordeão de blocos cheios

**paper.** Duas colunas: `h2.head` "Perguntas diretas" nas colunas 1–4 com `position: sticky; top: 96px`; o acordeão nas colunas 5–12.
Cada pergunta é um `<details name="faq">` com fundo `--paper-2`, 8px entre eles, raio 0, padding 24px, pergunta em 20px/500 e um sinal de mais desenhado com duas barras de 3px (vira menos quando abre).
Aberto: fundo `--accent`, texto branco, resposta em 17px com no máximo 52ch.
Doze perguntas — mantenha todas as do arquivo.
Celular: título em cima (sem sticky), blocos na largura toda, pergunta 18px.

## G · `80-cta` + `90-footer` — fechamento escuro

**cta (dark):** `h2` "Chama no Discord." em `--t-head` (2 linhas no máximo em qualquer largura), uma frase de apoio de até 40ch ("Conta o que está travando e a gente indica o serviço certo."), botão primário "Entrar no servidor". Nada mais. Campo escuro inteiro, respiro grande.

**footer (dark):** mosaico de blocos com 8px de vão, todos os espaços usados:
linha 1 — declaração (1–4) com uma frase em 24px e o copyright em `.small`; navegação (5–7); redes (8–9); contato (10–12).
linha 2 — bloco `--dark-2` (1–8) com "RZ TWEAKS" gigante; bloco `--accent` (9–12) inteiro clicável para o Discord, com "Entrar no Discord" e uma seta SVG de traço 4.
No celular: duas colunas, wordmark em largura total primeiro, depois o bloco vermelho, depois navegação e contato lado a lado.
Sem borda, sem ícone de rede social, sem lista de créditos.
