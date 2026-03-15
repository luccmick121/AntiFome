# HeroUI Library for Antifome RS

Biblioteca local de documentacao do HeroUI para uso no projeto Antifome RS.

Este material tem dois objetivos:

1. acelerar o uso do HeroUI no dia a dia do time
2. padronizar a forma como os componentes devem ser aplicados dentro da identidade do produto

## Como ler esta biblioteca

1. Comece por [Overview](./overview.md)
2. Leia [Setup for Next.js](./setup-nextjs.md)
3. Leia [Theming and Tokens](./theming-and-tokens.md)
4. Consulte [Full Component Catalog](./all-components.md) para ver o inventario oficial completo
5. Use [Guidelines](./guidelines.md) como regra de design e escolha
6. Consulte [Component Index](./component-index.md) para encontrar componentes rapidamente
7. Consulte [Project Mapping](./project-mapping.md) para ver o que ja esta adaptado no Antifome RS
8. Consulte [Official References](./official-references.md) para a origem oficial das regras

## Estrutura

- [Overview](./overview.md)
- [Setup for Next.js](./setup-nextjs.md)
- [Theming and Tokens](./theming-and-tokens.md)
- [Full Component Catalog](./all-components.md)
- [Guidelines](./guidelines.md)
- [Component Index](./component-index.md)
- [Project Mapping](./project-mapping.md)
- [Official References](./official-references.md)
- Components
  - [Actions and Inputs](./components/actions-and-inputs.md)
  - [Selection and Pickers](./components/selection-and-pickers.md)
  - [Navigation and Layout](./components/navigation-and-layout.md)
  - [Data Display and Feedback](./components/data-display-and-feedback.md)
  - [Overlays and Utilities](./components/overlays-and-utilities.md)

## Escopo

Esta biblioteca cobre:

- a base conceitual do HeroUI
- a forma correta de instalar e configurar em Next.js
- theming e customization
- catalogo oficial completo do HeroUI atual
- mapeamento entre HeroUI oficial e wrappers locais em `frontend/src/components/ui`

## Inventario oficial consolidado

Em 15 de marco de 2026, o catalogo oficial consolidado nesta biblioteca registra:

- 70 componentes oficiais
- 15 categorias oficiais
- 1 catalogo mestre para consulta e decisao de adocao

Use [Full Component Catalog](./all-components.md) como fonte canonica desta biblioteca local.

## Regra do projeto

No Antifome RS, o HeroUI deve ser usado sempre com:

- tokens institucionais do projeto
- wrappers locais quando eles existirem
- consistencia visual entre area estadual e portal do conselho

## Nota de versao

O frontend atual usa `@heroui/react`.

Ao mesmo tempo:

- a documentacao oficial atual do HeroUI ja enfatiza v3
- parte do ecossistema ainda menciona NextUI
- o catalogo oficial atual segue valido como referencia conceitual

Por isso, esta biblioteca foi organizada assim:

- documentacao oficial para conceito, setup, theming e catalogo
- mapeamento local separado para os wrappers e decisoes reais do Antifome RS
