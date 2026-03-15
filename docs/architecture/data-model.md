# Plataforma Antifome RS — Modelo de Dados

**Version:** 1.0.0
**Last Updated:** 14/03/2026
**Status:** Active
**ORM:** Prisma 5.x

---

## Visão Geral do Schema

O modelo de dados suporta:
- **Multi-estado:** Tabela `estados` como raiz para expansão nacional
- **497 municípios:** Com código IBGE, região e geometria GeoJSON
- **Conselhos:** Com status (ATIVO/ATRASADO/INATIVO) e histórico
- **LGPD:** Dados sensíveis anonimizados, sem CPFs
- **Índice Antifome:** Calculado dinamicamente

---

## Diagrama ER (Simplificado)

```
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│   Estados    │       │ Municipios   │       │ Conselhos    │
│──────────────│       │──────────────│       │──────────────│
│ id (PK)      │◄──────│ estadoId(FK) │       │ id (PK)      │
│ sigla        │       │ id (PK)      │◄──────│ municipioId  │
│ nome         │       │ ibgeCode     │       │ status       │
└──────────────┘       │ nome         │       │ dataCriacao  │
                       │ regiao       │       │ ultimoRelatorio│
                       │ geojson      │       └───────┬───────┘
                       └──────┬───────┘               │
                              │                       │
          ┌───────────────────┼───────────────────────┤
          │                   │                       │
          ▼                   ▼                       ▼
┌──────────────┐    ┌──────────────┐         ┌──────────────┐
│ Relatorios   │    │ RecursosSAN  │         │   Membros    │
│ Fome         │    │──────────────│         │──────────────│
│──────────────│    │ id (PK)      │         │ id (PK)      │
│ id (PK)      │    │ municipioId  │         │ conselhoId   │
│ municipioId  │    │ orcamentoTotal│        │ nome         │
│ qtdFamilias  │    │ orcExecutado │         │ cargo        │
│ nivelGravidade│   │ ano          │         │ contato      │
│ periodo      │    └──────────────┘         └───────┬───────┘
└──────────────┘                                     │
                                                     ▼
                                             ┌──────────────┐
                                             │  Reunioes    │
                                             │──────────────│
                                             │ id (PK)      │
                                             │ conselhoId   │
                                             │ data         │
                                             │ pauta        │
                                             └───────┬───────┘
                                                     │
                                                     ▼
                                             ┌──────────────┐
                                             │    Atas      │
                                             │──────────────│
                                             │ id (PK)      │
                                             │ reuniaoId    │
                                             │ descricao    │
                                             │ arquivoUrl   │
                                             └──────────────┘

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Usuarios   │    │   Selos      │    │ Documentos   │
│──────────────│    │──────────────│    │──────────────│
│ id (PK)      │    │ id (PK)      │    │ id (PK)      │
│ email        │    │ municipioId  │    │ titulo       │
│ senha        │    │ tipo         │    │ categoria    │
│ perfil       │    │ conquistadoEm│    │ arquivoUrl   │
│ municipioId  │    └──────────────┘    └──────────────┘
└──────────────┘
```

---

## Schema Prisma Completo

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// MODELOS PRINCIPAIS
// ============================================

model Estado {
  id          String      @id @default(cuid())
  sigla       String      @unique // "RS"
  nome        String      // "Rio Grande do Sul"
  codigoIbge  String?     @unique // "43" (código do estado no IBGE)

  municipios  Municipio[]

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@map("estados")
}

model Municipio {
  id          String      @id @default(cuid())
  ibgeCode    String      @unique // Código IBGE do município
  nome        String
  regiao      String      // "Metropolitana", "Norte", "Sul", etc.
  estadoId    String
  geojson     Json?       // Geometria simplificada (GeoJSON Polygon)

  // Relacionamentos
  estado      Estado      @relation(fields: [estadoId], references: [id])
  conselho    Conselho?
  relatorios  RelatorioFome[]
  recursos    RecursoSAN?
  selos       Selo[]
  usuario     Usuario[]

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([estadoId])
  @@index([regiao])
  @@map("municipios")
}

