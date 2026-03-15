# Plataforma Antifome RS — Arquitetura do Frontend

**Version:** 1.0.0
**Last Updated:** 14/03/2026
**Status:** Active
**Framework:** Next.js 14 (App Router)

---

## Visão Geral

O frontend é construído com **Next.js 14** usando App Router, **Tailwind CSS** para estilização, **shadcn/ui** para componentes e **Leaflet** para o mapa interativo.

---

## Estrutura de Pastas

```
frontend/
├── public/
│   ├── favicon.ico
│   └── geojson/
│       └── rs-municipios.json     # GeoJSON estático (fallback)
│
├── src/
│   ├── app/                       # App Router pages
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home (redirect)
│   │   ├── globals.css            # Global styles + Tailwind
│   │   ├── loading.tsx            # Loading global
│   │   ├── error.tsx              # Error boundary
│   │   │
│   │   ├── (auth)/                # Group: Rotas públicas (sem sidebar)
│   │   │   └── login/
│   │   │       └── page.tsx       # /login
│   │   │
│   │   ├── (dashboard)/           # Group: Dashboard (com sidebar)
│   │   │   ├── layout.tsx         # Layout com sidebar
│   │   │   ├── page.tsx           # / → Dashboard principal
│   │   │   ├── mapa/
│   │   │   │   └── page.tsx       # /mapa → Mapa interativo
│   │   │   ├── ranking/
│   │   │   │   └── page.tsx       # /ranking → Ranking municípios
│   │   │   ├── alertas/
│   │   │   │   └── page.tsx       # /alertas → Alertas inatividade
│   │   │   ├── municipios/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx   # /municipios/:id → Detalhe
│   │   │   ├── gestao/
│   │   │   │   └── page.tsx       # /gestao → Gestão CONSEA
│   │   │   ├── documentos/
│   │   │   │   └── page.tsx       # /documentos → Repositório
│   │   │   └── simulador/
│   │   │       └── page.tsx       # /simulador → Simulador impacto
│   │   │
│   │   └── (conselho)/            # Group: Portal do conselheiro
│   │       ├── layout.tsx         # Layout portal conselho
│   │       ├── page.tsx           # /conselho → Home portal
│   │       ├── membros/
│   │       │   └── page.tsx       # /conselho/membros
│   │       └── reunioes/
│   │           └── page.tsx       # /conselho/reunioes
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui (auto-gerado)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── select.tsx
│   │   │   ├── input.tsx
│   │   │   ├── form.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── sidebar.tsx        # Sidebar de navegação
│   │   │   ├── header.tsx         # Header com KPIs
│   │   │   ├── kpi-card.tsx       # Card de KPI individual
│   │   │   └── mobile-nav.tsx     # Navegação mobile
│   │   │
│   │   ├── map/
│   │   │   ├── rs-map.tsx         # Mapa principal
│   │   │   ├── municipalities-layer.tsx  # Polígonos
│   │   │   ├── iag-layer.tsx      # Camada IAG (heatmap)
│   │   │   ├── cozinhas-layer.tsx # Camada cozinhas
│   │   │   ├── ppsan-layer.tsx    # Camada PPSAN
│   │   │   ├── map-controls.tsx   # Zoom, filtros
│   │   │   ├── map-legend.tsx     # Legenda fixa
│   │   │   └── map-tooltip.tsx    # Tooltip ao hover
│   │   │
│   │   ├── dashboard/
│   │   │   ├── ranking-table.tsx  # Tabela ranking
│   │   │   ├── alert-list.tsx     # Lista alertas
│   │   │   ├── status-badge.tsx   # Badge de status
│   │   │   ├── impact-simulator.tsx # Simulador
│   │   │   └── progress-bar.tsx   # Barra de progresso
│   │   │
│   │   ├── conselho/
│   │   │   ├── member-form.tsx    # Form cadastro membro
│   │   │   ├── member-list.tsx    # Lista membros
│   │   │   ├── meeting-form.tsx   # Form registro reunião
│   │   │   ├── meeting-list.tsx   # Lista reuniões
│   │   │   └── seal-progress.tsx  # Progresso selos
│   │   │
│   │   └── common/
│   │       ├── data-table.tsx     # Table genérica
│   │       ├── search-input.tsx   # Input de busca
│   │       ├── filter-dropdown.tsx # Dropdown de filtro
│   │       └── loading-skeleton.tsx # Skeleton loading
│   │
│   ├── lib/
│   │   ├── api.ts                 # Cliente API (fetch wrapper)
│   │   ├── auth.ts                # Auth context + helpers
│   │   ├── utils.ts               # cn(), formatCurrency, etc.
│   │   └── constants.ts           # Cores, URLs, config
│   │
│   ├── hooks/
│   │   ├── use-auth.ts            # Hook de autenticação
│   │   ├── use-dashboard-stats.ts # Hook KPIs
│   │   ├── use-municipios.ts      # Hook municípios
│   │   └── use-map-data.ts        # Hook dados mapa
│   │
│   └── styles/
│       └── globals.css            # Variáveis CSS, Tailwind
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Layouts

### Root Layout (app/layout.tsx)

```tsx
// Layout raiz: Fontes, Providers globais
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-gray-50 text-gray-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
```

### Dashboard Layout (app/(dashboard)/layout.tsx)

```tsx
// Layout com sidebar + header KPIs
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Conselho Layout (app/(conselho)/layout.tsx)

