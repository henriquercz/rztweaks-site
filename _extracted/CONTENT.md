# Conteúdo extraído — RZ Tweaks

Manifesto do que veio do site antigo (`https://rztweaksbr.web.app/`), o que foi reescrito e o que precisa de confirmação do dono antes de publicar.

## Fontes

| Fonte | O que rendeu |
|---|---|
| HTML/CSS/JS do site antigo (Firebase Hosting) | Copy original, lista de serviços, preços, estatísticas, links sociais |
| `assets/proof/` (27 prints do Discord) | 25 depoimentos únicos, transcritos em `_extracted/testimonials.md` |
| Prints do site antigo enviados pelo cliente | Estrutura das seções (hero, serviços, resultados, CTA final) |
| Instagram / TikTok / Discord | Links de contato mantidos sem alteração |

## Inventário de arquivos

- `_extracted/images/` — 27 prints originais + `wallpaper.jpg` + `rz.jpg` (brutos, não publicados).
- `assets/proof/` — 25 prints curados, usados na página.
- `assets/brand/logo-mark.jpg` — recorte do logo original.
- `assets/brand/favicon.png`, `assets/brand/og.jpg` — derivados do logo.
- `assets/fonts/` — Schibsted Grotesk variável (latin + latin-ext), self-hosted.
- `_extracted/testimonials.md` — análise print a print: transcrição, veredito, números, privacidade.
- `_extracted/copy-deck.md` — copy usada na página, seção por seção.
- `_extracted/build-proof.mjs` — gerador do markup da fita do hero e da parede de prints.
- `_extracted/test.mjs`, `shoot.mjs`, `motioncheck.mjs`, `measure.mjs` — verificação automatizada.
- `_extracted/og.html`, `og.mjs` — gerador do `og.jpg`.

## Curadoria: 27 → 25 prints

Dois pares são duplicatas do mesmo depoimento:

- `Screenshot_20.png` = `Screenshot_22.png` (brabox fv!) — ficou a versão mais fechada.
- `Screenshot_23.png` = `Screenshot_27.png` (JoaoVitim) — ficou a versão mais fechada.

Restaram 25 depoimentos de 23 autores (dois autores aparecem duas vezes: night knight e vtxchutatrans).

Ordem da parede: prova mais forte primeiro (número antes/depois, jogo nomeado, variedade de serviço). Os 12 primeiros aparecem sem clique; os 13 restantes abrem com "Ver todos os 25 prints". Os prints com risco de privacidade ficam no fim (S17, S10, S12, S7).

### Provas mais fortes (top 8)

1. **S16 — enzo gangstar**: 130 FPS caindo para 90 → 240 na partida (Fortnite).
2. **S3 — galoppo**: 400 FPS no criativo em PC fraco, fim do input lag.
3. **S21 — drake**: CS 150 → 200+ (outro relato: 150 → 170–210).
4. **S25 — Dukki**: 250 → 360 travados no criativo.
5. **S18 — fellfn**: 200 → 400 no criativo após ajuste de BIOS.
6. **S19 — borges8934**: +100 FPS e fim dos drops.
7. **S15 — icezinx**: +100 FPS e sem input lag.
8. **S13 — whitez**: 0 delay, mais FPS, menos uso de CPU.

## O que foi reescrito

O site antigo dizia "Maximize Seu Desempenho nos Jogos" e listava serviços sem explicar nada. A página nova:

- Troca a promessa genérica por um problema concreto (gargalo de configuração) e uma prova (prints).
- Explica cada serviço em uma linha e lista o que está incluído.
- Substitui estatísticas sem fonte (117 → 240+ FPS, 20 ms → 0 ms, 67% → 100%) por dois relatos identificáveis e datados.
- Remove a alegação de "0 ms de input lag" como fato; "0 delay" aparece só como fala de cliente.
- Adiciona como funciona, segurança, FAQ, privacidade da formatação e caminho de compra.

## Precisa de confirmação do dono

| Item | Situação |
|---|---|
| **Preços R$ 7,00** (Formatação e Internet) | Mantidos do site antigo, mas parecem erro de digitação/placeholder. Confirmar antes de publicar. |
| **R$ 50,00 no Pacote Completo** | Soma avulsa declarada: R$ 61,50 (37,50 + 10 + 7 + 7). Confirmar se o pacote ainda custa 50. |
| **Ponto de restauração antes de alterar** | Presente no site antigo; confirmar que é prática padrão em todo atendimento. |
| **"Nenhum acesso a arquivos pessoais"** | Confirmar. Acesso remoto normalmente permite ver a máquina inteira. |
| **"Todo ajuste é reversível"** | Confirmar. Alguns tweaks de registro/serviço não são triviais de reverter. |
| **Garantia de satisfação do Pacote Completo** | O site antigo mencionava; confirmar prazo e condições. |
| **240 FPS (S16)** | O mesmo print diz "até 200 fps na partida". A página usa 240 e credita o relato; confirmar qual número o cliente quis dizer. |
| **S17 (liu!)** | Print cita finanças da família; manter só com consentimento. |
| **S7 (joaozin)** | Pode envolver menor de idade; manter só com consentimento do responsável. |
| **S10 / S12 (vtxchutatrans)** | Handle pode referenciar identidade trans; avaliar risco. |
| **S20/S22 (brabox fv!)** | Avatar sem camisa e palavrão no print. |
| **Todos os prints** | Mostram handle e avatar do Discord. Recomendado consentimento por escrito ou blur antes de publicar. |

## Links mantidos

- Instagram: https://instagram.com/rztweaks
- TikTok: https://tiktok.com/@rztweaks
- Discord: https://discord.gg/ugcU6gtnnj

## Observações

- Nenhum print cita explicitamente limpeza de Windows ou formatação; a prova social cobre FPS, input lag, drops e BIOS.
- Todas as métricas são autorrelatadas. A página diz isso em dois lugares ("relato de cliente" e "não são benchmarks controlados").
- Não há depoimento com nome completo, cidade ou dados de contato.
