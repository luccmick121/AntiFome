# HeroUI Overview

## O que e HeroUI

HeroUI e uma biblioteca de UI para React baseada em:

- Tailwind CSS
- React Aria

Na pratica, isso significa:

- componentes acessiveis por padrao
- composicao forte
- customizacao por classes e tokens
- boa integracao com Next.js

## Por que usar no Antifome RS

Para o nosso projeto, HeroUI resolve quatro problemas:

1. reduz tempo de construcao visual
2. melhora consistencia entre telas
3. acelera prototipacao de componentes complexos
4. permite adaptar a identidade institucional sem reconstruir tudo do zero

## HeroUI e NextUI

- NextUI foi renomeado para HeroUI
- a documentacao oficial atual ja trata a biblioteca como HeroUI
- parte do ecossistema ainda menciona NextUI, entao na pratica os dois nomes aparecem

## Posicionamento no projeto

No Antifome RS, HeroUI nao substitui o design system do produto.

Ele funciona como:

- base de componentes
- motor de theming
- camada de acessibilidade

O design system do produto vem da combinacao entre:

- HeroUI
- tokens locais
- wrappers locais
- regras de interface do produto

## Modelo de uso recomendado

Use nesta ordem:

1. procure um wrapper local em `frontend/src/components/ui`
2. se nao existir, use o componente HeroUI diretamente
3. se o caso de uso for recorrente, crie um wrapper local

## Componentes oficiais cobertos nesta biblioteca

A biblioteca cobre os componentes oficiais atualmente listados na documentacao do HeroUI:

- Accordion
- Autocomplete
- Alert
- Avatar
- Badge
- Breadcrumbs
- Button
- Calendar
- Card
- Checkbox
- Checkbox Group
- Chip
- Circular Progress
- Code
- Date Input
- Date Picker
- Date Range Picker
- Divider
- Dropdown
- Drawer
- Form
- Image
- Input
- Input OTP
- Kbd
- Link
- Listbox
- Modal
- Navbar
- Number Input
- Pagination
- Popover
- Progress
- Radio Group
- Range Calendar
- Scroll Shadow
- Select
- Skeleton
- Slider
- Snippet
- Spacer
- Spinner
- Switch
- Table
- Tabs
- Toast
- Textarea
- Time Input
- Tooltip
- User
- HeroUIProvider

## O que esta em uso hoje no projeto

Uso direto ou wrapped no Antifome RS:

- HeroUIProvider
- Button
- Card
- Input
- Chip
- Skeleton
- Modal
- Toast
- Divider
- Progress
- Table
- Select

## Resultado esperado

Depois de ler esta biblioteca, qualquer pessoa do time deve conseguir:

- escolher o componente correto mais rapido
- entender quando usar wrapper local ou HeroUI puro
- manter consistencia visual
- montar interfaces novas sem quebrar o design do produto

