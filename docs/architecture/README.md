# Plataforma Antifome RS — Documentação de Arquitetura

Índice completo da documentação técnica do projeto.

---

## Documentos

| Documento | Descrição | Path |
|-----------|-----------|------|
| **[architecture.md](./architecture.md)** | Visão geral da arquitetura, stack, diagramas | Principal |
| **[data-model.md](./data-model.md)** | Schema Prisma, enums, relacionamentos | Database |
| **[api-spec.md](./api-spec.md)** | Especificação de todas as APIs REST | Backend |
| **[tech-stack.md](./tech-stack.md)** | Detalhes da stack, configurações, setup | Referência |
| **[frontend-architecture.md](./frontend-architecture.md)** | Estrutura Next.js, páginas, componentes | Frontend |

---

## Quick Reference

### Stack

```
Frontend: Next.js 14 + Tailwind + shadcn/ui + Leaflet
Backend:  NestJS + Prisma + JWT
Database: PostgreSQL
```

### Portas

```
Frontend: http://localhost:3000
Backend:  http://localhost:3001
Database: localhost:5432
API Docs: http://localhost:3001/api/docs
```

### Estrutura de Diretórios

```
├── docs/
│   ├── prd/
│   │   └── prd-antifome.md      # PRD original
│   ├── architecture/             # ← Esta pasta
│   │   ├── architecture.md       # Visão geral
│   │   ├── data-model.md         # Schema Prisma
│   │   ├── api-spec.md           # APIs
│   │   ├── tech-stack.md         # Stack details
│   │   └── frontend-architecture.md  # Frontend
│   └── stories/                  # Stories (a criar)
│
├── frontend/                     # Next.js (a criar)
└── backend/                      # NestJS (a criar)
```

---

_Arquitetura criada por Aria (Architect) — 14/03/2026_
