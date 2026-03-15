# HeroUI Components: Navigation and Layout

## Objetivo da categoria

Componentes para:

- estruturar a tela
- orientar navegacao
- organizar blocos de informacao

## Catalogo

| Componente | Quando usar | Observacao para Antifome RS |
|---|---|---|
| Accordion | detalhes expansivos | bom para FAQ ou explicacoes densas |
| Breadcrumbs | trilha de navegacao | bom em detalhe de municipio |
| Link | navegacao sem semantica de botao | preferir para links puros |
| Pagination | lista longa paginada | essencial em ranking maior |
| Tabs | alternancia entre subareas | bom em status ou areas institucionais |
| Navbar | navegacao horizontal | menos relevante no layout atual |
| Card | painel base de conteudo | wrapper local pronto |
| Divider | separacao visual | pode ganhar wrapper local |
| Separator | separador neutro | similar a Divider em muitos cenarios |
| Surface | bloco de superficie | util para sistemas maiores |
| Toolbar | faixa de acoes | boa para area de filtros |
| Spacer | espacamento declarativo | util quando necessario |

## Componentes mais importantes para este projeto

### Card

E o principal bloco estrutural do produto.

Use para:

- KPI
- resumo institucional
- alertas
- blocos do portal do conselho

### Tabs

Boa opcao para:

- separar sessoes do status do conselho
- organizar documentacao interna
- alternar paineis com mesmo contexto

### Breadcrumbs

Vale muito para:

- pagina de detalhe do municipio
- navegacao mais clara para banca

## Guidelines

- use `Card` como unidade base de informacao
- so use `Tabs` quando o conteudo compartilhado for claramente do mesmo contexto
- `Breadcrumbs` devem ser curtos e funcionais
- `Divider` deve ajudar leitura, nao poluir a interface

