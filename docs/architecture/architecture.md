# Plataforma Antifome RS — Documentação de Arquitetura

**Version:** 1.0.0
**Last Updated:** 14/03/2026
**Status:** Active
**PRD:** [prd-antifome.md](../prd/prd-antifome.md)

---

## Visão Geral

A **Plataforma Antifome RS** é um sistema de governança preditiva para monitoramento dos 497 CONSEAs municipais do Rio Grande do Sul. Conecta dados de vulnerabilidade alimentar com execução orçamentária SAN em tempo real.

### Objetivos Arquiteturais

| Objetivo | Descrição | Prioridade |
|----------|-----------|------------|
| **Tempo Real** | Detectar conselhos inativos em menos de 24h | Alta |
| **Escala** | Suportar 497 municípios com expansão nacional futura | Alta |
| **Performance** | Carregar mapa com todos os municípios em < 3s | Alta |
| **Segurança** | LGPD compliant + RBAC por perfil | Alta |
| **Hackathon** | MVP funcional em 15 horas | Crítica |

---

## Arquitetura de Sistema

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          CLIENTS (Browsers)                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ Gestor       │  │ Gestor       │  │ Conselheiro  │  │ Sociedade  │ │
│  │ Estadual     │  │ Municipal    │  │ Municipal    │  │ Civil      │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └─────┬──────┘ │
└─────────┼─────────────────┼─────────────────┼────────────────┼────────┘
          │                 │                 │                │
          ▼                 ▼                 ▼                ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js 14 - Port 3000)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────────┐ │
│  │ App Router  │  │ Tailwind    │  │ shadcn/ui   │  │ Leaflet Map   │ │
│  │ SSR/RSC     │  │ CSS         │  │ Components  │  │ react-leaflet │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └───────────────┘ │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ HTTP/REST (CORS enabled)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     BACKEND (NestJS - Port 3001)                       │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                        API Layer                                │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │   │
│  │  │ Auth     │ │Dashboard │ │ Mapa     │ │Municipios│          │   │
│  │  │ Module   │ │ Module   │ │ Module   │ │ Module   │          │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │   │
│  │  │Conselhos │ │Reunioes  │ │ Membros  │ │Documentos│          │   │
│  │  │ Module   │ │ Module   │ │ Module   │ │ Module   │          │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Service Layer                              │   │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────────┐  │   │
│  │  │ Index Antifome│  │ GeoJSON       │  │ Notification      │  │   │
│  │  │ Calculator    │  │ Cache Service │  │ Service           │  │   │
│  │  └───────────────┘  └───────────────┘  └───────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                      Data Layer (Prisma ORM)                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATABASE (PostgreSQL)                           │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐  │
│  │  Estados   │ │Municipios  │ │ Conselhos  │ │ Relatorios Fome    │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────────────┐  │
│  │  Membros   │ │ Reunioes   │ │   Atas     │ │ Recursos SAN       │  │
│  └────────────┘ └────────────┘ └────────────┘ └────────────────────┘  │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐                        │
│  │   Selos    │ │ Usuarios   │ │ Documentos │                        │
│  └────────────┘ └────────────┘ └────────────┘                        │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Stack Tecnológica

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| **Frontend** | Next.js | 14+ | App Router, SSR, RSC, otimizado para dashboards |
| **UI Components** | shadcn/ui | latest | Componentes acessíveis, customizáveis |
| **Estilização** | Tailwind CSS | 3.x | Design system rápido, classes utilitárias |
| **Mapa** | Leaflet + react-leaflet | 4.x | Leve, sem API key, OpenStreetMap |
| **Backend** | NestJS | 10.x | Arquitetura modular, TypeScript nativo |
| **ORM** | Prisma | 5.x | Type-safe, migrations, seed |
| **Banco** | PostgreSQL | 15+ | Robusto, GIS support (PostGIS optional) |
| **Auth** | JWT + bcrypt | - | Sessão segura, RBAC |
| **API Docs** | Swagger | - | Documentação automática |

---

## Estrutura de Diretórios