```tsx
// Layout portal do conselheiro (diferente do dashboard)
export default function ConselhoLayout({ children }) {
  return (
    <div className="flex h-screen">
      <ConselhoSidebar />
      <div className="flex-1 flex flex-col">
        <ConselhoHeader />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

## Componentes Layout

### Sidebar

```tsx
// components/layout/sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Map, BarChart3, AlertTriangle, FileText,
  Settings, LogOut, ChevronLeft
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/mapa', label: 'Mapa RS', icon: Map },
  { href: '/ranking', label: 'Ranking', icon: BarChart3 },
  { href: '/alertas', label: 'Alertas', icon: AlertTriangle, badge: true },
  { href: '/documentos', label: 'Documentos', icon: FileText },
  { href: '/gestao', label: 'Gestão CONSEA', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`
      bg-petroleo text-white h-full flex flex-col
      transition-all duration-300
      ${collapsed ? 'w-16' : 'w-64'}
    `}>
      {/* Logo */}
      <div className="p-4 border-b border-petroleo-700">
        <h1 className="text-xl font-bold">
          Antifome <span className="text-sucesso">RS</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              flex items-center gap-3 px-3 py-2 rounded
              transition-colors
              ${pathname === item.href
                ? 'bg-petroleo-700 text-white'
                : 'text-petroleo-200 hover:bg-petroleo-800'
              }
            `}
          >
            <item.icon size={20} />
            {!collapsed && (
              <>
                <span>{item.label}</span>
                {item.badge && <AlertBadge />}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-petroleo-700">
        <button onClick={() => setCollapsed(!collapsed)}>
          <ChevronLeft className={collapsed ? 'rotate-180' : ''} />
        </button>
      </div>
    </aside>
  )
}
```

### Header com KPIs

```tsx
// components/layout/header.tsx
'use client'

import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { KPICard } from './kpi-card'

export function Header() {
  const { data, isLoading } = useDashboardStats()

  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex items-center gap-4">
        <KPICard
          label="Conselhos Ativos"
          value={`${data?.conselhosAtivos.porcentagem}%`}
          subvalue={`${data?.conselhosAtivos.total} conselhos`}
          color="success"
          loading={isLoading}
        />
        <KPICard
          label="Famílias em Risco"
          value={data?.familiasEmRisco.total.toLocaleString('pt-BR')}
          subvalue={`Grave: ${data?.familiasEmRisco.grauGrave.toLocaleString('pt-BR')}`}
          color="danger"
          loading={isLoading}
        />
        <KPICard
          label="Orçamento SAN"
          value={`${data?.orcamentoSAN.porcentagemExecucao}%`}
          subvalue={`R$ ${(data?.orcamentoSAN.executado / 1e6).toFixed(1)}M / R$ ${(data?.orcamentoSAN.total / 1e6).toFixed(0)}M`}
          color="warning"
          loading={isLoading}
        />
        <KPICard
          label="Alertas"
          value={data?.alertas.conselhosInativos + data?.alertas.conselhosAtrasados}
          subvalue={`${data?.alertas.conselhosInativos} inativos`}
          color="danger"
          loading={isLoading}
        />
      </div>
    </header>
  )
}
```

