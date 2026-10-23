# RZ Tweaks — landing page

Página estática (HTML + CSS + JS, sem framework) reconstruída a partir do site antigo no Firebase e reescrita como landing de conversão.

## Rodar localmente

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4173/`.

## Editar

O conteúdo é montado a partir de `src/`. **Não edite `index.html` nem `styles.css` à mão** — eles são gerados.

```
src/page.html              esqueleto com {{placeholders}} de cada seção
src/sections/*.html        uma seção por arquivo (header, hero, problem, …)
src/styles/00-base.css     tokens, tipo, botões, campos, movimento — fonte única de cor e tamanho
src/styles/*.css           CSS da seção de mesmo nome
build.mjs                  monta index.html + styles.css
```

```powershell
node build.mjs             # depois de qualquer edição em src/
```

A direção de design, os tokens e o contrato de JavaScript estão em `DESIGN.md`.

## Publicar no Firebase Hosting

```powershell
npm i -g firebase-tools   # se ainda não tiver
firebase login
firebase use rztweaksbr   # ou crie o projeto e ajuste o alias
firebase deploy --only hosting
```

O `firebase.json` publica a raiz e ignora `_extracted/`, `.taste-skill/`, `src/`, `*.mjs` e `*.md`.

## Estrutura

```
index.html                 página completa (gerada)
styles.css                 CSS completo (gerado)
script.js                  menu, reveals, lightbox, contador, montador de pedido
assets/brand/              logo, favicon, og.jpg
assets/fonts/              Schibsted Grotesk (self-hosted)
assets/proof/              25 prints de clientes usados na página
src/                       fontes da página (não publicado)
_extracted/                material bruto, análise e scripts de verificação (não publicado)
firebase.json              config de hosting
```

## Funcionalidades

- **Montar pedido**: seleciona serviços, soma o total e copia um resumo para colar no Discord. O Pacote Completo substitui os serviços que ele já inclui.
- **Parede de prints**: 12 provas visíveis, botão revela as 25; clique abre lightbox com navegação por teclado.
- **Sem JS**: todo o conteúdo e os preços continuam legíveis; o builder e o lightbox ficam inertes.

## Antes de publicar

Ler `_extracted/CONTENT.md`, seção "Precisa de confirmação do dono". Os pontos críticos:

1. Preços de R$ 7,00 (Formatação e Internet) provavelmente estão errados.
2. Os prints mostram handle e avatar de clientes; obter consentimento ou borrar.
3. Promessas de ponto de restauração, ausência de acesso a arquivos pessoais, reversibilidade e garantia precisam ser confirmadas.
