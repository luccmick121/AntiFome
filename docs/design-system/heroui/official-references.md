# HeroUI Official References

Esta biblioteca local foi consolidada a partir da documentacao oficial do HeroUI e do estado real do frontend do Antifome RS.

Ultima verificacao manual das fontes oficiais:

- 15 de marco de 2026

## Fontes oficiais principais

- HeroUI Introduction  
  `https://www.heroui.com/docs/guide/introduction`

- HeroUI Next.js Guide  
  `https://www.heroui.com/docs/frameworks/nextjs`

- HeroUI Theme  
  `https://www.heroui.com/docs/customization/theme`

- HeroUI Customize Theme  
  `https://www.heroui.com/docs/customization/customize-theme`

- HeroUI Colors  
  `https://www.heroui.com/docs/customization/colors`

- HeroUI Layout  
  `https://www.heroui.com/docs/customization/layout`

- HeroUI v3 Components List  
  `https://v3.heroui.com/docs/components-list`

## Fonte canonica para o inventario completo

O inventario completo de componentes desta biblioteca local foi derivado principalmente de:

- `https://v3.heroui.com/docs/components-list`

Esse catalogo oficial lista os componentes do HeroUI por categoria e hoje e a melhor fonte unica para consolidar todos os blocos da biblioteca em um unico indice.

## Como esta documentacao local foi montada

- conceitos, setup e theming vieram da documentacao oficial
- o catalogo completo foi espelhado em [Full Component Catalog](./all-components.md)
- o indice foi reorganizado para ficar mais util ao time
- o mapeamento de wrappers foi derivado do codigo local do Antifome RS

## Nota de versao importante

Hoje o projeto usa `@heroui/react` na linha 2.x, enquanto o site oficial ja enfatiza fortemente o catalogo v3.

Por isso, esta biblioteca local segue esta regra:

1. usar o catalogo oficial mais atual como mapa de componentes
2. manter o mapeamento local separado para o estado real do projeto
3. tratar wrappers locais como fonte operacional numero um

## Regra de prioridade

Quando houver diferenca entre:

- HeroUI oficial
- wrapper local do projeto

Siga nesta ordem:

1. wrapper local do projeto
2. tokens do projeto
3. HeroUI oficial
