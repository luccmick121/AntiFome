# HeroUI Components: Overlays and Utilities

## Objetivo da categoria

Componentes para:

- dialogos
- popups
- feedback flutuante
- organizacao de interacoes auxiliares

## Catalogo

| Componente | Quando usar | Observacao para Antifome RS |
|---|---|---|
| Modal | confirmacao e formularios focados | wrapper local `Dialog` pronto |
| AlertDialog | confirmacao mais critica | bom para exclusao e acao sensivel |
| Drawer | fluxo lateral contextual | bom para detalhe rapido |
| Popover | conteudo curto ancorado | bom para ajuda contextual |
| Toast | feedback nao bloqueante | wrapper local pronto |
| Tooltip | explicacao breve | bom em mapa e icones |
| ScrollShadow | indicio visual de overflow | bom em listas densas |
| HeroUIProvider | provider raiz | ja usado no projeto |
| CloseButton | acao de fechar padrao | util em wrappers futuros |
| ButtonGroup | agrupar botoes relacionados | bom para filtros de visao |
| ToggleButton | estado alternavel | bom para alternancia simples |
| ToggleButtonGroup | alternancia entre modos | bom para vistas de dashboard |

## Componentes mais importantes para este projeto

### Modal

Use para:

- confirmar exclusao
- editar item sem sair da pagina
- formularios curtos

Regra local:

- preferir [Dialog](/home/mestredoblack/teste/frontend/src/components/ui/dialog.tsx)

### Toast

Use para:

- sucesso de cadastro
- erro de operacao
- aviso rapido

Regra local:

- preferir [toast.tsx](/home/mestredoblack/teste/frontend/src/components/ui/toast.tsx)

### Tooltip

Use para:

- icones sem texto
- legenda tecnica
- ajuda curta

Nao use para esconder informacao essencial.

## Guidelines

- modal e para foco, nao para empilhar complexidade
- toast e para feedback curto, nao para explicar processo inteiro
- tooltip deve ser complementar
- popover e melhor que modal quando o conteudo e pequeno e contextual

