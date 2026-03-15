# HeroUI Components: Data Display and Feedback

## Objetivo da categoria

Componentes para:

- exibir status
- mostrar progresso
- renderizar listas e tabelas
- comunicar feedback e carregamento

## Catalogo

| Componente | Quando usar | Observacao para Antifome RS |
|---|---|---|
| Alert | feedback contextual | bom para erros e avisos |
| Avatar | identidade visual de usuario | uso opcional |
| Badge | status compacto | wrapper local via Chip e ideal para status |
| Chip | rotulo semantico | usado no projeto |
| Circular Progress | progresso radial | bom para metas e score |
| Progress | barra de progresso | usado no dashboard e conselho |
| Meter | leitura quantitativa | bom para scores comparativos |
| Skeleton | loading placeholder | wrapper local pronto |
| Spinner | loading simples | bom para carregamento rapido |
| Table | dados tabulares | usado em ranking e catalogos |
| Kbd | atalho de teclado | pouca relevancia atual |
| Code | token tecnico curto | bom para docs internas |
| Snippet | bloco curto copiavel | bom para docs e setup |
| Image | imagem responsiva | bom para assets e ilustracoes |
| User | exibicao resumida de usuario | bom para header ou listas |

## Componentes mais importantes para o produto

### Badge e Chip

Use para:

- status do municipio
- status do conselho
- risco
- aderencia

### Progress

Use para:

- progresso de selo
- andamento de status institucional
- simulacoes

### Table

Use para:

- ranking
- listagens administrativas
- inventarios e documentos

### Skeleton

Use sempre que a tela depende de fetch importante.

## Guidelines

- status critico deve combinar cor e texto
- tabelas precisam destacar a coluna mais importante primeiro
- loading deve preservar a estrutura final da tela
- `Alert` comunica excecao, nao decoracao

