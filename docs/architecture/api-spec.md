# Plataforma Antifome RS — Especificação de APIs

**Version:** 1.0.0
**Last Updated:** 14/03/2026
**Status:** Active
**Base URL:** `http://localhost:3001/api`

---

## Visão Geral

API RESTful para o backend NestJS da Plataforma Antifome RS.

### Convenções

| Aspecto | Padrão |
|---------|--------|
| **Formato** | JSON |
| **Auth** | Bearer Token (JWT) |
| **Erros** | `{ statusCode, message, error }` |
| **Paginação** | `?page=1&limit=20` |
| **Ordenação** | `?orderBy=field&order=asc|desc` |

### Headers Comuns

```
Content-Type: application/json
Authorization: Bearer <token>
```

---

## Autenticação

### POST /api/auth/login

Realiza login e retorna JWT token.

**Request:**
```json
{
  "email": "gestor@consers.rs.gov.br",
  "senha": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "clx123abc",
    "email": "gestor@consers.rs.gov.br",
    "perfil": "GESTOR_ESTADUAL",
    "municipioId": null
  }
}
```

**Errors:**
| Code | Mensagem |
|------|----------|
| 401 | Credenciais inválidas |
| 400 | Dados incompletos |

---

### POST /api/auth/logout

Invalida sessão atual.

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

---

### GET /api/auth/me

Retorna dados do usuário autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "id": "clx123abc",
  "email": "gestor@consers.rs.gov.br",
  "perfil": "GESTOR_ESTADUAL",
  "municipioId": null,
  "ultimoAcesso": "2026-03-14T10:30:00Z"
}
```

---

## Dashboard

### GET /api/dashboard/stats

Retorna KPIs globais do dashboard.

**Response (200):**
```json
{
  "conselhosAtivos": {
    "total": 353,
    "porcentagem": 71.0
  },
  "familiasEmRisco": {
    "total": 1294950,
    "grauGrave": 345000
  },
  "orcamentoSAN": {
    "total": 150000000.00,
    "executado": 89500000.00,
    "porcentagemExecucao": 59.7
  },
  "cozinhasSolidarias": {
    "total": 245,
    "ativas": 198
  },
  "ppsan": {
    "total": 180,
    "ativas": 156
  },
  "alertas": {
    "conselhosInativos": 60,
    "conselhosAtrasados": 84
  }
}
```

---

## Mapa

### GET /api/mapa/geojson

Retorna FeatureCollection GeoJSON com todos os municípios e seus status.

**Query Params:**
| Param | Tipo | Descrição |
|-------|------|-----------|
| `status` | string | Filtrar por status: `ATIVO`, `ATRASADO`, `INATIVO` |
| `regiao` | string | Filtrar por região |
| `camada` | string | `base`, `iag`, `cozinhas`, `ppsan` |

**Response (200):**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "municipioId": "clx123abc",
        "nome": "Porto Alegre",
        "ibgeCode": "4314902",
        "regiao": "Metropolitana",
        "status": "ATIVO",
        "indiceAntifome": 8.5,
        "familiasEmRisco": 45000,
        "statusSisan": "Aderido",
        "statusCaisan": "Ativo"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-51.2, -30.0], ...]]
      }
    }
  ],
  "cache": true,
  "totalFeatures": 497
}
```

---

### GET /api/mapa/layers/:tipo

Retorna dados para camadas adicionais do mapa.

**Tipos:** `iag`, `cozinhas`, `ppsan`