```
/home/mestredoblack/teste/
├── docs/
│   ├── prd/
│   │   └── prd-antifome.md          # PRD principal
│   ├── architecture/                 # ← Este diretório
│   │   ├── architecture.md           # Visão geral (este arquivo)
│   │   ├── tech-stack.md             # Detalhes da stack
│   │   ├── data-model.md             # Schema Prisma
│   │   └── api-spec.md               # Especificação de APIs
│   └── stories/                      # Stories de desenvolvimento
│
├── frontend/                         # ← Next.js (a criar)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx            # Layout root com sidebar
│   │   │   ├── page.tsx              # Dashboard principal
│   │   │   ├── login/
│   │   │   │   └── page.tsx          # Tela de login
│   │   │   ├── mapa/
│   │   │   │   └── page.tsx          # Mapa interativo
│   │   │   ├── ranking/
│   │   │   │   └── page.tsx          # Ranking municípios
│   │   │   ├── alertas/
│   │   │   │   └── page.tsx          # Alertas inatividade
│   │   │   ├── municipios/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx      # Detalhe município
│   │   │   ├── conselho/
│   │   │   │   ├── page.tsx          # Portal conselho
│   │   │   │   ├── membros/
│   │   │   │   │   └── page.tsx      # Gestão membros
│   │   │   │   └── reunioes/
│   │   │   │       └── page.tsx      # Registro reuniões
│   │   │   ├── gestao/
│   │   │   │   └── page.tsx          # Gestão CONSEA
│   │   │   └── documentos/
│   │   │       └── page.tsx          # Repositório docs
│   │   ├── components/
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── layout/
│   │   │   │   ├── sidebar.tsx
│   │   │   │   ├── header.tsx
│   │   │   │   └── kpi-cards.tsx
│   │   │   ├── map/
│   │   │   │   ├── rs-map.tsx        # Mapa principal
│   │   │   │   ├── map-layers.tsx    # Camadas toggle
│   │   │   │   └── map-legend.tsx
│   │   │   └── dashboard/
│   │   │       ├── ranking-table.tsx
│   │   │       └── alert-list.tsx
│   │   ├── lib/
│   │   │   ├── api.ts                # Cliente API
│   │   │   ├── auth.ts               # Autenticação
│   │   │   └── utils.ts              # Utilitários
│   │   └── styles/
│   │       └── globals.css           # Tailwind + tema
│   ├── public/
│   │   ├── geojson/
│   │   │   └── rs-municipios.json    # GeoJSON IBGE
│   │   └── favicon.ico
│   ├── tailwind.config.ts            # Configuração tema
│   ├── next.config.js
│   └── package.json
│
├── backend/                          # ← NestJS (a criar)
│   ├── src/
│   │   ├── main.ts                   # Bootstrap
│   │   ├── app.module.ts             # Root module
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── guards/
│   │   │       ├── jwt.guard.ts
│   │   │       └── roles.guard.ts
│   │   ├── municipios/
│   │   │   ├── municipios.module.ts
│   │   │   ├── municipios.controller.ts
│   │   │   └── municipios.service.ts
│   │   ├── conselhos/
│   │   │   ├── conselhos.module.ts
│   │   │   ├── conselhos.controller.ts
│   │   │   └── conselhos.service.ts
│   │   ├── reunioes/
│   │   │   ├── reunioes.module.ts
│   │   │   ├── reunioes.controller.ts
│   │   │   └── reunioes.service.ts
│   │   ├── membros/
│   │   │   ├── membros.module.ts
│   │   │   ├── membros.controller.ts
│   │   │   └── membros.service.ts
│   │   ├── dashboard/
│   │   │   ├── dashboard.module.ts
│   │   │   ├── dashboard.controller.ts
│   │   │   └── dashboard.service.ts
│   │   ├── mapa/
│   │   │   ├── mapa.module.ts
│   │   │   ├── mapa.controller.ts
│   │   │   └── mapa.service.ts
│   │   ├── documentos/
│   │   │   ├── documentos.module.ts
│   │   │   ├── documentos.controller.ts
│   │   │   └── documentos.service.ts
│   │   └── prisma/
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── prisma/
│   │   ├── schema.prisma             # Schema definition
│   │   ├── migrations/               # Migrations
│   │   └── seed.ts                   # Seed data 497 municípios
│   ├── test/
│   ├── nest-cli.json
│   └── package.json
│
└── docker-compose.yml                # PostgreSQL container
```

---

## Requisitos Não-Funcionais

| ID | Requisito | Solução Arquitetural |
|----|-----------|---------------------|
| **NFR1** | Mapa < 3s | Cache GeoJSON em memória (NestJS), lazy loading (Leaflet) |
| **NFR2** | Stack definida | Next.js + NestJS + Prisma + PostgreSQL |
| **NFR3** | Seed via IBGE | Script prisma/seed.ts com API do IBGE |
| **NFR4** | Multi-estado | Tabela `estados` como raiz, FK em municípios |
| **NFR5** | Dados simulados | Seed com distribuição realista 71/17/12 |
| **NFR6** | Responsivo | Tailwind breakpoints, desktop-first 1280px+ |
| **NFR7** | Branding governamental | Paleta #1A2F23/#B71C1C, Roboto |
| **NFR8** | LGPD | Anonimização, sem CPF expostos |
| **NFR9** | RBAC | 4 perfis: gestor-estadual, gestor-municipal, conselheiro, sociedade-civil |
| **NFR10** | Auditoria | Log de ações críticas em tabela `audit_logs` |
| **NFR11** | Auth segura | JWT + proteção rotas + validação backend |

