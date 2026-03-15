# Epic 3: Portal do Conselho Municipal

| Campo | Valor |
|-------|-------|
| **ID** | EPIC-03 |
| **Prioridade** | High |
| **Status** | Ready |
| **Depende de** | EPIC-01 |
| **Stories** | 3.1, 3.2, 3.3, 3.4, 3.5 |
| **PRD Ref** | [Seção 6.3](../../prd/prd-antifome.md#epic-3-portal-do-conselho-municipal) |

---

## Objetivo

Construir a interface para o conselheiro municipal gerenciar seu conselho — cadastro de membros, registro de reuniões, envio de atas, visualização de status/progresso para alcançar selos SAN, e repositório de documentos. A experiência deve ser simples e operacional, como um formulário de gestão.

---

## Goals

- Portal do conselho com header do município + barra de progresso para selos
- CRUD de membros do conselho (nome, cargo, contato)
- Registro de reuniões com upload de atas
- Dashboard de status: SISAN, CAISAN, Plano Municipal SAN
- Repositório de documentos categorizados com download

---

## Waves de Execução

### Wave 1: Auth do Portal e Membros
Acesso autentificado e cadastro de membros.

| Story | Título | Executor |
|-------|--------|----------|
| 3.1 | Login e Acesso ao Portal do Conselho | @dev |
| 3.2 | Cadastro de Membros do Conselho | @dev |

### Wave 2: Reuniões, Status e Documentos
Funcionalidades operacionais do portal.

| Story | Título | Executor |
|-------|--------|----------|
| 3.3 | Registro de Reuniões e Envio de Atas | @dev |
| 3.4 | Visualização de Status e Progresso do Município | @dev |
| 3.5 | Repositório de Documentos | @dev |

---

## Critérios de Conclusão do Épico

- [ ] Portal `/conselho` acessível apenas por conselheiro autenticado
- [ ] Header mostra: nome do município, status atual, Índice Antifome
- [ ] Barra de progresso para o próximo selo (ex: "Faltam 2 reuniões para o selo Bronze")
- [ ] CRUD membros com validação (mínimo 1 presidente)
- [ ] Reuniões registradas atualizam status do conselho automaticamente
- [ ] Dashboard município mostra SISAN/CAISAN/Plano + barra progresso selos
- [ ] Repositório com categorias: Leis, Decretos, Termos de Compromisso, Modelos

---

## Arquivos Envolvedos

```
frontend/src/app/(conselho)/                      # ← Group: Portal do conselheiro
frontend/src/app/(conselho)/layout.tsx            # ← Layout portal conselho
frontend/src/app/(conselho)/page.tsx              # ← Home portal
frontend/src/app/(conselho)/membros/page.tsx      # ← Story 3.2
frontend/src/app/(conselho)/reunioes/page.tsx     # ← Story 3.3
frontend/src/components/conselho/                 # ← Componentes do portal
  member-form.tsx                                 # ← Story 3.2
  member-list.tsx
  meeting-form.tsx                                # ← Story 3.3
  meeting-list.tsx
  seal-progress.tsx                               # ← Story 3.4
frontend/src/app/(dashboard)/documentos/page.tsx  # ← Story 3.5
backend/src/conselhos/                            # ← API conselhos
backend/src/reunioes/                             # ← API reuniões
backend/src/membros/                              # ← API membros
backend/src/documentos/                           # ← API documentos
```

---

## Personas Atendidas

| Persona | O que faz no portal |
|---------|-------------------|
| **Conselheiro Municipal** | Cadastra membros, registra reuniões, envia atas, vê progresso |
| **Gestor Municipal** | Acompanha adesão SISAN/CAISAN, acessa documentos |

---

## Endpoints do Portal

| Método | Endpoint | Função |
|--------|----------|--------|
| GET | `/api/conselhos/:id` | Detalhes do conselho |
| POST | `/api/conselhos/:id/membro` | Cadastrar membro |
| PUT | `/api/conselhos/:id/membro/:membroId` | Atualizar membro |
| DELETE | `/api/conselhos/:id/membro/:membroId` | Remover membro |
| POST | `/api/conselhos/:id/reuniao` | Registrar reunião |
| GET | `/api/conselhos/:id/reunioes` | Listar reuniões |
| GET | `/api/documentos` | Listar documentos |
| POST | `/api/documentos` | Upload documento |

---

## Referências

| Documento | Path |
|-----------|------|
| API Spec | `docs/architecture/api-spec.md` |
| Data Model | `docs/architecture/data-model.md` |
| Frontend Arch | `docs/architecture/frontend-architecture.md` |

---

*Épico criado por Morgan (PM) — 14/03/2026*
