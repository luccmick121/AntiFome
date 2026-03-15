# Plataforma Antifome RS — Fluxos da API

**Version:** 1.1.0  
**Last Updated:** 15/03/2026

---

## Objetivo

Este documento descreve os fluxos operacionais mais importantes da API e como eles cruzam frontend, backend, autenticação, Prisma e PostgreSQL.

---

## Fluxo 1: Login e revalidação de sessão

```mermaid
flowchart TD
    A[Usuario envia credenciais] --> B[POST /api/auth/login]
    B --> C[AuthService.validateUser]
    C --> D[Prisma busca usuario]
    D --> E{senha valida?}
    E -- nao --> F[401 Unauthorized]
    E -- sim --> G[gera JWT]
    G --> H[Set-Cookie access_token]
    H --> I[frontend navega para area protegida]
    I --> J[GET /api/auth/me]
    J --> K[AuthService.verificarToken]
    K --> L[usuario autenticado]
```

### Observações

- O token não é devolvido como bearer token para consumo genérico.
- O fluxo assume cliente web com `credentials: "include"`.
- O frontend usa `/auth/me` para reconstruir sessão.

---

## Fluxo 2: Dashboard estadual

```mermaid
flowchart LR
    FE[Dashboard page] --> API[GET /api/dashboard/stats]
    API --> Guard[JwtAuthGuard]
    Guard --> Service[DashboardService]
    Service --> Q1[count municipios]
    Service --> Q2[count conselhos]
    Service --> Q3[aggregate indice medio]
    Service --> Q4[count reunioes do mes]
    Service --> Q5[count selos]
    Q1 --> DB[(PostgreSQL)]
    Q2 --> DB
    Q3 --> DB
    Q4 --> DB
    Q5 --> DB
    DB --> Service
    Service --> Cache[cache 5 minutos]
    Cache --> FE
```

### Saída principal

- total de municípios
- municípios por status
- índice médio antifome
- total de conselhos
- reuniões do mês
- total de selos

---

## Fluxo 3: Geração do GeoJSON do mapa

```mermaid
flowchart TD
    FE[Mapa interativo] --> API[GET /api/mapa/geojson]
    API --> Guard[JwtAuthGuard]
    Guard --> Service[MapaService]
    Service --> Cache{cache valido?}
    Cache -- sim --> Out[retorna feature collection]
    Cache -- nao --> Base{geojson base carregado?}
    Base -- sim --> Merge[merge de feature base com dados do banco]
    Base -- nao --> Mock[gera poligonos mock]
    Merge --> DB[(Municipios no PostgreSQL)]
    Mock --> DB
    DB --> Persist[monta propriedades status/indice/populacao]
    Persist --> Save[atualiza cache 1h]
    Save --> Out
```

### Observações

- Se o GeoJSON base existir, ele é a fonte geométrica principal.
- Sem o arquivo base, o sistema gera polígonos sintéticos por município.

---

## Fluxo 4: Ranking de municípios

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant API as RankingController
    participant G as JwtAuthGuard
    participant S as RankingService
    participant DB as PostgreSQL

    FE->>API: GET /api/ranking?page&limit&orderBy&orderDir&search&status
    API->>G: validar cookie
    G->>API: request.user
    API->>S: getRanking(query)
    S->>DB: findMany municipios + selo mais recente
    S->>DB: count municipios filtrados
    DB-->>S: dados + total
    S->>S: calcula posicao e paginação
    S-->>FE: response paginada
```

---

## Fluxo 5: Portal do conselheiro

```mermaid
flowchart TD
    A[Conselheiro autenticado] --> B[GET /api/conselhos/mine]
    B --> C[busca usuario]
    C --> D{usuario tem municipio?}
    D -- nao --> E[404 usuario sem municipio associado]
    D -- sim --> F[busca conselho ativo do municipio]
    F --> G{conselho existe?}
    G -- nao --> H[404 conselho nao encontrado]
    G -- sim --> I[retorna conselho + municipio + membros + reunioes]
