# HeroUI Setup for Next.js

## Objetivo

Este guia resume como o HeroUI deve ser configurado dentro de um projeto Next.js como o Antifome RS.

## Requisitos gerais da documentacao oficial

A documentacao oficial do HeroUI destaca:

- React 18 ou superior
- Next.js 12 ou superior
- Tailwind CSS
- Framer Motion em cenarios suportados

## Modelo de instalacao usado no projeto

No Antifome RS, a abordagem atual e usar o pacote:

- `@heroui/react`

Isso simplifica o uso para o MVP.

## Provider

O provider global do projeto esta em:

- [app-providers.tsx](/home/mestredoblack/teste/frontend/src/components/providers/app-providers.tsx)

Ele aplica:

- `HeroUIProvider`
- `ToastProvider`

## Root layout

O root layout atual esta em:

- [layout.tsx](/home/mestredoblack/teste/frontend/src/app/layout.tsx)

Esse layout ja envolve a aplicacao com os providers corretos.

## Tailwind

O tema HeroUI esta configurado em:

- [tailwind.config.ts](/home/mestredoblack/teste/frontend/tailwind.config.ts)

Pontos principais:

- plugin `heroui(...)`
- tema `light` como base
- cores semanticas institucionais
- radius e shadows customizados

## Next.js e App Router

O HeroUI funciona bem com App Router.

No projeto:

- componentes podem ser usados em paginas client-side
- wrappers locais ajudam a manter consistencia
- a camada de providers esta pronta para uso global

## Setup recomendado para novos componentes

Quando for adotar um novo componente HeroUI:

1. confirme se o componente ja existe na documentacao local
2. teste primeiro com HeroUI puro
3. se o componente for recorrente, crie wrapper em `frontend/src/components/ui`
4. aplique tokens do projeto
5. documente o wrapper em [Project Mapping](./project-mapping.md)

## Regras de integracao para este monorepo

- usar `pnpm`
- instalar no workspace correto
- manter configuracao centralizada no frontend
- evitar estilos hardcoded repetidos em paginas

## Quando usar pacote individual

A documentacao oficial do HeroUI recomenda importes por pacote individual em alguns cenarios.

Para o Antifome RS:

- no MVP atual, `@heroui/react` e suficiente
- em otimizar futura, vale avaliar imports por pacote individual

## Checklist de setup

- provider global presente
- plugin HeroUI no Tailwind presente
- tokens do projeto aplicados
- wrappers locais preferidos
- pagina ou componente testado em desktop e mobile