model Conselho {
  id                String      @id @default(cuid())
  municipioId       String      @unique
  status            StatusConselho @default(INATIVO)
  dataCriacao       DateTime?
  ultimoRelatorioAt DateTime?
  totalReunioes     Int         @default(0)
  totalRelatorios   Int         @default(0)

  // Relacionamentos
  municipio         Municipio  @relation(fields: [municipioId], references: [id])
  membros           Membro[]
  reunioes          Reuniao[]

  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  @@index([status])
  @@map("conselhos")
}

model Membro {
  id          String      @id @default(cuid())
  conselhoId  String
  nome        String
  cargo       CargoConselho @default(MEMBRO)
  contato     String?     // Telefone ou email (sem CPF)
  ativo       Boolean     @default(true)

  // Relacionamentos
  conselho    Conselho    @relation(fields: [conselhoId], references: [id])

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([conselhoId])
  @@map("membros")
}

model Reuniao {
  id          String      @id @default(cuid())
  conselhoId  String
  data        DateTime
  pauta       String
  temAta      Boolean     @default(false)

  // Relacionamentos
  conselho    Conselho    @relation(fields: [conselhoId], references: [id])
  ata         Ata?
  presentes   Membro[]    @relation("ReuniaoPresentes")

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([conselhoId])
  @@index([data])
  @@map("reunioes")
}

model Ata {
  id          String      @id @default(cuid())
  reuniaoId   String      @unique
  descricao   String
  arquivoUrl  String?     // URL do arquivo anexado (ou null para MVP)

  // Relacionamentos
  reuniao     Reuniao     @relation(fields: [reuniaoId], references: [id])

  createdAt   DateTime    @default(now())

  @@map("atas")
}

model RelatorioFome {
  id              String      @id @default(cuid())
  municipioId     String
  qtdFamiliasRisco Int        // Quantidade de famílias em risco
  nivelGravidade  NivelGravidade // BAIXO, MEDIO, ALTO, GRAVE
  periodo         String      // "2024-Q1", "2024-Q2", etc.

  // Relacionamentos
  municipio       Municipio  @relation(fields: [municipioId], references: [id])

  createdAt       DateTime    @default(now())

  @@index([municipioId])
  @@index([periodo])
  @@map("relatorios_fome")
}

model RecursoSAN {
  id              String      @id @default(cuid())
  municipioId     String      @unique
  orcamentoTotal  Decimal     @db.Decimal(15, 2) // R$ com 2 casas decimais
  orcamentoExecutado Decimal  @db.Decimal(15, 2)
  ano             Int

  // Relacionamentos
  municipio       Municipio  @relation(fields: [municipioId], references: [id])

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@map("recursos_san")
}

model Selo {
  id              String      @id @default(cuid())
  municipioId     String
  tipo            TipoSelo    // BRONZE, PRATA, OURO
  conquistadoEm   DateTime

  // Relacionamentos
  municipio       Municipio  @relation(fields: [municipioId], references: [id])

  @@index([municipioId])
  @@map("selos")
}

// ============================================
// AUTH & USUARIOS
// ============================================

model Usuario {
  id          String      @id @default(cuid())
  email       String      @unique
  senha       String      // bcrypt hash
  perfil      PerfilUsuario
  municipioId String?     // Link ao município (opcional para gestor-estadual)
  ativo       Boolean     @default(true)

  // Relacionamentos
  municipio   Municipio?  @relation(fields: [municipioId], references: [id])

  lastLoginAt DateTime?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([perfil])
  @@map("usuarios")
}

// ============================================
// DOCUMENTOS
// ============================================

model Documento {
  id          String      @id @default(cuid())
  titulo      String
  descricao   String?
  categoria   CategoriaDocumento
  arquivoUrl  String
  formato     String      // "PDF", "DOCX", etc.
  uploadedBy  String?     // ID do usuário (null para docs oficiais)

  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([categoria])
  @@map("documentos")
}

// ============================================
// AUDITORIA (LGPD)
// ============================================

model AuditLog {
  id          String      @id @default(cuid())
  usuarioId   String?
  acao        String      // "CREATE", "UPDATE", "DELETE", "LOGIN", etc.
  entidade    String      // "Membro", "Reuniao", "Conselho", etc.
  entidadeId  String?
  detalhes    Json?       // Dados da ação (antes/depois)
  ip          String?

  createdAt   DateTime    @default(now())

  @@index([usuarioId])
  @@index([entidade])
  @@index([createdAt])
  @@map("audit_logs")
}

