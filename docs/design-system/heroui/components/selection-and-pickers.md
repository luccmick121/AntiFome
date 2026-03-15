# HeroUI Components: Selection and Pickers

## Objetivo da categoria

Componentes para:

- selecionar opcoes
- filtrar dados
- escolher datas
- escolher cores ou valores especializados

## Catalogo

| Componente | Quando usar | Observacao para Antifome RS |
|---|---|---|
| Select | selecao simples ou controlada | muito util para status e filtros |
| Autocomplete | busca com sugestao | bom para municipios |
| ComboBox | campo com busca e selecao | bom para listas medias |
| Dropdown | menu de acoes ou opcoes | bom para acoes contextuais |
| Listbox | listas selecionaveis mais densas | bom para paines laterais |
| TagGroup | grupos de tags selecionaveis | util se houver taxonomia maior |
| Calendar | calendario simples | uso eventual |
| Date Input | entrada estruturada de data | bom para formularios |
| Date Picker | selecao de data em calendario | ideal para reunioes |
| Date Range Picker | intervalo de datas | bom para filtros analiticos |
| Range Calendar | intervalo visual | mais forte para dashboards complexos |
| Time Input | horario estruturado | bom para agenda de reuniao |
| ColorArea | ajuste de cor | nao prioritario no produto |
| ColorField | entrada precisa de cor | nao prioritario |
| ColorPicker | escolha de cor | util apenas em laboratorios de design |
| ColorSlider | ajuste tecnico de cor | nao prioritario |
| ColorSwatch | exibicao de cor | bom para docs de design system |
| ColorSwatchPicker | escolha visual de paleta | bom para labs de branding |

## Componentes mais uteis para o produto

### Select

Uso forte em:

- filtro de status
- tipo de alerta
- cargo de membro
- tipo de reuniao

### Autocomplete

Uso forte potencial em:

- busca de municipios
- localizacao rapida de conselho

### Date Picker e Time Input

Melhor combinacao para:

- agendamento de reunioes
- proxima reuniao
- filtros temporais

## Guidelines

- use `Select` para listas curtas e controladas
- use `Autocomplete` quando houver lista grande ou busca por nome
- use `Date Picker` em vez de input textual para reduzir erro
- evite dropdown para filtro complexo se select comunica melhor

## Nao usar quando

- um conjunto muito pequeno pode ser resolvido com radio group
- o usuario precisa comparar muitas opcoes e uma table filtrada seria mais clara