```

### Esse fluxo é base para:

- `GET /api/conselhos/mine`
- `GET /api/conselhos/mine/stats`
- `GET /api/conselhos/mine/membros`
- `GET /api/conselhos/mine/reunioes`
- `GET /api/conselhos/mine/status`
- `GET /api/conselhos/mine/documentos`
- `POST /api/conselhos/mine/documentos`
- `DELETE /api/conselhos/mine/documentos/:documentoId`

---

## Fluxo 6: CRUD de membros e reuniões

```mermaid
flowchart LR
    FE[Portal conselho] --> API[POST PUT DELETE em /api/conselhos/:conselhoId/...]
    API --> Guard[JwtAuthGuard]
    Guard --> Service[ConselhosService]
    Service --> Check[verificar conselho existe]
    Check --> Specific[verificar membro ou reuniao existe]
    Specific --> DB[(PostgreSQL)]
    DB --> Result[create update delete]
    Result --> FE
```

### Observação importante

As rotas por `:conselhoId` validam a existência da entidade, mas hoje não cruzam explicitamente se o usuário autenticado pertence ao mesmo conselho nessa camada.

---

## Fluxo 7: Status e progresso do conselho

```mermaid
flowchart TD
    A[GET /api/conselhos/mine/status] --> B[getConselhoDoUsuario]
    B --> C[count reunioes do ano]
    B --> D[count relatorios do municipio]
    B --> E[count membros]
    C --> F[calcular progresso de selos]
    D --> F
    E --> F
    F --> G[calcular progresso geral]
    G --> H[gerar recomendacoes]
    H --> I[gerar proximas reunioes sugeridas]
    I --> J[retorno consolidado]
```

### Regras derivadas

- selos são calculados por heurística
- progresso geral usa média simples entre reuniões, relatórios e membros
- próximas reuniões são sugeridas, não agendadas de fato

---

## Fluxo 8: Repositório de documentos

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant API as ConselhosController
    participant M as Multer
    participant S as ConselhosService
    participant FS as uploads/
    participant DB as PostgreSQL

    FE->>API: POST /api/conselhos/mine/documentos multipart/form-data
    API->>M: FileInterceptor('arquivo')
    M->>FS: salva arquivo com nome unico
    M-->>API: metadata do arquivo
    API->>S: criarDocumento(userId, metadata)
    S->>DB: create documento
    DB-->>FE: documento criado
```

### Resultado

- arquivo físico salvo no disco local
- metadados persistidos na tabela `documentos`
- URL pública montada como `/api/uploads/:filename`

---

## Fluxo 9: Alertas de inatividade

```mermaid
flowchart TD
    A[GET /api/alertas] --> B[AlertasService]
    B --> C[getMunicipiosSemReuniao]
    B --> D[getMunicipiosSemRelatorio]
    B --> E[getConselhosSuspensos]
    C --> DB[(PostgreSQL)]
    D --> DB
    E --> DB
    DB --> F[combina listas]
    F --> G[filtra por tipo se houver]
    G --> H[ordena por dias de inatividade]
    H --> I[retorna resumo + lista]
```

### Quebra de silêncio

`POST /api/alertas/:id/quebrar-silencio` hoje registra apenas um log de aplicação e devolve mensagem de sucesso. Ainda não há persistência nem notificação real.

---

## Fluxo 10: Seed e bootstrap de dados

```mermaid
flowchart TD
    Seed[prisma/seed.ts] --> Estado[upsert estado RS]
    Estado --> Municipios[cria 497 municipios]
    Municipios --> Conselhos[cria conselhos conforme status]
    Conselhos --> Membros[cria membros]
    Conselhos --> Reunioes[cria reunioes]
    Municipios --> Relatorios[cria relatorios]
    Municipios --> Selos[cria selos]
    Municipios --> Usuarios[cria usuarios demo]
```

### Scripts auxiliares

- criação de usuário: [create-user.ts](/home/mestredoblack/teste/backend/scripts/create-user.ts)
- geração de GeoJSON: [gerar-geojson.ts](/home/mestredoblack/teste/backend/scripts/gerar-geojson.ts)

---

## Riscos e pontos de atenção

| Área | Situação atual | Impacto |
|---|---|---|
| Autorização backend | guard valida token, não papel/escopo | acesso cruzado precisa reforço |
| Swagger x autenticação | docs sugerem bearer, código usa cookie | integração externa pode confundir |
| Persistência de alertas | quebra de silêncio não persiste | fluxo incompleto |
| Uploads | armazenamento local | frágil para produção |
| Regras de negócio | vários cálculos são heurísticos | documentação precisa deixar isso explícito |
