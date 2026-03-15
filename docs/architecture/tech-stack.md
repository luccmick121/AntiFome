# Plataforma Antifome RS — Pilha Tecnológica

**Version:** 1.0.0
**Last Updated:** 14/03/2026
**Status:** Active

---

## Resumo da Stack

| Camada | Tecnologia | Versão | Finalidade |
|--------|-----------|--------|------------|
| Frontend | Next.js | 14+ (App Router) | SPA/SSR com React Server Components |
| UI Components | shadcn/ui | latest | Componentes acessíveis Radix + Tailwind |
| Estilização | Tailwind CSS | 3.x | Utility-first CSS |
| Mapa | Leaflet + react-leaflet | 4.x | Mapas interativos open-source |
| Backend | NestJS | 10.x | Framework Node.js modular |
| ORM | Prisma | 5.x | Type-safe database access |
| Banco | PostgreSQL | 15+ | Banco relacional |
| Autenticação | JWT + bcrypt | - | Tokens seguros |
| Documentação | Swagger | - | API docs automática |

---

## Frontend — Next.js 14

### Por que Next.js?

| Benefício | Descrição |
|-----------|-----------|
| **App Router** | Roteamento baseado em diretórios, layouts aninhados |
| **React Server Components** | Renderização server-side, menos JavaScript no client |
| **SSR/SSG** | Performance inicial, SEO para conteúdo público |
| **Tailwind Integration** | Suporte nativo para Tailwind CSS |
| **TypeScript** | Type safety em toda a aplicação |

### Estrutura App Router

```
src/app/
├── layout.tsx              # Layout root (sidebar + header)
├── page.tsx                # Dashboard principal (/)
├── loading.tsx             # Loading state global
├── error.tsx               # Error boundary global
│
├── (auth)/
│   └── login/
│       └── page.tsx        # Tela de login (/login)
│
├── (dashboard)/
│   ├── layout.tsx          # Layout com sidebar autenticada
│   ├── page.tsx            # Dashboard (/)
│   ├── mapa/
│   │   └── page.tsx        # Mapa interativo (/mapa)
│   ├── ranking/
│   │   └── page.tsx        # Ranking (/ranking)
│   ├── alertas/
│   │   └── page.tsx        # Alertas (/alertas)
│   ├── municipios/
│   │   └── [id]/
│   │       └── page.tsx    # Detalhe município (/municipios/:id)
│   ├── gestao/
│   │   └── page.tsx        # Gestão CONSEA (/gestao)
│   └── documentos/
│       └── page.tsx        # Repositório docs (/documentos)
│
├── (conselho)/
│   ├── layout.tsx          # Layout portal conselheiro
│   ├── page.tsx            # Portal (/conselho)
│   ├── membros/
│   │   └── page.tsx        # Gestão membros (/conselho/membros)
│   └── reunioes/
│       └── page.tsx        # Registro reuniões (/conselho/reunioes)
│
└── api/                    # Route Handlers (se necessário)
    └── ...
```

---

## UI Components — shadcn/ui

### Componentes Utilizados

| Componente | Uso |
|------------|-----|
| **Card** | KPI cards, informação em painéis |
| **Table** | Ranking de municípios, listas |
| **Dialog** | Modais de confirmação |
| **Form** | Cadastro membros, reuniões |
| **Badge** | Status de conselhos (cor por estado) |
| **Tabs** | Abas no portal do conselho |
| **Select** | Filtros de região, status |
| **Input** | Busca, formulários |
| **Button** | Ações principais, "Quebrar Silêncio" |
| **Tooltip** | Informações no hover do mapa |

### Instalação

```bash
cd frontend
npx shadcn-ui@latest init
npx shadcn-ui@latest add card table dialog form badge tabs select input button
```

---

## Estilização — Tailwind CSS