// ============================================
// ENUMS
// ============================================

enum StatusConselho {
  ATIVO
  ATRASADO
  INATIVO
}

enum CargoConselho {
  PRESIDENTE
  VICE_PRESIDENTE
  SECRETARIO
  MEMBRO
}

enum NivelGravidade {
  BAIXO
  MEDIO
  ALTO
  GRAVE
}

enum TipoSelo {
  BRONZE
  PRATA
  OURO
}

enum PerfilUsuario {
  GESTOR_ESTADUAL
  GESTOR_MUNICIPAL
  CONSELHEIRO
  SOCIEDADE_CIVIL
}

enum CategoriaDocumento {
  LEI
  DECRETO
  TERMOS
  MODELO
  GUIA
}
```

---

## Cálculo do Índice Antifome

O **Índice Antifome** (score 0-10) é calculado dinamicamente:

```
Índice = ((Reuniões / 12) × 0.4 + (Relatórios / 5) × 0.6) × 10
```

Onde:
- **12** = máximo de reuniões trimestrais (1 por mês × 3)
- **5** = máximo de relatórios mensais
- **0.4 / 0.6** = pesos de cada fator

### Exemplo de Cálculo

```typescript
// Para um conselho com 8 reuniões e 3 relatórios no trimestre
const reunioes = 8;
const relatorios = 3;

const indice = ((reunioes / 12) * 0.4 + (relatorios / 5) * 0.6) * 10;
// = ((0.667) * 0.4 + (0.6) * 0.6) * 10
// = (0.267 + 0.36) * 10
// = 6.27
```

### Implementação no Backend

```typescript
// dashboard.service.ts
calculateIndiceAntifome(reunioes: number, relatorios: number): number {
  const reunioesNorm = Math.min(reunioes, 12) / 12;
  const relatoriosNorm = Math.min(relatorios, 5) / 5;

  const indice = ((reunioesNorm * 0.4) + (relatoriosNorm * 0.6)) * 10;

  return Math.round(indice * 100) / 100; // 2 casas decimais
}
```

---

## Mapeamento Regiões do RS

| Código | Região | Municípios Exemplo |
|--------|--------|-------------------|
| MET | Metropolitana | Porto Alegre, Canoas, São Leopoldo |
| NOR | Nordeste | Caxias do Sul, Bento Gonçalves, Veranópolis |
| NORO | Noroeste | Passo Fundo, Erechim, Carazinho |
| OES | Oeste | Santa Maria, Santiago, Santo Ângelo |
| SUL | Sul | Pelotas, Rio Grande, Bagé |
| CEN | Central | Cruz Alta, Ibirubá, Passo do Sobrado |

---

## Distribuição Realista de Status (Seed)

| Status | Porcentagem | Quantidade (497) |
|--------|-------------|------------------|
| ATIVO | 71% | ~353 |
| ATRASADO | 17% | ~84 |
| INATIVO | 12% | ~60 |

---

## Índices Recomendados

```sql
-- Performance queries frequentes
CREATE INDEX idx_municipios_estado ON municipios(estado_id);
CREATE INDEX idx_municipios_regiao ON municipios(regiao);
CREATE INDEX idx_conselhos_status ON conselhos(status);
CREATE INDEX idx_reunioes_data ON reunioes(data DESC);
CREATE INDEX idx_relatorios_periodo ON relatorios_fome(periodo);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
```

---

## Relações Importantes

| Relação | Cardinalidade | Cascade |
|---------|--------------|---------|
| Estado → Municipios | 1:N | Sim |
| Municipio → Conselho | 1:1 | Sim |
| Conselho → Membros | 1:N | Sim |
| Conselho → Reunioes | 1:N | Sim |
| Reuniao → Ata | 1:0..1 | Sim |
| Municipio → RelatorioFome | 1:N | Não |
| Municipio → RecursoSAN | 1:1 | Não |
| Municipio → Selos | 1:N | Sim |

---

_Modelo de dados criado por Aria (Architect) — 14/03/2026_