---

## Páginas Principais

### Dashboard (app/(dashboard)/page.tsx)

```tsx
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Mini mapa */}
      <section className="bg-white rounded-lg p-4 h-96">
        <h2 className="text-lg font-semibold mb-4">Mapa do RS</h2>
        <MiniMap />
      </section>

      <div className="grid grid-cols-2 gap-6">
        {/* Top 10 Ranking */}
        <section className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Top 10 Municípios</h2>
          <TopRanking limit={10} />
        </section>

        {/* Alertas recentes */}
        <section className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Alertas Recentes</h2>
          <RecentAlerts limit={5} />
        </section>
      </div>

      {/* Simulador de Impacto */}
      <section className="bg-white rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Simulador de Impacto</h2>
        <ImpactSimulator />
      </section>
    </div>
  )
}
```

### Mapa Interativo (app/(dashboard)/mapa/page.tsx)

```tsx
export default function MapaPage() {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <RSMap />
    </div>
  )
}
```

### Ranking (app/(dashboard)/ranking/page.tsx)

```tsx
export default function RankingPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Ranking de Municípios</h1>
        <div className="flex gap-2">
          <FilterDropdown field="regiao" />
          <FilterDropdown field="status" />
          <SearchInput placeholder="Buscar município..." />
        </div>
      </div>

      <RankingTable />
    </div>
  )
}
```

### Detalhe do Município (app/(dashboard)/municipios/[id]/page.tsx)

```tsx
export default async function MunicipioDetailPage({ params }) {
  const municipio = await getMunicipio(params.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold">{municipio.nome}</h1>
        <p className="text-gray-600">
          IBGE: {municipio.ibgeCode} | Região: {municipio.regiao}
        </p>
        <StatusBadge status={municipio.statusConselho} />
      </header>

      {/* Grid de informações */}
      <div className="grid grid-cols-3 gap-4">
        <ConselhoCard conselho={municipio.conselho} />
        <RecursosCard recursos={municipio.recursos} />
        <IndicadoresCard indicadores={municipio.indicadores} />
      </div>

      {/* Status governança */}
      <GovernancaTabs
        sisan={municipio.statusSisan}
        caisan={municipio.statusCaisan}
        plano={municipio.planoMunicipal}
      />

      {/* Histórico */}
      <HistoricoReunioes reunioes={municipio.conselho.reunioes} />

      {/* Selos */}
      <SelosGrid selos={municipio.selos} />
    </div>
  )
}
```

### Portal do Conselho (app/(conselho)/page.tsx)

```tsx
export default function ConselhoPage() {
  const { conselho } = useConselho()

  return (
    <div className="space-y-6">
      {/* Header do município */}
      <header className="bg-white rounded-lg p-4">
        <h1 className="text-2xl font-bold">{conselho.municipio.nome}</h1>
        <StatusBadge status={conselho.status} />
        <p>Índice Antifome: {conselho.indiceAntifome}/10</p>
        <SealProgress atual={conselho.selos.atual} proximo={conselho.selos.proximo} />
      </header>

      {/* Ações rápidas */}
      <div className="grid grid-cols-3 gap-4">
        <Link href="/conselho/membros" className="card">
          <Users size={24} />
          <span>{conselho.totalMembros} Membros</span>
        </Link>
        <Link href="/conselho/reunioes" className="card">
          <Calendar size={24} />
          <span>{conselho.totalReunioes} Reuniões</span>
        </Link>
        <Link href="/conselho/atas" className="card">
          <FileText size={24} />
          <span>{conselho.totalAtas} Atas</span>
        </Link>
      </div>

      {/* Próxima reunião */}
      {conselho.proximaReuniao && (
        <ProximaReuniao data={conselho.proximaReuniao} />
      )}
    </div>
  )
}
```

