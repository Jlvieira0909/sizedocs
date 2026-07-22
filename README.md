# SizeDocs

Documentação interna de integração da Sizebay — guias, plataformas suportadas e atalhos usados pelo time de implantação.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4 (tokens em `app/globals.css`)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) para renderizar o conteúdo em `content/*.mdx`
- Fontes [Geist Sans / Geist Mono](https://vercel.com/font) self-hosted via `geist`

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de produção
npm run lint    # eslint
```

## Estrutura

```
app/
  layout.tsx          shell (sidebar + command palette), fontes
  page.tsx             home com o bento grid
  docs/[slug]/page.tsx  renderiza um content/*.mdx
  not-found.tsx         404 para slugs inexistentes
content/
  *.mdx                 as páginas de documentação
components/
  Sidebar.tsx           navegação lateral + drawer mobile
  CommandPalette.tsx     busca (⌘K)
  MDXLink.tsx            link customizado usado no conteúdo mdx
  mdx/                   componentes disponíveis dentro do mdx
  icons/                 ícones de plataformas (compartilhado)
lib/
  docs.ts               lê o frontmatter de content/ e monta a navegação
  utils.ts              slugify, extração de headings, etc.
```

## Adicionando uma página de documentação

Crie um arquivo em `content/nome-da-pagina.mdx`:

```
---
title: "Nome da página"
description: "Uma frase curta sobre o conteúdo."
category: "Nome do grupo na barra lateral"
order: 1
updatedAt: "2026-07-22"
---

Conteúdo em markdown normal.
```

A página aparece automaticamente na barra lateral, na busca (⌘K) e na home — não é preciso editar mais nada. Detalhes de como o site funciona por dentro estão em `/docs/guia-inicial`.

### Componentes disponíveis no mdx

- `<Callout type="info | tip | warning" title="...">` — destaques dentro do texto.
- `<PlatformGrid>` / `<PlatformCard slug="..." name="..." trigger="..." catalog="..." tracking="...">` — grade de plataformas suportadas (veja `content/plataforms.mdx`).
- Links markdown (`[texto](url)`) já ganham ícone da plataforma, botão de copiar e abrir em nova guia automaticamente.

Novas plataformas usadas em `PlatformCard` ou detectadas em links precisam de uma entrada em `components/icons/PlatformIcon.tsx`.
