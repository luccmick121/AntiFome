# HeroUI Components: Actions and Inputs

## Objetivo da categoria

Componentes usados para:

- acao
- entrada de dados
- validacao
- captura de estado do usuario

## Catalogo

| Componente | Quando usar | Observacao para Antifome RS |
|---|---|---|
| Button | CTA, acao primaria, secundaria ou critica | preferir wrapper local |
| Input | texto curto, email, senha | preferir wrapper local |
| Textarea | texto maior, observacoes, ata resumida | bom para reunioes e documentos |
| Form | agrupar campos e validacao | usar com react-hook-form |
| Label | rotulo de campo | wrapper local simples |
| Checkbox | booleano isolado | bom para filtros simples |
| Checkbox Group | selecao multipla | usar quando a lista for curta |
| Radio Group | escolha unica explicita | usar quando o usuario precisa comparar opcoes |
| Switch | ligar e desligar configuracao | bom para toggles binarios |
| Slider | ajuste por faixa | bom para simulador de impacto |
| Number Input | valores numericos controlados | bom para metas e indicadores |
| Input OTP | codigo de verificacao | nao necessario no MVP atual |
| SearchField | busca com semantica pronta | alternativa a Input em filtros |
| TextField | base de texto controlado | util em casos mais brutos |
| Description | texto auxiliar | use com parcimonia |
| ErrorMessage | erro por campo | ideal para forms mais estruturados |
| FieldError | erro de validacao | complementar ao form |
| Fieldset | grupo semantico de campos | bom para formularios maiores |

## Componentes mais importantes para este projeto

### Button

Use para:

- entrar no sistema
- salvar cadastro
- registrar reuniao
- remover documento
- confirmar acao critica

Regra local:

- sempre preferir [Button](/home/mestredoblack/teste/frontend/src/components/ui/button.tsx)

### Input

Use para:

- login
- nome de membro
- email
- filtros de busca

Regra local:

- sempre preferir [Input](/home/mestredoblack/teste/frontend/src/components/ui/input.tsx)

### Textarea

Melhor uso no Antifome RS:

- pauta de reuniao
- descricao de documento
- observacoes institucionais

### Slider

Melhor uso:

- simulador de impacto
- cenarios de eficiencia

## Guidelines

- campos criticos devem ter label explicita
- use placeholder como ajuda, nao como unico rotulo
- erro deve ser curto e acionavel
- CTA principal deve ser visualmente obvio
- acoes destrutivas devem usar `danger` ou `urgency`

## Nao usar quando

- um botao esta sendo usado apenas para navegar e um `Link` resolve melhor
- um switch esta sendo usado para escolha onde radio group comunicaria melhor
- um input recebe texto longo demais e deveria ser textarea

