# HeroUI Project Mapping

Mapeamento entre o HeroUI oficial e o que ja existe no Antifome RS.

Catalogo oficial base:

- [Full Component Catalog](./all-components.md)

## Cobertura atual do projeto

O HeroUI oficial consolidado nesta biblioteca possui 70 componentes.

No Antifome RS, a adocao atual se divide assim:

- wrappers locais prontos para os blocos mais recorrentes
- uso direto de componentes HeroUI para necessidades pontuais
- varios componentes apenas documentados por enquanto, sem uso ativo no produto

Essa separacao e saudavel: o projeto nao precisa usar tudo, mas precisa conhecer tudo para tomar decisoes conscientes.

## Wrappers locais existentes

| Wrapper local | Base HeroUI | Status |
|---|---|---|
| `Button` | `Button` | pronto |
| `Badge` | `Chip` | pronto |
| `Card` | `Card`, `CardHeader`, `CardBody`, `CardFooter` | pronto |
| `Input` | `Input` | pronto |
| `Skeleton` | `Skeleton` | pronto |
| `Dialog` | `Modal` | pronto |
| `ToastProvider` / `useToast` | `ToastProvider`, `addToast` | pronto |
| `Alert` | composicao local | pronto |
| `AlertBanner` | composicao local | pronto |
| `Label` | local | pronto |

## HeroUI usado diretamente fora dos wrappers

Encontrado no projeto:

- `HeroUIProvider`
- `Progress`
- `Table`
- `Divider`
- `Select`
- `SelectItem`
- `Chip`

## Regras de adocao

### Ja existe wrapper local

Use o wrapper local.

Exemplos:

- use `@/components/ui/button`
- nao importe `Button` direto do HeroUI para um botao institucional comum

### Nao existe wrapper local, mas o uso e recorrente

Crie wrapper.

Boas candidatas no projeto:

- `Progress`
- `Select`
- `Table`
- `Divider`
- `TextArea`
- `Tabs`
- `Tooltip`
- `DatePicker`
- `Drawer`

### Nao existe wrapper local e o uso e pontual

Pode importar HeroUI direto, desde que:

- o visual respeite o tema
- o padrao seja consistente

## Mapeamento de variants locais

## Button

Variants locais:

- `default`
- `destructive`
- `outline`
- `secondary`
- `ghost`
- `link`
- `success`
- `warning`
- `urgency`

Mapeamento HeroUI:

- `primary solid`
- `danger solid`
- `default bordered`
- `default flat`
- `default light`
- `success solid`
- `warning solid`

## Badge

Wrapper local usa `Chip`.

Variants locais:

- `default`
- `secondary`
- `destructive`
- `outline`
- `success`
- `warning`
- `urgency`

## Dialog

Wrapper local usa `Modal`.

Use o wrapper local quando precisar:

- abrir modal controlado
- ter header e footer padronizados
- manter estrutura consistente

## Input

Wrapper local usa:

- `variant="bordered"`
- `radius="sm"`
- classes institucionais de borda e focus

## Tokens aplicados

Wrappers locais ja embutem:

- radius institucional
- shadows padronizadas
- cores semanticas
- tipografia do produto

## Prioridade de expansao

Os proximos wrappers mais valiosos para o projeto sao:

1. `Select`
2. `Table`
3. `ProgressBar`
4. `TextArea`
5. `Tabs`
6. `Tooltip`
7. `DatePicker`
8. `Drawer`

## Leitura por categoria oficial

### Ja cobertas ou parcialmente cobertas

- Buttons
- Data Display
- Feedback
- Forms
- Layout
- Overlays

### Com uso direto forte, sem wrapper maduro

- Date and Time
- Navigation
- Pickers
- Utilities

### Documentadas, mas com baixa prioridade de produto

- Colors
- Typography
- parte de Collections

## Regra de ouro do mapeamento

Quando um componente oficial entrar no fluxo principal do produto e aparecer em mais de uma tela importante, ele deixa de ser apenas item de catalogo e passa a ser candidato real a wrapper local.
3. `Table`
4. `Textarea`
5. `Tabs`
6. `Tooltip`
