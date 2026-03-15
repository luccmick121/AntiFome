# HeroUI Usage Guidelines

Esta pagina define como transformar o catalogo oficial completo do HeroUI em decisoes coerentes para o Antifome RS.

Catalogo base:

- [Full Component Catalog](./all-components.md)

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

## Regra de leitura do catalogo completo

Ao avaliar qualquer um dos 70 componentes oficiais, tome a decisao nesta ordem:

1. o problema exige acao, leitura, selecao, navegacao ou feedback
2. existe wrapper local para isso
3. o componente oficial escolhido respeita tokens, semantica e densidade do produto
4. vale padronizar agora ou o uso ainda e experimental

## Guidelines por categoria oficial

### Buttons

- `Button` e o padrao para CTA institucional
- `ButtonGroup` e `ToggleButtonGroup` so fazem sentido quando ha comparacao real entre opcoes irmas
- `CloseButton` deve ser reservado a overlays e elementos dismissiveis

### Collections

- `Dropdown` e bom para acoes secundarias de tabela e card
- `Listbox` e `TagGroup` valem quando ha metadado ou filtro mais rico que um select simples
- evite menu escondido para acao primaria

### Colors

- os componentes de cor pertencem ao laboratorio do design system
- nao devem aparecer no fluxo principal do gestor ou do conselheiro
- `ColorSwatch` pode aparecer na documentacao ou em pagina de tokens

### Controls

- `Switch` para liga e desliga binario
- `Slider` para intervalo gradual
- nao use `Switch` quando a escolha precisa ser comparada lado a lado

### Data Display

- status institucional deve priorizar `Chip` ou wrapper `Badge`
- `Table` deve ser o bloco dominante para dados administrativos
- use selos pequenos, nao mosaicos de cores sem significado

### Date and Time

- filtros historicos pedem `DateRangePicker`
- agendamento e prazo pedem `DatePicker`
- `Calendar` e `RangeCalendar` sao melhores em contexto exploratorio ou visual

### Feedback

- `Alert` para mensagem visivel no corpo da tela
- `Toast` para confirmacao efemera apos acao
- `Skeleton` para carregamento previsivel
- `ProgressBar` e `Meter` devem mostrar contexto, nao so percentual

### Forms

- toda captura de dado precisa de `Label`
- `Input`, `TextArea` e `Select` devem cobrir a maior parte dos formulários
- `InputGroup` vale quando prefixo, sufixo ou trigger melhoram a clareza
- `InputOtp` nao deve entrar no MVP sem necessidade real

### Layout

- `Card` deve ser a unidade basica de composicao
- `Toolbar` deve agrupar filtros e acoes relacionadas
- `Separator` serve para leitura, nao para ornamentacao

### Media

- `Avatar` deve aparecer apenas quando a identidade de uma pessoa ajuda a leitura
- evite avatares genéricos decorativos

### Navigation

- `Tabs` apenas para secoes irmas do mesmo contexto
- `Breadcrumbs` ajudam a banca a entender profundidade do fluxo
- `Accordion` e `Disclosure` sao bons para densidade controlada

### Overlays

- `Modal` e `AlertDialog` pedem objetivo unico e CTA claro
- `Drawer` e melhor que modal quando ha formulários ou filtros mais longos
- `Tooltip` nao substitui label, helper text ou explicacao essencial

### Pickers

- `Select` deve cobrir opcoes conhecidas e fechadas
- `Autocomplete` e `ComboBox` valem para bases grandes, busca de municipio ou entidade
- nao use `ComboBox` quando um `Select` simples resolve

### Typography

- `Kbd` e util para laboratorios internos e documentacao
- nao e componente central da experiencia do produto

### Utilities

- `ScrollShadow` ajuda a comunicar que ha mais conteudo rolavel
- bom para tabelas, paines laterais e menus longos

## Guidelines por contexto

## Dashboard estadual

Priorize:

- cards
- progress bar ou progress circle
- table
- badge ou chip
- select
- alert
- date range picker

## Portal do conselho

Priorize:

- input
- form
- text area
- modal
- table
- toast
- badge
- date picker

## Mapa e exploracao

Priorize:

- card
- chip
- tooltip
- popover
- skeleton
- select
- drawer

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
- `Toolbar + Select + DateRangePicker`
- `Tabs + Card + Table`

### Uso ruim

- componente HeroUI com muitas classes avulsas sem padrao
- mistura de estilos institucionais e aleatorios
- muitos variants sem semantica

## Guidelines de performance

- use `Skeleton` em telas de dados
- use componentes pesados so quando houver necessidade
- para fluxo recorrente, extraia wrapper ou pattern

## Wrappers prioritarios

Com a base atual pronta, os proximos componentes que mais valem padronizacao local sao:

1. `DatePicker`
2. `Drawer`
3. `Autocomplete`
4. `DateRangePicker`
5. `Popover`
6. `Separator`

## Guidelines para hackathon

- prefira clareza sobre inventividade gratuita
- escolha componentes que a banca entende rapido
- mantenha a tela explicavel em 10 segundos
- toda interface deve parecer parte do mesmo sistema
