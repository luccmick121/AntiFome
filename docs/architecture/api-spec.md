# Plataforma Antifome RS — Especificação Atual da API

**Version:** 1.1.0  
**Last Updated:** 15/03/2026  
**Base URL:** `http://localhost:3001/api`

---

## Convenções reais

| Aspecto | Implementação atual |
|---|---|
| Formato de resposta | JSON |
| Prefixo global | `/api` |
| Sessão | cookie HTTP-only `access_token` |
| Auth nas rotas protegidas | `JwtAuthGuard` |
| Erro padrão Nest | `{ statusCode, message, error }` |
| Upload | `multipart/form-data` |
| Docs visuais | Swagger em `/api/docs` |

### Observação importante

Apesar de o Swagger declarar `BearerAuth`, o backend implementado usa cookie HTTP-only. Para clientes web, isso exige `credentials: "include"`.

---

## Catálogo de endpoints

## Health

### `GET /health`

Health check simples do serviço.

**Auth:** pública

**Response**

```json
{
  "status": "ok",
  "timestamp": "2026-03-15T15:32:52.034Z",
  "service": "antifome-rs-api"
}
```

---

## Auth

### `POST /auth/login`

Realiza login por email e senha, gera JWT e grava cookie `access_token`.

**Auth:** pública

**Body**

```json
{
  "email": "gestor1@antifome.rs",
  "senha": "senha123"
}
```

**Response**

```json
{
  "message": "Login realizado com sucesso",
  "usuario": {
    "id": "cmmrkx28305lsaqoami0eeq94",
    "email": "gestor1@antifome.rs",
    "role": "GESTOR_ESTADUAL",
    "municipio_id": null,
    "municipio_nome": null
  }
}
```

**Cookie**

- `access_token`
- `httpOnly: true`
- `sameSite: "lax"`
- `path: "/"`
- `maxAge: 24h`

### `POST /auth/logout`

Limpa o cookie de sessão.

**Auth:** pública

**Response**

```json
{
  "message": "Logout realizado com sucesso"
}
```

### `GET /auth/me`

Retorna o usuário autenticado a partir do cookie.

**Auth:** cookie obrigatório

**Response**

```json
{
  "usuario": {
    "id": "cmmrkx28305lsaqoami0eeq94",
    "email": "gestor1@antifome.rs",
    "role": "GESTOR_ESTADUAL",
    "municipio_id": null,
    "municipio_nome": null
  }
}
```

---

## Municípios

### `GET /municipios`

Lista municípios com filtros simples.

**Auth:** pública

**Query params**

| Param | Tipo | Descrição |
|---|---|---|
| `status` | string | filtra por `ATIVO`, `INATIVO`, `ATRASADO` |
| `estado_id` | string | filtra pelo estado |

**Response**

Retorna `municipio` com:

- `estado`
- `conselhos` ativos limitados a 1

### `GET /municipios/codigo/:codigoIbge`

Busca município pelo código IBGE.

**Auth:** pública

### `GET /municipios/:id`

Detalhe completo do município.

**Auth:** pública

**Inclui**

- `estado`
- `conselhos` com membros e reuniões
- `selos`
- `relatorios`
- `conselho` ativo destacado
- `resumo`

### `GET /municipios/:id/historico`

Monta timeline combinando:

- reuniões
- relatórios
- selos

**Auth:** pública

### `GET /municipios/:id/indice-historico`

Gera série temporal simulada de 12 meses baseada no índice atual.

**Auth:** pública

**Observação**

O histórico do índice não vem de dados persistidos; ele é gerado por heurística.

---

## Dashboard

### `GET /dashboard/stats`

Retorna KPIs estaduais agregados.

**Auth:** protegida

**Campos**

- `totalMunicipios`
- `municipiosAtivos`
- `municipiosInativos`
- `municipiosAtrasados`
- `indiceAntifomeMedio`
- `totalConselhos`
- `conselhosAtivos`
- `totalReunioesMes`
- `selosDistribuidos`
- `timestamp`

**Observação**

Usa cache em memória de 5 minutos.

---

## Mapa

### `GET /mapa/geojson`

Retorna `FeatureCollection` GeoJSON com propriedades do banco.

**Auth:** protegida

