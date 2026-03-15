# Plataforma Antifome RS — Documentação de Arquitetura

Índice completo da documentação técnica do projeto.

---

## Documentos

| Documento | Descrição | Path |
|-----------|-----------|------|
| **[architecture.md](./architecture.md)** | Visão geral da arquitetura, stack, diagramas | Principal |
| **[api-architecture.md](./api-architecture.md)** | Estrutura real da API NestJS, módulos, segurança e integrações | Backend |
| **[data-model.md](./data-model.md)** | Schema Prisma, enums, relacionamentos | Database |
| **[api-spec.md](./api-spec.md)** | Especificação de todas as APIs REST | Backend |
| **[api-flows.md](./api-flows.md)** | Fluxos de autenticação, leitura e escrita com Mermaid | Backend |
| **[tech-stack.md](./tech-stack.md)** | Detalhes da stack, configurações, setup | Referência |
| **[frontend-architecture.md](./frontend-architecture.md)** | Estrutura Next.js, páginas, componentes | Frontend |

---

## Quick Reference

### Stack

```
Frontend: Next.js 14 + HeroUI + Tailwind + Leaflet
Backend:  NestJS 10 + Prisma + JWT em cookie HTTP-only
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
│   ├── qa/
│   ├── stories/
│   └── architecture/
│       ├── architecture.md
│       ├── api-architecture.md
│       ├── api-spec.md
│       ├── api-flows.md
│       ├── data-model.md
│       ├── tech-stack.md
│       └── frontend-architecture.md
├── frontend/
└── backend/
```

---

## Biblioteca da API

Para análise profunda da API, siga esta ordem:

1. [api-architecture.md](./api-architecture.md)
2. [api-spec.md](./api-spec.md)
3. [api-flows.md](./api-flows.md)
4. [data-model.md](./data-model.md)

_Índice atualizado a partir da implementação real em 15/03/2026_
