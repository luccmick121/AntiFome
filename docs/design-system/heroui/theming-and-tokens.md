# HeroUI Theming and Tokens

## Como o HeroUI pensa tema

Pela documentacao oficial, HeroUI organiza tema em dois eixos principais:

- cores
- layout

Isso permite controlar a biblioteca sem editar componente por componente.

## Tema no Antifome RS

O projeto usa um tema institucional proprio, com foco em:

- verde institucional
- vermelho de urgencia
- amarelo de aviso
- superfices claras
- contraste alto para leitura

Arquivos principais:

- [tailwind.config.ts](/home/mestredoblack/teste/frontend/tailwind.config.ts)
- [globals.css](/home/mestredoblack/teste/frontend/src/app/globals.css)
- [design-tokens.ts](/home/mestredoblack/teste/frontend/src/lib/design-tokens.ts)

## Tokens principais do produto

### Cores semanticas

- `primary`: identidade institucional
- `danger`: urgencia e risco
- `success`: aderencia e progresso
- `warning`: pendencia e atencao

### Layout

- radius pequeno e controlado
- sombras suaves para paines
- tipografia expressiva, mas institucional

## HeroUI plugin

O plugin HeroUI no Tailwind e o ponto central de customization.

Ele controla:

- `defaultTheme`
- `defaultExtendTheme`
- `layout`
- `themes`
- `addCommonColors`

## O que customizar primeiro

Para este projeto, a ordem ideal de customizacao e:

1. semantic colors
2. radius
3. box shadow
4. typography
5. variantes locais de wrappers

## Regra do projeto

Nao espalhe cores literais nas paginas quando houver token existente.

Prefira:

- `bg-primary`
- `text-foreground`
- `border-default-200`
- wrappers locais que ja embutem o tema

Evite:

- hex repetido em varias telas
- override pontual sem criterio

## Tokens locais mapeados

O arquivo [design-tokens.ts](/home/mestredoblack/teste/frontend/src/lib/design-tokens.ts) ja organiza:

- paleta institucional
- tipografia
- espacamentos
- raios
- sombras
- principios de design
- patterns de componentes

## Diretrizes para novos tokens

Crie token novo apenas quando:

- o padrao vai se repetir
- existe significado de produto
- o valor nao deveria ficar preso a um componente unico

Nao crie token novo quando:

- a necessidade e pontual
- o ajuste e experimental
- o componente pode ser resolvido com classe local simples

## Dark mode

A documentacao oficial suporta `light` e `dark`.

No estado atual do Antifome RS:

- a direcao principal e light
- o sistema ainda nao depende de dark mode como pilar de produto

Portanto:

- nao introduza dark mode novo por padrao
- so use se houver decisao clara de produto

## CSS variables

HeroUI gera CSS variables para:

- cores
- layout tokens

Essas variaveis sao uteis quando:

- voce precisa integrar HeroUI com CSS custom
- quer unificar visual de wrappers e componentes HeroUI

## Resultado esperado

Se o theming estiver correto:

- qualquer componente novo parece parte do Antifome RS
- o produto mantem coerencia entre dashboard e portal do conselho
- componentes HeroUI deixam de parecer biblioteca externa e passam a parecer sistema proprio