---

## Módulos Backend (NestJS)

| Módulo | Responsabilidade | Endpoints |
|--------|-----------------|-----------|
| **AuthModule** | Autenticação, JWT, RBAC | `/auth/login`, `/auth/logout` |
| **MunicipiosModule** | CRUD municípios, status SISAN/CAISAN | `/municipios`, `/municipios/:id` |
| **ConselhosModule** | Gestão conselhos, status | `/conselhos`, `/conselhos/:id` |
| **ReunioesModule** | Registro de reuniões e atas | `/conselhos/:id/reuniao` |
| **MembrosModule** | Cadastro de conselheiros | `/conselhos/:id/membro` |
| **DashboardModule** | KPIs globais, estatísticas | `/dashboard/stats` |
| **MapaModule** | GeoJSON, camadas, cache | `/mapa/geojson`, `/mapa/layers` |
| **DocumentosModule** | Repositório de documentos | `/documentos` |

---

## Fluxo de Dados

```
1. SEED (inicialização)
   prisma/seed.ts → API IBGE → PostgreSQL (497 municípios + GeoJSON)

2. MAPA (leitura)
   Frontend (Leaflet) → GET /mapa/geojson → Cache → PostgreSQL
                                              ↓
                                    GeoJSON com status + score

3. DASHBOARD (KPIs)
   Frontend (KPI Cards) → GET /dashboard/stats → Agregação → PostgreSQL
                                                     ↓
                                    conselhosAtivos%, familiasRisco, orcamento

4. PORTAL CONSELHO (escrita)
   Conselheiro → POST /conselhos/:id/reuniao → Validação → PostgreSQL
                                                       ↓
                              Atualiza status conselho + recalcula Índice

5. ALERTAS (monitoramento)
   Backend (cron ou on-demand) → Query conselhos atrasados → Frontend
```

---

## Segurança e RBAC

| Perfil | Permissões | Rotas Acessíveis |
|--------|-----------|------------------|
| **gestor-estadual** | Read all, notificar, relatórios | Todas |
| **gestor-municipal** | Read município, status SISAN/CAISAN | `/municipios/:id`, `/dashboard` (limitado) |
| **conselheiro** | Write conselho, membros, reuniões | `/conselho/*` |
| **sociedade-civil** | Read público | `/mapa`, `/ranking`, `/documentos` (limitado) |

### Implementação

```
Frontend:
  - Middleware de rota protegida
  - Redirect para /login se não autenticado
  - Ocultar UI elements por perfil

Backend:
  - JWT Guard em todas as rotas protegidas
  - Roles Guard para validação de perfil
  - Validação de município vinculado ao usuário
```

---

## Estratégia de Deploy (Hackathon)

| Componente | Deploy | Porta |
|------------|--------|-------|
| Frontend | `npm run dev` | 3000 |
| Backend | `npm run start:dev` | 3001 |
| Database | Docker Compose | 5432 |
| GeoJSON | Arquivo estático no repo | - |

```bash
# Terminal 1: Database
docker-compose up -d postgres

# Terminal 2: Backend
cd backend && npx prisma migrate dev && npx prisma db seed && npm run start:dev

# Terminal 3: Frontend
cd frontend && npm run dev
```

---

## Próximos Passos

1. **Setup Projetos:** Criar estrutura Next.js e NestJS
2. **Schema Prisma:** Definir modelo de dados
3. **Seed Script:** Popular com 497 municípios via IBGE
4. **Mapa Leaflet:** Implementar mapa choropleth
5. **Dashboard:** KPIs e ranking
6. **Portal Conselho:** CRUD membros e reuniões
7. **Auth:** Login e RBAC

---

## Referências

| Documento | Path |
|-----------|------|
| PRD | `docs/prd/prd-antifome.md` |
| Schema Prisma | `docs/architecture/data-model.md` |
| API Spec | `docs/architecture/api-spec.md` |
| Tech Stack | `docs/architecture/tech-stack.md` |

---

_Arquitetura criada por Aria (Architect) — 14/03/2026_