**Shape principal**

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon"
      },
      "properties": {
        "codigo_ibge": "4314902",
        "nome": "Porto Alegre",
        "status": "ATIVO",
        "indice_antifome": 8.5,
        "populacao": 1488252
      }
    }
  ]
}
```

### `GET /mapa/geojson/:codigoIbge`

Retorna a feature GeoJSON de um município específico.

**Auth:** protegida

---

## Ranking

### `GET /ranking`

Retorna ranking paginado de municípios.

**Auth:** protegida

**Query params**

| Param | Tipo | Default |
|---|---|---|
| `page` | number | `1` |
| `limit` | number | `20` |
| `orderBy` | `nome \| status \| indice_antifome \| populacao` | `indice_antifome` |
| `orderDir` | `asc \| desc` | `desc` |
| `search` | string | vazio |
| `status` | string | vazio |

**Response**

```json
{
  "data": [
    {
      "posicao": 1,
      "id": "cm...",
      "codigo_ibge": "4314902",
      "nome": "Porto Alegre",
      "status": "ATIVO",
      "indice_antifome": 8.5,
      "populacao": 1488252,
      "selo_atual": "OURO"
    }
  ],
  "total": 497,
  "page": 1,
  "totalPages": 25,
  "hasNext": true,
  "hasPrev": false
}
```

---

## Alertas

### `GET /alertas`

Retorna alertas combinados de:

- município sem reunião recente
- município sem relatório recente
- conselho suspenso

**Auth:** protegida

**Query params**

| Param | Tipo | Descrição |
|---|---|---|
| `tipo` | string | `SEM_REUNIAO`, `SEM_RELATORIO`, `CONSELHO_SUSPENSO`, `TODOS` |

**Response**

```json
{
  "resumo": {
    "sem_reuniao": 12,
    "sem_relatorio": 34,
    "conselho_suspenso": 5,
    "total": 51
  },
  "alertas": [],
  "total": 51
}
```

### `POST /alertas/:id/quebrar-silencio`

Registra a ação de quebra de silêncio.

**Auth:** protegida

**Response**

```json
{
  "message": "Silêncio quebrado com sucesso. O conselho será notificado."
}
```

**Observação**

Hoje esse endpoint registra apenas log de aplicação. Não há persistência nem envio real de notificação.

---

## Portal do Conselho

## Conselho autenticado

### `GET /conselhos/mine`

Retorna o conselho do município do usuário logado.

**Auth:** protegida

### `GET /conselhos/mine/stats`

Retorna estatísticas resumidas do conselho:

- `totalMembros`
- `totalReunioes`
- `proximaReuniao`
- `seloAtual`
- `progressoProximoSelo`
- `reunioesFaltando`

### `GET /conselhos/mine/membros`

Lista membros do conselho do usuário.

### `GET /conselhos/mine/reunioes`

Lista reuniões do conselho do usuário.

### `GET /conselhos/mine/status`

Retorna status consolidado do conselho:

- dados do conselho
- dados do município
- status SISAN
- status CAISAN
- plano municipal
- selos e progresso
- reuniões
- relatórios
- recomendações
- próximas reuniões sugeridas

### `GET /conselhos/mine/documentos`

Lista documentos do conselho autenticado.

**Query params**

| Param | Tipo | Descrição |
|---|---|---|
| `categoria` | string | filtra documentos por categoria |

### `POST /conselhos/mine/documentos`

Faz upload e cadastro de documento.

**Auth:** protegida

**Content-Type:** `multipart/form-data`

**Campos**

| Campo | Tipo | Obrigatório |
|---|---|---|
| `nome` | string | sim |
| `categoria` | string | sim |
| `descricao` | string | não |
| `arquivo` | file | sim |

### `DELETE /conselhos/mine/documentos/:documentoId`

Remove documento do conselho autenticado.

---

## CRUD de membros

### `GET /conselhos/:conselhoId/membros`
### `POST /conselhos/:conselhoId/membros`
### `PUT /conselhos/:conselhoId/membros/:membroId`
### `DELETE /conselhos/:conselhoId/membros/:membroId`

**Auth:** protegida

**Body de criação**

```json
{
  "nome": "Maria Silva",
  "cargo": "PRESIDENTE",
  "email": "maria@example.com",
  "telefone": "(51) 99999-0000"
}
```

---

## CRUD de reuniões

### `GET /conselhos/:conselhoId/reunioes`
### `POST /conselhos/:conselhoId/reunioes`
### `PUT /conselhos/:conselhoId/reunioes/:reuniaoId`
### `DELETE /conselhos/:conselhoId/reunioes/:reuniaoId`

**Auth:** protegida

**Body de criação**

```json
{
  "data": "2026-03-15T10:00:00.000Z",
  "tipo": "ORDINARIA",
  "pauta": "Discussão do plano municipal",
  "ata_url": "https://exemplo.com/ata.pdf"
}
```

---

## Mapa de proteção

| Rota | Proteção |
|---|---|
| `/health` | pública |
| `/auth/login` | pública |
| `/auth/logout` | pública |
| `/auth/me` | cookie |
| `/municipios/*` | pública |
| `/dashboard/*` | protegida |
| `/mapa/*` | protegida |
| `/ranking` | protegida |
| `/alertas/*` | protegida |
| `/conselhos/*` | protegida |

---

## Estruturas de domínio relevantes

### Roles

- `ADMIN`
- `GESTOR_ESTADUAL`
- `CONSELHEIRO_MUNICIPAL`

### Status de município

- `ATIVO`
- `INATIVO`
- `ATRASADO`

### Status de conselho

- `ATIVO`
- `INATIVO`
- `SUSPENSO`

### Tipo de reunião

- `ORDINARIA`
- `EXTRAORDINARIA`

### Tipo de selo

- `BRONZE`
- `PRATA`
- `OURO`
- `PLATINA`

---

## Notas de implementação

1. A especificação acima foi derivada do código real dos controllers e services do backend.
2. Alguns retornos descritos pelo Swagger estão corretos em alto nível, mas os detalhes operacionais desta página refletem melhor a implementação atual.
3. Para consumo externo, o principal desalinhamento hoje é o mecanismo de autenticação por cookie versus bearer token.
