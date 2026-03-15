# Epic 4: Gestão CONSEA e Extras

| Campo | Valor |
|-------|-------|
| **ID** | EPIC-04 |
| **Prioridade** | Medium |
| **Status** | Ready |
| **Depende de** | EPIC-01, EPIC-02, EPIC-03 |
| **Stories** | 4.1, 4.2, 4.3, 4.4 |
| **PRD Ref** | [Seção 6.4](../../prd/prd-antifome.md#epic-4-gestão-consea-e-extras) |

---

## Objetivo

Implementar a aba informativa do CONSEA-RS, a página de detalhe do município com todas as informações consolidadas, o simulador de impacto para o pitch do hackathon, e finalizar o polish visual para apresentação profissional.

---

## Goals

- Página de detalhe do município com conselho, membros, recursos, histórico e selos
- Aba Gestão CONSEA com missão, contato, guia de criação de conselhos
- Simulador de impacto com slider de eficiência ("X% eficiência = Y famílias")
- Polish visual final: design system consistente, loading states, favicon, transições

---

## Waves de Execução

### Wave 1: Páginas e Funcionalidades
Três páginas/funcionalidades em paralelo (independentes entre si).

| Story | Título | Executor |
|-------|--------|----------|
| 4.1 | Página de Detalhe do Município | @dev |
| 4.2 | Gestão CONSEA (Aba Informativa) | @dev |
| 4.3 | Simulador de Impacto | @dev |

### Wave 2: Polish Final (após Wave 1)
Finalização visual — requer todas as páginas existentes.

| Story | Título | Executor |
|-------|--------|----------|
| 4.4 | Polish Visual e Data do Mapa | @dev |

---

## Critérios de Conclusão do Épico

- [ ] Página `/municipios/[id]` mostra: header, conselho, membros, recursos SAN, histórico, selos
- [ ] Página `/gestao` mostra: info CONSEA-RS, contato, guia de criação, links úteis
- [ ] Simulador calcula impacto: "Se a eficiência aumentar X%, são Y mil famílias a mais atendidas sem gastar um real extra"
- [ ] Todas as páginas seguem design system (paleta #1A2F23/#B71C1C, tipografia Roboto)
- [ ] Mapa com geometria real dos 497 polígonos do IBGE
- [ ] Loading states (skeleton) e transições suaves entre telas
- [ ] Favicon + título "Antifome RS" em todas as páginas
- [ ] Banner de alerta funcional e visível

---

## Arquivos Envolvedos

```
frontend/src/app/(dashboard)/municipios/[id]/page.tsx   # ← Story 4.1
frontend/src/components/dashboard/                       # ← Story 4.1
  conselho-card.tsx
  recursos-card.tsx
  indicadores-card.tsx
  historico-reunioes.tsx
  selos-grid.tsx
frontend/src/app/(dashboard)/gestao/page.tsx             # ← Story 4.2
frontend/src/app/(dashboard)/simulador/page.tsx          # ← Story 4.3
frontend/src/components/dashboard/impact-simulator.tsx   # ← Story 4.3
frontend/src/app/layout.tsx                              # ← Story 4.4 (favicon)
frontend/src/app/globals.css                             # ← Story 4.4 (design system)
backend/src/gestao/                                      # ← API CONSEA info
backend/src/simulador/                                   # ← API simulador
```

---

## Simulador de Impacto — Fórmula

```
Famílias Totais = 1.294.950
Eficiência Nova = Slider (50% a 100%)

Famílias Atendidas = Famílias Totais × Eficiência Nova
Famílias Adicionais = Famílias Atendidas − (Famílias Totais × Eficiência Atual)
```

**Exemplo no pitch:**
> "Se a eficiência de alocação aumentar de 70% para 85%, são **194.243 famílias a mais** atendidas sem gastar um real extra."

---

## Design System Final

| Elemento | Valor |
|----------|-------|
| Primária | `#1A2F23` (Verde Petróleo) |
| Urgência | `#B71C1C` (Vermelho Sangue) |
| Sucesso | `#2E7D32` (Verde Folha) |
| Aviso | `#FF8F00` (Âmbar) |
| Erro | `#D32F2F` (Vermelho Vivo) |
| Fundo | `#F5F5F5` (Cinza Gelo) |
| Texto | `#212121` (Grafite) |
| Tipografia | Roboto / Public Sans |
| Botões | Cantos vivos (máx 2px raio) |

---

## Referências

| Documento | Path |
|-----------|------|
| PRD (Branding) | `docs/prd/prd-antifome.md` Seção 3 |
| Frontend Arch | `docs/architecture/frontend-architecture.md` |
| API Spec | `docs/architecture/api-spec.md` |

---

*Épico criado por Morgan (PM) — 14/03/2026*