---

## Hooks

### use-auth.ts

```tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  email: string
  perfil: 'GESTOR_ESTADUAL' | 'GESTOR_MUNICIPAL' | 'CONSELHEIRO' | 'SOCIEDADE_CIVIL'
  municipioId?: string
}

interface AuthContext {
  user: User | null
  isLoading: boolean
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

export function useAuth(): AuthContext {
  // Implementation
}
```

### use-dashboard-stats.ts

```tsx
'use client'

import useSWR from 'swr'
import { api } from '@/lib/api'

interface DashboardStats {
  conselhosAtivos: { total: number; porcentagem: number }
  familiasEmRisco: { total: number; grauGrave: number }
  orcamentoSAN: { total: number; executado: number; porcentagemExecucao: number }
  alertas: { conselhosInativos: number; conselhosAtrasados: number }
}

export function useDashboardStats() {
  const { data, error, isLoading } = useSWR<DashboardStats>(
    '/api/dashboard/stats',
    api.fetcher
  )

  return { data, error, isLoading }
}
```

---

## Cliente API

```tsx
// lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem('token')
  }

  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = this.getToken()

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, await response.json())
    }

    return response.json()
  }

  get<T>(endpoint: string) {
    return this.fetch<T>(endpoint)
  }

  post<T>(endpoint: string, data: unknown) {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  put<T>(endpoint: string, data: unknown) {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: string) {
    return this.fetch<T>(endpoint, { method: 'DELETE' })
  }
}

export const api = new ApiClient()
```

---

## Design System

### Cores Tailwind Customizadas

| Classe | Cor | Uso |
|--------|-----|-----|
| `bg-petroleo` | #1A2F23 | Sidebar, header escuro |
| `bg-urgencia` | #B71C1C | Botões ação, badges críticos |
| `bg-sucesso` | #2E7D32 | Status ativo, sucesso |
| `bg-aviso` | #FF8F00 | Status atrasado, avisos |

### Status Badges

| Status | Cor | Classe |
|--------|-----|--------|
| ATIVO | Verde | `bg-sucesso text-white` |
| ATRASADO | Amarelo | `bg-aviso text-black` |
| INATIVO | Vermelho | `bg-urgencia text-white` |

### Tipografia

```css
/* headings */
h1: text-3xl font-bold text-gray-900
h2: text-2xl font-semibold text-gray-800
h3: text-xl font-semibold text-gray-800

/* body */
p: text-base text-gray-700 leading-relaxed

/* labels */
label: text-sm font-medium text-gray-600 uppercase
```

---

## Roteamento

| Rota | Página | Acesso |
|------|--------|--------|
| `/` | Dashboard principal | Autenticado (todos) |
| `/login` | Tela login | Público |
| `/mapa` | Mapa interativo | Autenticado |
| `/ranking` | Ranking municípios | Autenticado |
| `/alertas` | Alertas inatividade | Gestor estadual |
| `/municipios/[id]` | Detalhe município | Autenticado |
| `/gestao` | Gestão CONSEA | Autenticado |
| `/documentos` | Repositório docs | Autenticado |
| `/conselho` | Portal conselho | Conselheiro |
| `/conselho/membros` | Gestão membros | Conselheiro |
| `/conselho/reunioes` | Registro reuniões | Conselheiro |
| `/simulador` | Simulador impacto | Gestor estadual |

---

_Arquitetura do frontend criada por Aria (Architect) — 14/03/2026_
