# Antifome RS

Plataforma de governança territorial para monitorar segurança alimentar, atividade dos conselhos municipais e capacidade de resposta pública no Rio Grande do Sul.

## Demo Pública

- Frontend: https://antifome-rs-frontend.vercel.app
- Backend: https://antifome-rs-backend.vercel.app
- Swagger: https://antifome-rs-backend.vercel.app/api/docs
- Repositório: https://github.com/luccmick121/AntiFome

## Resumo do Projeto

O Antifome transforma um problema público difuso em uma operação visível e acionável.

Hoje, Estado e municípios ainda dependem de planilhas, relatórios dispersos e leitura institucional fragmentada para acompanhar conselhos, adesão ao SISAN, atividade territorial e risco de descontinuidade. O resultado é silêncio administrativo, baixa priorização e resposta lenta.

A proposta do projeto é simples de entender:

- o Estado ganha um cockpit executivo com mapa, ranking, alertas e leitura territorial;
- o conselho municipal ganha um portal operacional para manter membros, reuniões e documentos;
- a governança deixa de ser invisível e passa a ser monitorável.

## O Que Já Está Entregue

- dashboard executivo estadual;
- mapa territorial do RS;
- ranking de municípios;
- alertas de inatividade;
- detalhe de município;
- portal municipal do conselho;
- gestão de membros;
- registro de reuniões;
- repositório de documentos;
- simulador de impacto;
- documentação de produto, arquitetura, stories e QA.

## Fluxos Principais

### 1. Fluxo estadual

- login da equipe estadual;
- visão consolidada do estado;
- navegação por mapa, ranking, alertas e gestão;
- detalhe operacional por município.

### 2. Fluxo municipal

- login do conselho;
- atualização de membros;
- registro de reuniões e atas;
- envio e gestão documental;
- leitura do status institucional.

## Links Para a Banca

### Leitura rápida

- One-pager: [docs/hackathon/one-pager-executivo.md](./docs/hackathon/one-pager-executivo.md)
- Briefing executivo: [docs/hackathon/briefing-executivo.md](./docs/hackathon/briefing-executivo.md)
- Roadmap estratégico: [docs/hackathon/roadmap-estrategico.md](./docs/hackathon/roadmap-estrategico.md)
- Guia de apresentação: [docs/hackathon/guia-de-apresentacao.md](./docs/hackathon/guia-de-apresentacao.md)
- Roteiro dos slides: [docs/hackathon/slides-roteiro.md](./docs/hackathon/slides-roteiro.md)

### Produto e arquitetura

- PRD: [docs/prd/prd-antifome.md](./docs/prd/prd-antifome.md)
- Arquitetura: [docs/architecture/README.md](./docs/architecture/README.md)
- API spec: [docs/architecture/api-spec.md](./docs/architecture/api-spec.md)
- Design system: [docs/design-system/README.md](./docs/design-system/README.md)
- Stories: [docs/stories](./docs/stories)
- Quality gate: [docs/qa/quality-gate-report-2026-03-15.md](./docs/qa/quality-gate-report-2026-03-15.md)

## Diferencial do Projeto

O Antifome não é apenas um dashboard.

Ele combina duas camadas que normalmente aparecem separadas:

- monitoramento executivo;
- operação institucional local.

Isso permite mostrar, no mesmo produto:

- onde a governança falha;
- quem precisa agir;
- como o município registra sua operação;
- como o Estado prioriza resposta.

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 14, React 18, Tailwind CSS, HeroUI, Leaflet |
| Backend | NestJS 10, Prisma, JWT, Swagger |
| Banco | PostgreSQL |
| Monorepo | pnpm workspace |
| Deploy | Vercel |

## Estrutura do Repositório

```text
.
├── backend/
├── frontend/
├── docs/
│   ├── architecture/
│   ├── design-system/
│   ├── hackathon/
│   ├── prd/
│   ├── qa/
│   └── stories/
├── package.json
└── pnpm-workspace.yaml
```

## Credenciais de Demonstração

| Perfil | Email | Senha |
|---|---|---|
| Admin | `admin@antifome.rs` | `senha123` |
| Gestor estadual | `gestor1@antifome.rs` | `senha123` |
| Gestor estadual | `gestor2@antifome.rs` | `senha123` |
| Conselheiro municipal | `conselheiro1@exemplo.com` | `senha123` |

Observação: o seed cria usuários adicionais de conselheiro no padrão `conselheiro[1-10]@exemplo.com`.

## Como Rodar Localmente

### Pré-requisitos

- Node.js 18+
- pnpm 9+
- PostgreSQL

### Instalação

```bash
pnpm install
```

### Variáveis de ambiente

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

Valores-base esperados:

- `NEXT_PUBLIC_API_URL=http://localhost:3001`
- `DATABASE_URL=postgresql://user:password@localhost:5432/antifome_rs?schema=public`
- `JWT_SECRET=your-secret-key-change-in-production`
- `PORT=3001`

### Banco

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### Desenvolvimento

```bash
pnpm dev
```

Aplicações locais:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

## Mensagem Central

Sem governança local visível, a fome continua invisível para quem precisa agir.