### Tema Customizado

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Antifome RS
        'petroleo': {
          DEFAULT: '#1A2F23',
          50: '#E8EBE9',
          100: '#C5CCCA',
          200: '#9EAD9F',
          300: '#778E75',
          400: '#5A765A',
          500: '#3D5E3D',
          600: '#324D32',
          700: '#283D28',
          800: '#1D2D1D',
          900: '#1A2F23',
        },
        'urgencia': {
          DEFAULT: '#B71C1C',
          50: '#FFEBEE',
          100: '#FFCDD2',
          200: '#EF9A9A',
          300: '#E57373',
          400: '#EF5350',
          500: '#F44336',
          600: '#E53935',
          700: '#D32F2F',
          800: '#C62828',
          900: '#B71C1C',
        },
        'sucesso': {
          DEFAULT: '#2E7D32',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
        },
        'aviso': {
          DEFAULT: '#FF8F00',
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
      },
      fontFamily: {
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

### Cores Principais

| Nome | Código | Uso |
|------|--------|-----|
| `petroleo` | #1A2F23 | Primária, sidebar, header |
| `urgencia` | #B71C1C | Botões ação, crítico, inativo |
| `sucesso` | #2E7D32 | Ativo, sucesso, positivo |
| `aviso` | #FF8F00 | Atrasado, aviso, amarelo |
| `bg` | #F5F5F5 | Fundo geral |
| `text` | #212121 | Texto corpo |

---

## Mapa — Leaflet

### Configuração

```typescript
// components/map/rs-map.tsx
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

// Configuração do mapa do RS
const RS_CENTER: [number, number] = [-30.0346, -51.2177] // Porto Alegre
const RS_ZOOM = 7

export function RSMap() {
  return (
    <MapContainer
      center={RS_CENTER}
      zoom={RS_ZOOM}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MunicipalitiesLayer />
      <MapLegend />
    </MapContainer>
  )
}
```

### Camadas do Mapa

| Camada | Tipo | Visível | Descrição |
|--------|------|---------|-----------|
| Base | Choropleth | Sempre | Polígonos coloridos por status |
| IAG | Heatmap | Toggle | Insegurança alimentar grave |
| Cozinhas | Markers | Toggle | Cozinhas solidárias |
| PPSAN | Markers | Toggle | Pontos Populares SAN |

### Cores por Status

```typescript
const STATUS_COLORS = {
  ATIVO: '#2E7D32',    // Verde
  ATRASADO: '#FF8F00', // Amarelo
  INATIVO: '#B71C1C',  // Vermelho
}
```

---

## Backend — NestJS

### Módulos Principais

```
src/
├── main.ts                    # Bootstrap, CORS, ValidationPipe
├── app.module.ts              # Root module
│
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts     # POST /auth/login, /auth/logout
│   ├── auth.service.ts        # Validação credentials, JWT
│   ├── dto/
│   │   └── login.dto.ts       # LoginRequest schema
│   └── guards/
│       ├── jwt.guard.ts       # Validade JWT token
│       └── roles.guard.ts     # Valida perfil RBAC
│
├── municipios/
│   ├── municipios.module.ts
│   ├── municipios.controller.ts  # CRUD municípios
│   └── municipios.service.ts     # Business logic
│
├── conselhos/
│   ├── conselhos.module.ts
│   ├── conselhos.controller.ts   # CRUD conselhos
│   └── conselhos.service.ts      # Status, índices
│
├── reunioes/
│   ├── reunioes.module.ts
│   ├── reunioes.controller.ts    # CRUD reuniões + atas
│   └── reunioes.service.ts       # Registro, validação
│
├── membros/
│   ├── membros.module.ts
│   ├── membros.controller.ts     # CRUD membros
│   └── membros.service.ts        # Gestão conselheiros
│
├── dashboard/
│   ├── dashboard.module.ts
│   ├── dashboard.controller.ts   # GET /dashboard/stats
│   └── dashboard.service.ts      # Agregação de KPIs
│
├── mapa/
│   ├── mapa.module.ts
│   ├── mapa.controller.ts        # GET /mapa/geojson
│   └── mapa.service.ts           # Cache, GeoJSON
│
├── documentos/
│   ├── documentos.module.ts
│   ├── documentos.controller.ts  # CRUD documentos
│   └── documentos.service.ts     # Upload, categorização
│
└── prisma/
    ├── prisma.module.ts          # Global module
    └── prisma.service.ts         # Prisma client wrapper
```

### Configuração main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // Validation
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Antifome API')
    .setDescription('API da Plataforma Antifome RS')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}
