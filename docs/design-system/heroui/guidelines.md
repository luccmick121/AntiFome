# HeroUI Usage Guidelines

## Regra principal

HeroUI deve servir ao produto, nao o contrario.

O componente certo e aquele que:

- resolve o problema de interface
- respeita a identidade institucional
- reduz complexidade
- melhora acessibilidade

## Heuristica de escolha

### Use HeroUI puro quando

- o componente ainda nao e recorrente
- voce esta explorando rapidamente uma tela
- o wrapper local ainda nao faz sentido

### Use wrapper local quando

- o componente ja se repete
- existe variante institucional do produto
- o comportamento precisa ser padronizado

### Crie wrapper novo quando

- o componente passou a ser estrutural na aplicacao
- ha risco de inconsistencia visual
- o time vai reutilizar o padrao em varias telas

## Guidelines por contexto

## Dashboard estadual

Priorize:

- cards
- progress
- table
- badge ou chip
- select
- alert

## Portal do conselho

Priorize:

- input
- form
- textarea
- modal
- table
- toast
- badge

## Mapa e exploracao

Priorize:

- card
- chip
- tooltip
- popover
- skeleton
- select

## Guidelines de densidade

- nao use muitos componentes chamativos na mesma tela
- mantenha um CTA principal por bloco
- use chips e badges para status, nao para decoracao
- prefira card e table para leitura institucional

## Guidelines de cor

- `primary` para navegacao e CTA principal
- `success` para aderencia e positivo
- `warning` para pendencia
- `danger` para risco real ou acao sensivel

Nao banalize `danger`.

## Guidelines de acessibilidade

- componentes de formulario devem ter label clara
- feedback de erro deve ser curto e especifico
- modais devem ter titulo e descricao
- tooltips nao substituem texto essencial
- status nao pode depender so de cor

## Guidelines de composicao

### Bom uso

- `Card + CardHeader + CardContent`
- `Input + Label + Alert`
- `Table + Badge`
- `Modal + Form + Toast`

### Uso ruim

- componente HeroUI com muitas classes avulsas sem padrao
- mistura de estilos institucionais e aleatorios
- muitos variants sem semantica

## Guidelines de performance

- use `Skeleton` em telas de dados
- use componentes pesados so quando houver necessidade
- para fluxo recorrente, extraia wrapper ou pattern

## Guidelines para hackathon

- prefira clareza sobre inventividade gratuita
- escolha componentes que a banca entende rapido
- mantenha a tela explicavel em 10 segundos
- toda interface deve parecer parte do mesmo sistema

