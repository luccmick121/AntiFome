# HeroUI Full Component Catalog

Catalogo mestre da biblioteca HeroUI para o Antifome RS.

Fonte principal:

- catalogo oficial do HeroUI em `https://v3.heroui.com/docs/components-list`

Data de consolidacao desta copia local:

- 15 de marco de 2026

Escopo deste arquivo:

- registrar todos os componentes atualmente listados pelo HeroUI
- agrupar os componentes pelas categorias oficiais da biblioteca
- traduzir cada item para decisoes praticas do Antifome RS
- indicar onde vale usar wrapper local, uso direto ou apenas referencia futura

## Leitura rapida

- use este arquivo como inventario oficial
- use [component-index.md](./component-index.md) como atalho navegavel
- use [project-mapping.md](./project-mapping.md) para saber o que ja existe no projeto
- use [guidelines.md](./guidelines.md) para decidir qual componente escolher

## Resumo do catalogo oficial

O catalogo oficial consolidado aqui possui 70 componentes distribuidos em 15 categorias:

1. Buttons
2. Collections
3. Colors
4. Controls
5. Data Display
6. Date and Time
7. Feedback
8. Forms
9. Layout
10. Media
11. Navigation
12. Overlays
13. Pickers
14. Typography
15. Utilities

## Buttons

Total oficial: 5 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Button` | acao primaria, secundaria ou critica | CTAs de login, salvar, confirmar, exportar | preferir wrapper local |
| `ButtonGroup` | agrupar botoes relacionados | alternancia curta de acoes de mesma hierarquia | uso direto ou futuro wrapper |
| `CloseButton` | acao explicita de fechar | drawer, modal, painel lateral, banner dismissible | uso direto |
| `ToggleButton` | botao com estado ligado/desligado | filtros de visualizacao, alternancia de camada, mapa ou tabela | uso direto |
| `ToggleButtonGroup` | grupo exclusivo ou multiplo de toggles | seletor de modo de leitura, recorte territorial, comparacao | uso direto |

## Collections

Total oficial: 3 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Dropdown` | menu contextual de acoes | menus de linha em tabela, acoes secundarias de card | uso direto |
| `Listbox` | lista selecionavel rica | filtros, selecao de opcoes com metadados, listas densas | uso direto |
| `TagGroup` | conjunto de tags selecionaveis | filtros por tema, publico, risco ou eixo de politica | uso direto |

## Colors

Total oficial: 6 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `ColorArea` | selecao visual bidimensional de cor | praticamente nao necessario no produto final | referencia futura |
| `ColorField` | entrada textual de cor | somente para ferramental interno de tema ou branding | referencia futura |
| `ColorPicker` | seletor completo de cor | util apenas em laboratorios internos de design system | referencia futura |
| `ColorSlider` | ajuste linear de canal de cor | laboratorio de tema, nao para usuarios finais | referencia futura |
| `ColorSwatch` | amostra unica de cor | paginas de tokens e identidade visual | uso pontual |
| `ColorSwatchPicker` | grade de cores selecionavel | selecao de paleta em area administrativa de design | referencia futura |

## Controls

Total oficial: 2 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Slider` | ajuste por faixa continua | simuladores, pesos, limites e sensibilidade de alertas | uso direto |
| `Switch` | alternancia booleana | ativar notificacoes, visualizacao, filtros simples | uso direto |

## Data Display

Total oficial: 3 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Badge` | rotulo semantico compacto | selo simples, pequena anotacao de estado | wrapper local usa `Chip` |
| `Chip` | status, categoria ou contagem | aderido, em processo, inativo, risco e critico | preferir wrapper local `Badge` |
| `Table` | exibicao estruturada de dados | ranking, conselhos, documentos, reunioes, membros | wrapper local pronto |

## Date and Time

Total oficial: 6 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Calendar` | selecao de data por grade | agendas, reunioes, cronogramas e filtro por data | uso direto |
| `DateField` | campo de data textual estruturado | formularios tecnicos e entradas controladas | uso direto |
| `DatePicker` | campo de data com popover | cadastro de reuniao, prazo documental, vigencia | uso direto |
| `DateRangePicker` | intervalo de datas | filtros de relatorio, serie historica e auditoria | uso direto |
| `RangeCalendar` | calendario de intervalo | planejamento e janelas analiticas | uso direto |
| `TimeField` | entrada de hora | horarios de reuniao, agenda e operacao | uso direto |

## Feedback

Total oficial: 6 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Alert` | mensagem contextual na propria tela | orientacao, atencao, erro e aviso operacional | wrapper composicional local |
| `Meter` | leitura de capacidade ou nivel | madurez, cobertura, eficiencia, aderencia percentual | uso direto |
| `ProgressBar` | progresso linear | onboarding, upload, adesao ao SISAN, metas | wrapper local pronto |
| `ProgressCircle` | progresso radial | cards compactos de KPI e resumo executivo | uso direto |
| `Skeleton` | placeholder de carregamento | dashboards, listas e mapa durante fetch | preferir wrapper local |
| `Spinner` | estado de espera curto | botao carregando, bloco leve, refresh pontual | uso direto |

## Forms