bootstrap();
```

---

## Database — PostgreSQL + Prisma

### Comandos Prisma

```bash
# Gerar cliente
npx prisma generate

# Criar migration
npx prisma migrate dev --name init

# Aplicar migration
npx prisma migrate deploy

# Seed
npx prisma db seed

# Reset
npx prisma migrate reset

# Studio (GUI)
npx prisma studio
```

### Configuração .env

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/antifome"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="24h"

# App
NEXT_PUBLIC_API_URL="http://localhost:3001/api"
```

### Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Criar estado RS
  const rs = await prisma.estado.create({
    data: {
      sigla: 'RS',
      nome: 'Rio Grande do Sul',
      codigoIbge: '43',
    },
  })

  // 2. Buscar municípios da API do IBGE
  const response = await fetch(
    'https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios'
  )
  const municipios = await response.json()

  // 3. Inserir cada município com status simulado
  for (const mun of municipios) {
    const status = randomStatus() // 71% ativo, 17% atrasado, 12% inativo

    await prisma.municipio.create({
      data: {
        ibgeCode: mun.id.toString(),
        nome: mun.nome,
        regiao: getRegiao(mun.microrregiao.nome),
        estadoId: rs.id,
        conselho: {
          create: {
            status,
            dataCriacao: status !== 'INATIVO' ? randomPastDate() : null,
            totalReunioes: status === 'ATIVO' ? randomInt(8, 15) : randomInt(0, 5),
            totalRelatorios: status === 'ATIVO' ? randomInt(3, 6) : randomInt(0, 2),
          },
        },
        relatorios: {
          create: {
            qtdFamiliasRisco: randomInt(100, 5000),
            nivelGravidade: randomGravidade(),
            periodo: '2026-Q1',
          },
        },
        recursos: {
          create: {
            orcamentoTotal: randomDecimal(100000, 1000000),
            orcamentoExecutado: randomDecimal(50000, 600000),
            ano: 2026,
          },
        },
      },
    })
  }

  console.log(`✅ ${municipios.length} municípios inseridos`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

---

## Autenticação — JWT + RBAC

### Fluxo de Login

```
1. Usuário envia email + senha → POST /api/auth/login
2. Backend valida credenciais no banco
3. Se válido, gera JWT token com payload:
   {
     "sub": "user-id",
     "email": "user@email.com",
     "perfil": "GESTOR_ESTADUAL",
     "municipioId": null
   }
4. Retorna token + dados do usuário
5. Frontend armazena token (httpOnly cookie ou localStorage)
6. Em cada request, frontend envia Authorization: Bearer <token>
7. Backend valida token no JWT Guard
8. Roles Guard verifica se perfil tem permissão para a rota
```

### Perfis e Permissões

| Perfil | Descricao | Rotas |
|--------|-----------|-------|
| `GESTOR_ESTADUAL` | CONSEA-RS | Todas as rotas |
| `GESTOR_MUNICIPAL` | Prefeitura | `/municipios/:id`, `/dashboard` (limitado) |
| `CONSELHEIRO` | Membro conselho | `/conselho/*` |
| `SOCIEDADE_CIVIL` | Entidade | `/mapa`, `/ranking`, `/documentos` (leitura) |

---

## Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: antifome-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: antifome
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

---

## Scripts NPM

### Frontend (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### Backend (package.json)

```json
{
  "scripts": {
    "build": "nest build",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:seed": "prisma db seed",
    "prisma:studio": "prisma studio"
  }
}
```

---

## Setup Rápido

### Pré-requisitos

- Node.js 18+
- Docker Desktop
- npm ou yarn

### Passos

```bash
# 1. Iniciar banco
docker-compose up -d

# 2. Backend
cd backend
npm install
npx prisma migrate dev
npx prisma db seed
npm run start:dev  # Porta 3001

# 3. Frontend
cd frontend
npm install
npm run dev  # Porta 3000

# 4. Acessar
# Frontend: http://localhost:3000
# API Docs: http://localhost:3001/api/docs
```

---

_Pilha tecnológica definida por Aria (Architect) — 14/03/2026_
