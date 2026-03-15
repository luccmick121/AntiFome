# Epic 2: Dashboard do Estado (Visão Macro)

| Campo | Valor |
|-------|-------|
| **ID** | EPIC-02 |
| **Prioridade** | High |
| **Status** | Ready |
| **Depende de** | EPIC-01 |
| **Stories** | 2.1, 2.2, 2.3, 2.4, 2.5 |
| **PRD Ref** | [Seção 6.2](../../prd/prd-antifome.md#epic-2-dashboard-do-estado-visão-macro) |

---

## Objetivo

Construir a visão executiva do gestor estadual — mapa choropleth real do RS com 497 municípios, ranking por Índice Antifome, indicadores (IAG, Cozinhas Solidárias, PPSAN, SISAN/COMSEA/CAISAN/Plano), e sistema de alertas de inatividade. O mapa é a peça central — cada município colorido por status, e o clique navega para o detalhe.

---

## Goals

- API REST para KPIs globais do dashboard (`GET /api/dashboard/stats`)
- API REST para GeoJSON dos 497 municípios com status e score (`GET /api/mapa/geojson`)
- Mapa interativo Leaflet com 4 camadas (base, IAG, Cozinhas, PPSAN)
- Ranking de municípios ordenável com busca e filtros
- Sistema de alertas de inatividade com botão "Quebrar Silêncio"

---

## Waves de Execução

### Wave 1: APIs Backend
Endpoints REST que o frontend irá consumir.

| Story | Título | Executor |
|-------|--------|----------|
| 2.1 | API REST — Dashboard Stats | @dev |
| 2.2 | API REST — Mapa GeoJSON | @dev |

### Wave 2: Frontend Dashboard (após Wave 1)
Consumem as APIs criadas na Wave 1.

| Story | Título | Executor |
|-------|--------|----------|
| 2.3 | Mapa Interativo do RS (Leaflet) com Camadas | @dev |
| 2.4 | Ranking de Municípios | @dev |
| 2.5 | Alertas de Inatividade | @dev |

---

## Critérios de Conclusão do Épico

- [ ] Endpoint `GET /api/dashboard/stats` retorna KPIs em < 200ms
- [ ] Endpoint `GET /api/mapa/geojson` retorna FeatureCollection com 497 features
- [ ] Mapa Leaflet renderiza polígonos coloridos por status em < 3s
- [ ] Camadas IAG, Cozinhas, PPSAN toggles funcionais
- [ ] Ranking com ordenação, busca, filtro por status/região
- [ ] Alertas com contador, lista inativos/atrasados, botão "Quebrar Silêncio"

---

## Arquivos Envolvedos

```
backend/src/dashboard/                 # ← Story 2.1
backend/src/mapa/                      # ← Story 2.2
backend/public/data/rs-municipios-geojson.json
frontend/src/app/(dashboard)/mapa/page.tsx      # ← Story 2.3
frontend/src/components/map/                    # ← Story 2.3
frontend/src/app/(dashboard)/ranking/page.tsx   # ← Story 2.4
frontend/src/components/dashboard/ranking-table.tsx
frontend/src/app/(dashboard)/alertas/page.tsx   # ← Story 2.5
backend/src/alertas/                            # ← Story 2.5
```

---

## Dependências do Mapa

| Camada | Fonte de Dados | Tipo |
|--------|---------------|------|
| Base (polígonos) | GeoJSON estático do IBGE + status do banco | Choropleth |
| IAG (heatmap) | `relatorios_fome.nivelGravidade` | Heatmap semi-transparente |
| Cozinhas Solidárias | Dados simulados / API mapacozinhas-rs.org.br | Marcadores/Pins |
| PPSAN | Dados simulados | Marcadores/Pins |

---

## Fórmulas Importantes

**Índice Antifome:**
```
Índice = ((Reuniões / 12) × 0.4 + (Relatórios / 5) × 0.6) × 10
```
- 12 = máximo de reuniões trimestrais (1 por mês × 3)
- 5 = máximo de relatórios mensais
- Score final: 0-10

---

## Referências

| Documento | Path |
|-----------|------|
| API Spec | `docs/architecture/api-spec.md` |
| Data Model | `docs/architecture/data-model.md` |
| Frontend Arch | `docs/architecture/frontend-architecture.md` |

---

*Épico criado por Morgan (PM) — 14/03/2026*