Total oficial: 16 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Checkbox` | selecao booleana individual | aceite, filtros, confirmacoes simples | uso direto |
| `CheckboxGroup` | varias escolhas no mesmo campo | filtros por categoria, eixo, publico ou status | uso direto |
| `Description` | texto auxiliar de campo | microcopy sob label ou apoio de validacao | uso direto |
| `ErrorMessage` | mensagem de erro por campo | feedback direto e acionavel em formularios | uso direto |
| `FieldError` | erro semantico de campo | integracao com validacao formal | uso direto |
| `Fieldset` | agrupamento semantico | blocos longos de cadastro ou configuracao | uso direto |
| `Form` | orquestracao e validacao do formulario | formularios com react-hook-form e Zod | uso direto |
| `Input` | texto curto | login, email, nome, filtros, codigos | preferir wrapper local |
| `InputGroup` | combinacao de input com acao ou trigger | busca com botao, prefixo, mascara ou seletor | referencia forte para wrapper futuro |
| `InputOtp` | codigo multi-campo | autenticacao ou confirmacao em etapas futuras | referencia futura |
| `Label` | rotulo de campo | sempre que houver formulario formal | wrapper local pronto |
| `NumberField` | numero controlado | metas, pesos, indices, quantidade de familias | uso direto |
| `RadioGroup` | escolha unica explicita | comparacao clara entre cenarios ou opcoes | uso direto |
| `SearchField` | busca com semantica dedicada | filtros globais e busca institucional | uso direto |
| `TextField` | campo textual base | casos avancados de composicao manual | uso direto |
| `TextArea` | texto longo | atas, pareceres, observacoes e justificativas | wrapper local pronto |

## Layout

Total oficial: 4 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Card` | bloco estrutural base | KPI, resumo, listagem, status, modulo institucional | preferir wrapper local |
| `Separator` | separacao visual neutra | dividir secoes, listas e cabecalhos | uso direto |
| `Surface` | superficie de alto nivel | shells, paines densos, regioes de layout | uso direto |
| `Toolbar` | faixa de ferramentas e acoes | filtros, ordenacao, exportacao, acao de tabela | uso direto |

## Media

Total oficial: 1 componente

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Avatar` | representacao visual de pessoa ou entidade | membros do conselho, responsavel municipal, perfis | uso direto |

## Navigation

Total oficial: 7 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Accordion` | conteudo expansivel | FAQ, detalhamento de criterio, ajuda contextual | uso direto |
| `Breadcrumbs` | trilha de navegacao | detalhe de municipio, area de documentos, admin | uso direto |
| `Disclosure` | painel aberto ou fechado | exibicao sob demanda com controle simples | uso direto |
| `DisclosureGroup` | grupo de disclosures coordenados | FAQ institucional, secoes tecnicas, ajuda | uso direto |
| `Link` | navegacao sem semantica de botao | navegacao secundaria, referencias e downloads | uso direto |
| `Pagination` | navegacao por paginas | listas extensas de municipios, docs e eventos | uso direto |
| `Tabs` | alternancia entre secoes irmas | status, visoes analiticas, secoes do conselho | wrapper local pronto |

## Overlays

Total oficial: 6 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `AlertDialog` | confirmacao critica e bloqueante | exclusao, revogacao, encerrar sessao, risco grave | uso direto |
| `Drawer` | painel lateral | filtros densos, detalhes rapidos, edicao contextual | uso direto |
| `Modal` | janela sobreposta principal | confirmacao, formulario curto, detalhe rapido | preferir wrapper local `Dialog` |
| `Popover` | contexto curto ancorado | dicas, acoes compactas, preview de item | uso direto |
| `Toast` | feedback efemero | sucesso, erro, aviso e conclusao de fluxo | preferir wrapper local `useToast` |
| `Tooltip` | dica breve suplementar | icones, siglas, metrica sem explicacao completa | uso direto |

## Pickers

Total oficial: 3 componentes

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Autocomplete` | busca com sugestoes | municipio, membro, programa, indicador | uso direto |
| `ComboBox` | campo que combina busca e selecao | bases grandes ou semantica mais rica | uso direto |
| `Select` | selecao estruturada | status, risco, municipio, conselho, periodo | wrapper local pronto |

## Typography

Total oficial: 1 componente

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `Kbd` | representar atalho de teclado | laboratorios internos, documentacao e areas power-user | uso pontual |

## Utilities

Total oficial: 1 componente

| Componente | Papel no HeroUI | Uso recomendado no Antifome RS | Adoção local |
|---|---|---|---|
| `ScrollShadow` | sugerir continuidade de rolagem | menus, listas, tabelas estreitas e paineis laterais | uso direto |

## Componentes prioritarios para o Antifome RS

Os componentes de maior valor imediato para o produto sao:

1. `Button`
2. `Input`
3. `TextArea`
4. `Select`
5. `Table`
6. `Card`
7. `Tabs`
8. `Alert`
9. `ProgressBar`
10. `DatePicker`
11. `Modal`
12. `Tooltip`

## Proximos wrappers locais prioritarios

Depois da criacao dos wrappers de `Select`, `Table`, `ProgressBar`, `TextArea` e `Tabs`, os proximos candidatos naturais sao:

1. `Tooltip`
2. `DatePicker`
3. `Drawer`
4. `Autocomplete`
5. `Pagination`
6. `Breadcrumbs`

## Componentes de baixa prioridade no produto atual

Estes componentes fazem parte do catalogo oficial, mas sao secundarios para o MVP e para a banca do hackathon:

- `ColorArea`
- `ColorField`
- `ColorPicker`
- `ColorSlider`
- `ColorSwatchPicker`
- `InputOtp`
- `Kbd`

Eles devem permanecer documentados, mas nao precisam liderar a implementacao do produto.
