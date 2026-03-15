# Epic 1: Fundação e Infraestrutura

| Campo | Valor |
|-------|-------|
| **ID** | EPIC-01 |
| **Prioridade** | Critical |
| **Status** | Ready |
| **Depende de** | Nenhum (base do projeto) |
| **Stories** | 1.1, 1.1b, 1.2, 1.3, 1.4, 1.5 |
| **PRD Ref** | [Seção 6.1](../../prd/prd-antifome.md#epic-1-fundação-e-infraestrutura) |

---

## Objetivo

Estabelecer a base técnica do projeto — Next.js com App Router, Prisma + PostgreSQL, schema de dados normalizado para multi-estado, e seed data dos 497 municípios do RS com distribuição realista de status. O epic termina com um layout funcional com sidebar, KPIs globais no topo, e o sistema rodando localmente.

---

## Goals

- Setup completo frontend Next.js 14 com App Router, Tailwind, shadcn/ui
- Setup completo backend NestJS com módulos principais e Swagger
- Schema Prisma normalizado suportando multi-estado (expansão nacional)
- Seed data dos 497 municípios do RS com distribuição realista de status (71%/17%/12%)
- Layout base com sidebar colapsável e barra de KPIs
- Tela de login e autenticação com JWT + RBAC

---

## Waves de Execução

### Wave 1: Setup dos Projetos (Paralelo)
Stories que rodam em paralelo — um no frontend, outro no backend.

| Story | Título | Executor |
|-------|--------|----------|
| 1.1 | Setup do Frontend (Next.js) | @dev |
| 1.1b | Setup do Backend (NestJS) | @dev |

### Wave 2: Dados e Schema (Sequencial após Wave 1)
Requer ambos os projetos criados.

| Story | Título | Executor |
|-------|--------|----------|
| 1.2 | Schema do Banco de Dados (Prisma) | @dev |
| 1.3 | Seed Data — 497 Municípios do RS | @dev |

### Wave 3: UI Layout e Auth (Sequencial após Wave 2)
Requer schema e seed funcionando.

| Story | Título | Executor |
|-------|--------|----------|
| 1.4 | Layout Base com Sidebar e KPIs | @dev |
| 1.5 | Tela de Login e Autenticação | @dev |

---

## Critérios de Conclusão do Épico

- [ ] Projeto Next.js rodando em `localhost:3000`
- [ ] Projeto NestJS rodando em `localhost:3001` com Swagger em `/api/docs`
- [ ] Banco PostgreSQL com schema Prisma migrado
- [ ] 497 municípios do RS populados com distribuição 71%/17%/12%
- [ ] Layout com sidebar colapsável + 3 KPI cards funcionais
- [ ] Tela de login com autenticação JWT funcionando
- [ ] Todos os NFR de infraestrutura atendidos

---

## Arquivos Envolvedos

```
frontend/                              # ← Criado na Story 1.1
backend/                               # ← Criado na Story 1.1b
backend/prisma/schema.prisma           # ← Story 1.2
backend/prisma/seed.ts                 # ← Story 1.3
frontend/src/app/(dashboard)/layout.tsx # ← Story 1.4
frontend/src/app/(auth)/login/page.tsx # ← Story 1.5
```

---

## Referências

| Documento | Path |
|-----------|------|
| PRD | `docs/prd/prd-antifome.md` |
| Arquitetura | `docs/architecture/architecture.md` |
| Data Model | `docs/architecture/data-model.md` |
| Frontend Arch | `docs/architecture/frontend-architecture.md` |

---

*Épico criado por Morgan (PM) — 14/03/2026*