**Response (200) - Cozinhas:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "id": "cz001",
        "nome": "Cozinha Solidária Centro",
        "municipioId": "clx123abc",
        "municipio": "Porto Alegre",
        "status": "Ativa",
        "capacidadeDiaria": 500
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-51.2096, -30.0330]
      }
    }
  ]
}
```

---

## Municípios

### GET /api/municipios

Lista todos os municípios com paginação.

**Query Params:**
| Param | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `page` | int | 1 | Página atual |
| `limit` | int | 20 | Itens por página |
| `search` | string | - | Busca por nome |
| `status` | string | - | Filtrar por status conselho |
| `regiao` | string | - | Filtrar por região |
| `orderBy` | string | `nome` | Campo de ordenação |
| `order` | string | `asc` | asc/desc |

**Response (200):**
```json
{
  "data": [
    {
      "id": "clx123abc",
      "ibgeCode": "4314902",
      "nome": "Porto Alegre",
      "regiao": "Metropolitana",
      "statusConselho": "ATIVO",
      "indiceAntifome": 8.5,
      "familiasEmRisco": 45000,
      "statusSisan": "Aderido"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 497,
    "totalPages": 25
  }
}
```

---

### GET /api/municipios/:id

Retorna detalhes completos de um município.

**Response (200):**
```json
{
  "id": "clx123abc",
  "ibgeCode": "4314902",
  "nome": "Porto Alegre",
  "regiao": "Metropolitana",
  "estado": {
    "sigla": "RS",
    "nome": "Rio Grande do Sul"
  },
  "conselho": {
    "id": "clx456def",
    "status": "ATIVO",
    "dataCriacao": "2020-03-15",
    "ultimoRelatorioAt": "2026-03-10",
    "totalReunioes": 45,
    "totalRelatorios": 18,
    "indiceAntifome": 8.5,
    "membros": [
      {
        "id": "m001",
        "nome": "Maria Silva",
        "cargo": "PRESIDENTE",
        "contato": "(51) 99999-0001"
      }
    ],
    "proximaReuniao": "2026-03-20"
  },
  "statusGovernanca": {
    "sisan": "Aderido",
    "caisan": "Ativo",
    "planoMunicipalSAN": "Elaborado"
  },
  "indicadores": {
    "familiasEmRisco": 45000,
    "nivelGravidadeIAG": "ALTO",
    "cozinhasSolidarias": 3,
    "ppsan": 2
  },
  "recursos": {
    "orcamentoTotal": 500000.00,
    "orcamentoExecutado": 320000.00,
    "ano": 2026
  },
  "selos": [
    {
      "tipo": "BRONZE",
      "conquistadoEm": "2024-06-15"
    },
    {
      "tipo": "PRATA",
      "conquistadoEm": "2025-03-10"
    }
  ],
  "geojson": { ... }
}
```

---

### GET /api/municipios/:id/sisan

Retorna detalhes do status SISAN do município.

**Response (200):**
```json
{
  "municipioId": "clx123abc",
  "municipio": "Porto Alegre",
  "status": "Aderido",
  "dataAdesao": "2021-05-20",
  "caisan": {
    "status": "Ativo",
    "dataFormacao": "2021-08-15",
    "totalMembros": 25
  },
  "planoMunicipalSAN": {
    "status": "Elaborado",
    "dataAprovacao": "2022-01-10",
    "vigenciaAte": "2026-12-31"
  }
}
```

---

## Ranking

### GET /api/ranking

Retorna ranking de municípios por Índice Antifome.

**Query Params:**
| Param | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `page` | int | 1 | Página |
| `limit` | int | 50 | Itens por página |
| `orderBy` | string | `indiceAntifome` | Campo ordenação |
| `order` | string | `desc` | asc/desc (melhor para ranking) |
| `regiao` | string | - | Filtrar por região |
| `status` | string | - | Filtrar por status |

**Response (200):**
```json
{
  "data": [
    {
      "posicao": 1,
      "municipioId": "clx123abc",
      "nome": "Bento Gonçalves",
      "regiao": "Nordeste",
      "status": "ATIVO",
      "indiceAntifome": 9.8,
      "familiasEmRisco": 8500
    },
    {
      "posicao": 2,
      "municipioId": "clx456def",
      "nome": "Porto Alegre",
      "regiao": "Metropolitana",
      "status": "ATIVO",
      "indiceAntifome": 8.5,
      "familiasEmRisco": 45000
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 497,
    "totalPages": 10
  },
  "estatisticas": {
    "mediaGeral": 5.2,
    "melhorIndice": 9.8,
    "piorIndice": 1.2
  }
}
```

---

## Alertas

### GET /api/alertas

Retorna conselhos inativos e atrasados.

**Response (200):**
```json
{
  "inativos": [
    {
      "municipioId": "clx789ghi",
      "municipio": "São Francisco de Paula",
      "regiao": "Metropolitana",
      "ultimaAta": "2025-11-15",
      "diasSemAta": 120,
      "familiasEmRisco": 3200,
      "indiceAntifome": 2.1
    }
  ],
  "atrasados": [
    {
      "municipioId": "clx012jkl",
      "municipio": "Lajeado",
      "regiao": "Central",
      "ultimaAta": "2026-02-01",
      "diasSemAta": 42,
      "familiasEmRisco": 5600
    }
  ],
  "resumo": {
    "totalInativos": 60,
    "totalAtrasados": 84,
    "totalFamiliasAfetadas": 245000
  }
}
```

---

### POST /api/alertas/:municipioId/notificar

Simula notificação "Quebrar Silêncio" para município.

**Response (200):**
```json
{
  "success": true,
  "message": "Notificação enviada para São Francisco de Paula",
  "municipioId": "clx789ghi",
  "notificadoEm": "2026-03-14T10:30:00Z"
}
```

---

## Conselhos (Portal do Conselheiro)

### GET /api/conselhos/:id

Retorna detalhes do conselho municipal.

**Response (200):**
```json
{
  "id": "clx456def",
  "municipio": {
    "id": "clx123abc",
    "nome": "Porto Alegre"
  },
  "status": "ATIVO",
  "dataCriacao": "2020-03-15",
  "ultimoRelatorioAt": "2026-03-10",
  "totalReunioes": 45,
  "totalRelatorios": 18,
  "indiceAntifome": 8.5,
  "membros": [ ... ],
  "proximoSelo": {
    "tipo": "OURO",
    "faltam": {
      "reunioes": 5,
      "relatorios": 2
    }
  }
}
```

---

### POST /api/conselhos/:id/membro

Cadastra novo membro do conselho.

**Request:**
```json
{
  "nome": "João Santos",
  "cargo": "MEMBRO",
  "contato": "(51) 98888-1234"
}
```

**Response (201):**
```json
{
  "id": "m002",
  "conselhoId": "clx456def",
  "nome": "João Santos",
  "cargo": "MEMBRO",
  "contato": "(51) 98888-1234",
  "ativo": true,
  "createdAt": "2026-03-14T10:35:00Z"
}
```

---

### PUT /api/conselhos/:id/membro/:membroId

Atualiza membro existente.

**Request:**
```json
{
  "nome": "João Santos",
  "cargo": "VICE_PRESIDENTE",
  "contato": "(51) 98888-5678"
}
```

---

### DELETE /api/conselhos/:id/membro/:membroId

Remove membro do conselho.

**Response (200):**
```json
{
  "success": true,
  "message": "Membro removido com sucesso"
}
```

---

### POST /api/conselhos/:id/reuniao

Registra nova reunião.

**Request:**
```json
{
  "data": "2026-03-14",
  "pauta": "Reunião ordinária - revisão de metas trimestrais",
  "presentes": ["m001", "m002", "m003"],
  "ata": {
    "descricao": "Ata da reunião do dia 14/03/2026..."
  }
}
```

**Response (201):**
```json
{
  "id": "req001",
  "conselhoId": "clx456def",
  "data": "2026-03-14",
  "pauta": "Reunião ordinária - revisão de metas trimestrais",
  "temAta": true,
  "ata": {
    "id": "ata001",
    "descricao": "Ata da reunião do dia 14/03/2026..."
  },
  "presentes": 3,
  "createdAt": "2026-03-14T11:00:00Z"
}
```

---

### GET /api/conselhos/:id/reunioes

Lista reuniões do conselho.

**Query Params:** `page`, `limit`, `dataInicio`, `dataFim`

**Response (200):**
```json
{
  "data": [
    {
      "id": "req001",
      "data": "2026-03-14",
      "pauta": "Reunião ordinária",
      "temAta": true,
      "presentes": 5
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45
  }
}
```

---

## Documentos

### GET /api/documentos

Lista documentos do repositório.

**Query Params:**
| Param | Tipo | Descrição |
|-------|------|-----------|
| `categoria` | string | Filtrar: `LEI`, `DECRETO`, `TERMOS`, `MODELO`, `GUIA` |
| `search` | string | Busca por título |

**Response (200):**
```json
{
  "data": [
    {
      "id": "doc001",
      "titulo": "Lei Municipal de Criação do COMSEA",
      "descricao": "Modelo de lei para criação do conselho municipal",
      "categoria": "MODELO",
      "formato": "PDF",
      "arquivoUrl": "/docs/modelos/lei-comsea.pdf",
      "createdAt": "2026-01-15"
    }
  ],
  "categorias": [
    { "categoria": "LEI", "total": 12 },
    { "categoria": "MODELO", "total": 8 }
  ]
}
```

---

### POST /api/documentos

Upload de novo documento (apenas gestores).

**Request:** multipart/form-data

**Response (201):**
```json
{
  "id": "doc015",
  "titulo": "Ata Reunião 2026-03",
  "categoria": "MODELO",
  "arquivoUrl": "/uploads/ata-2026-03.pdf",
  "createdAt": "2026-03-14T12:00:00Z"
}
```

---

## Simulador de Impacto

### GET /api/simulador/impacto

Calcula impacto de mudanças na eficiência.

**Query Params:**
| Param | Tipo | Descrição |
|-------|------|-----------|
| `eficienciaAtual` | int | Eficiência atual (50-100) |
| `eficienciaNova` | int | Eficiência proposta (50-100) |

**Response (200):**
```json
{
  "familiasTotais": 1294950,
  "eficienciaAtual": 70,
  "eficienciaNova": 85,
  "familiasAtuais": 906465,
  "familiasNovas": 1100708,
  "familiasAdicionais": 194243,
  "formula": "1.294.950 × 0.85 = 1.100.708",
  "impacto": "+194.243 famílias atendidas"
}
```

---

## Gestão CONSEA

### GET /api/gestao/consea

Informações do CONSEA-RS.

**Response (200):**
```json
{
  "nome": "CONSEA-RS",
  "missão": "Articular políticas de segurança alimentar...",
  "contato": {
    "telefone": "(51) 3288-XXXX",
    "email": "consea@prs.rs.gov.br",
    "instagram": "@consears",
    "endereco": "Palácio do Governo, Porto Alegre"
  },
  "esferas": {
    "nacional": {
      "nome": "CONSEA Nacional",
      "descricao": "Define diretrizes nacionais de SAN"
    },
    "estadual": {
      "nome": "CONSEA-RS",
      "descricao": "Articula e monitora conselhos municipais"
    },
    "municipal": {
      "nome": "COMSEA Municipal",
      "descricao": "Monitora insegurança alimentar na ponta"
    }
  },
  "links": [
    { "titulo": "SISAN", "url": "https://sisan.saude.gov.br" },
    { "titulo": "CadÚnico", "url": "https://www.gov.br/cadastro" },
    { "titulo": "Portal Transparência", "url": "https://www.transparencia.gov.br" }
  ]
}
```

---

## Erros

### Formato de Erro Padrão

```json
{
  "statusCode": 404,
  "message": "Município não encontrado",
  "error": "Not Found"
}
```

### Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Bad Request - Dados inválidos |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 500 | Internal Server Error |

---

## Rate Limiting

| Rota | Limite |
|------|--------|
| `/auth/login` | 5 tentativas/min |
| Outras rotas | 100 req/min |

---

## WebSocket (Opcional - Futuro)

Para notificações em tempo real:

```javascript
// Conectar
const ws = new WebSocket('ws://localhost:3001/ws');

// Eventos
ws.on('message', (data) => {
  const event = JSON.parse(data);
  // event.type: 'NEW_ALERT', 'STATUS_CHANGE', 'NEW_REUNIAO'
});
```

---

_Especificação de APIs criada por Aria (Architect) — 14/03/2026_
