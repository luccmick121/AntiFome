# Projeto Antifome — Product Requirements Document (PRD)

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 14/03/2026 | 2.0 | PRD Revisado — +FR (SISAN/CAISAN/Cozinhas/PPSAN/IAG), 4 personas, LGPD, Branding Anti-Fome, API IBGE | Morgan (PM) |
| 14/03/2026 | 1.0 | PRD Original — Hackathon MVP | Morgan (PM) |

---

## 1. Goals and Background Context

### Goals

- Criar um sistema de governança preditiva para monitoramento dos 497 CONSEAs municipais do Rio Grande do Sul
- Conectar dados de vulnerabilidade alimentar (famílias em risco) com execução orçamentária SAN em tempo real
- Eliminar o "silêncio administrativo" — detectar conselhos inativos em menos de 24h vs. meses
- Fornecer ao CONSEA-RS um dashboard executivo para tomar decisões baseadas em evidências
- Entregar um MVP funcional em 2 dias de hackathon, com arquitetura escalável para expansão nacional

### Background Context

O Conselho de Segurança Alimentar e Nutricional do Rio Grande do Sul (CONSEA-RS) é o órgão de articulação entre governo e sociedade civil para Políticas Públicas de SAN Sustentável. Ele estimula a criação dos COMSEAs municipais, que são essenciais para que municípios adiram ao SISAN e liberem acesso a recursos federais.

**O problema central:** Dos 497 municípios do RS, uma parcela significativa tem conselhos inativos ou inoperantes. Sem conselho ativo, o município não adere ao SISAN, não recebe recursos sanitários federais, e a população em insegurança alimentar fica desassistida. O Estado não consegue monitorar essa situação em tempo real — depende de planilhas manuais e relatórios desatualizados.

**A solução:** A Plataforma Antifome conecta a existência da fome (dados de insegurança alimentar) à existência da governança (atividade dos conselhos) e à existência do orçamento (recursos SAN). O município que mantém o conselho ativo ganha selos de Eficiência SAN e acesso facilitado a recursos. O Estado ganha visibilidade total em tempo real.

**Estrutura de governança (3 esferas):**

| Esfera | Conselho | Função |
|--------|----------|--------|
| Nacional | CONSEA Nacional | Define diretrizes nacionais de SAN |
| Estadual | CONSEA-RS | Articula e monitora os conselhos municipais |
| Municipal | COMSEA Municipal | Monitora insegurança alimentar na ponta |

### Change Log

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 14/03/2026 | 1.0 | PRD Original — Hackathon MVP | Morgan (PM) |

---

## 2. Requirements

### Functional Requirements

**FR1:** O sistema deve exibir um mapa interativo do RS com 497 municípios, coloridos por status do conselho (Verde=Ativo, Amarelo=Atrasado, Vermelho=Inativo)

**FR2:** O dashboard principal deve exibir 3 KPIs globais: % de conselhos ativos, total de famílias em risco (SISVAN), e orçamento SAN executado vs. total

**FR3:** O sistema deve calcular e exibir o "Índice Antifome" (score 0-10) por município, baseado em: `Índice = ((Reuniões / 12) × 0.4 + (Relatórios / 5) × 0.6) × 10` — onde 12 é o máximo de reuniões trimestrais (1 por mês) e 5 é o máximo de relatórios mensais

**FR4:** O sistema deve listar conselhos inativos com data da última ata, região, e famílias em risco, com botão "Quebrar Silêncio" (simulação de notificação)

**FR5:** O portal do conselho municipal deve permitir cadastro de membros (nome, cargo, contato)

**FR6:** O portal do conselho municipal deve permitir registro de reuniões (data, pauta, presença) e upload de atas

**FR7:** O ranking de municípios deve ser ordenável por Índice Antifome, região, status, e famílias em risco

**FR8:** O sistema deve permitir envio de relatórios de reunião por município, com descrição e data

**FR9:** Ao clicar em um município no mapa, o sistema deve navegar para a página de detalhe com conselho, membros, atas, recursos e histórico

**FR10:** O sistema deve exibir uma aba "Gestão CONSEA" com informações do CONSEA-RS, contato, missão e guia de criação de conselho municipal

**FR11:** O sistema deve exibir um "Simulador de Impacto" — se o gestor alterar a eficiência de alocação, ver o impacto em famílias atendidas

**FR12:** O sistema deve exibir o **status de adesão ao SISAN** por município (Aderido / Em processo / Não aderido)

**FR13:** O sistema deve exibir o **status do CAISAN** (Câmara Intersetorial de SAN) por município (Ativo / Em formação / Não criado)

**FR14:** O sistema deve exibir o **status do Plano Municipal de SAN** por município (Elaborado / Em elaboração / Não iniciado)

**FR15:** O sistema deve exibir um **dashboard de Cozinhas Solidárias** com dados do governo federal, visualizável por município

**FR16:** O sistema deve exibir um **dashboard de Pontos Populares PPSAN** com dados do governo federal, visualizável por município

**FR17:** O sistema deve exibir o **indicador de taxa de IAG** (Insegurança Alimentar Grave) por município, permitindo identificar as áreas mais críticas

**FR18:** O sistema deve disponibilizar um **repositório de documentos** com leis, decretos, termos de compromisso/adesão e modelos para download pelos municípios

**FR19:** O sistema deve enviar **notificações e alertas** para prazos de atualização de documentos, reuniões de conselhos e metas de adesão

**FR20:** O sistema deve possuir **tela de login e autenticação** para controlar o acesso dos perfis internos (gestor estadual, gestor municipal e conselheiro), com redirecionamento conforme permissões

### Non-Functional Requirements

**NFR1:** A aplicação deve carregar o mapa com todos os 497 municípios em menos de 3 segundos

**NFR2:** A stack deve ser **Next.js** (frontend) + **NestJS** (backend) + **Prisma** (ORM) + **PostgreSQL** (banco)

**NFR3:** O banco de dados deve ser populado via seed script com JSON dos 497 municípios do RS (código IBGE, nome, região, geometria simplificada)

**NFR4:** A arquitetura de dados deve suportar multi-estado (tabela `estados` como raiz) para expansão nacional futura

**NFR5:** O sistema deve funcionar com dados simulados realistas para o hackathon, com pontos de extensão para APIs reais (IBGE, Portal da Transparência, Dados.gov.br)

**NFR6:** Design responsivo, funcionando em desktop (1280px+) — mobile é nice-to-have

**NFR7:** Interface visual governamental e profissional — paleta Verde Petróleo/Vermelho Urgência, tipografia Roboto

**NFR8:** Conformidade com LGPD — dados sensíveis anonimizados, sem exposição de CPFs pessoais

**NFR9:** Controles de acesso baseados em função (RBAC) — perfis com permissões distintas

**NFR10:** Auditoria de atividades — log de ações críticas (cadastro, exclusão, envio de relatórios)

**NFR11:** A autenticação deve manter sessão segura, com proteção de rotas privadas no frontend e validação de credenciais no backend

### Usuários-Alvo (Personas)

| Persona | Perfil | O que precisa fazer no sistema |
|---------|--------|-------------------------------|
| **Gestor Estadual** (CONSEA-RS) | Equipe de monitoramento e articulação | Ver mapa, alertas, ranking, notificar municípios inativos, tomar decisões, gerar relatórios |
| **Gestor Municipal** | Prefeito, secretário ou equipe técnica | Acompanhar adesão ao SISAN, status do COMSEA/CAISAN, Plano Municipal de SAN |
| **Conselheiro Municipal** | Membro do COMSEA/CAISAN | Cadastrar membros, registrar reuniões, enviar atas, ver progresso do município |
| **Sociedade Civil** | Entidades que atuam em SAN | Consultar situação dos conselhos, cozinhas solidárias e PPSAN nos municípios |

### Restrições

| Restrição | Detalhe |
|-----------|---------|
| **Prazo MVP** | 15 horas de desenvolvimento (hackathon) |
| **Orçamento** | Código aberto, sem custos de licença |
| **Dependência de dados** | Dados simulados para MVP; APIs públicas reais para produção |
| **Tecnologia** | Preferência por código aberto (Next.js, NestJS, PostgreSQL, Leaflet) |

### Critérios de Sucesso (para o Hackathon)

- [ ] Mapa interativo do RS com 497 municípios coloridos por status carregando em < 3s
- [ ] Dashboard com KPIs: conselhos ativos, famílias em risco (IAG), orçamento SAN, Cozinhas Solidárias, PPSAN
- [ ] Status de adesão ao SISAN + COMSEA + CAISAN + Plano Municipal de SAN por município
- [ ] Portal municipal permitindo cadastro de membros + registro de reunião + envio de ata
- [ ] Ranking de municípios ordenável por Índice Antifome
- [ ] Repositório de documentos com modelos para download
- [ ] Simulador de impacto funcionando para o pitch ("+10% eficiência = X famílias")
- [ ] Demo de 5 minutos: banca vê o mapa, entende o problema, sente o impacto

---

## 3. User Interface Design Goals

### Overall UX Vision

Dashboard executivo governamental com visual institucional moderno. O usuário deve entender a situação dos conselhos em menos de 5 segundos ao ver o mapa. O mapa é a peça central — todo o resto é contexto. A experiência no portal municipal deve ser simples e operacional, como um formulário de gestão, não como um ERP.

### Key Interaction Paradigms

- **Mapa como entry point principal** — clique no município para detalhe
- **Cards de KPI fixos** no topo de todas as telas do dashboard estadual
- **Sidebar com navegação** — colapsável, com badge de alertas
- **Listas com ordenação e filtro** — ranking, alertas, membros
- **Formulários simples** — cadastro de membros, reuniões, atas

### Core Screens and Views

1. **Dashboard Principal** (`/`) — KPIs + mini mapa + ranking top 10
2. **Mapa Interativo** (`/mapa`) — Mapa leaflet do RS com 497 municípios
3. **Ranking de Municípios** (`/ranking`) — Tabela completa ordenável
4. **Alertas de Inatividade** (`/alertas`) — Conselhos inativos/atrasados
5. **Detalhe do Município** (`/municipios/[id]`) — Tudo sobre um município
6. **Portal do Conselho** (`/conselho`) — Dashboard do conselheiro municipal
7. **Registro de Reuniões** (`/conselho/reunioes`) — Form de reunião/ata
8. **Gestão de Membros** (`/conselho/membros`) — Cadastro de conselheiros
9. **Gestão CONSEA** (`/gestao`) — Informações e guia

### Accessibility

Nenhum requisito formal de acessibilidade para o MVP do hackathon (futuro: WCAG AA)

### Branding (Guia de Estilo: Sistema Anti-Fome)

#### Paleta de Cores (Alto Contraste e Alerta)

| Uso | Cor | Código | Descrição |
|-----|-----|--------|-----------|
| **Primária** | Verde Petróleo Escuro | `#1A2F23` | Seriedade governamental, ligação com a terra |
| **Urgência** | Vermelho Sangue | `#B71C1C` | Botões de ação, indicadores críticos, insegurança severa |
| **Sucesso** | Verde Folha | `#2E7D32` | Conselhos ativos, metas alcançadas |
| **Aviso** | Âmbar/Seca | `#FF8F00` | Atrasos, riscos iminentes |
| **Erro/Crítico** | Vermelho Vivo | `#D32F2F` | Erros, municípios inativos |
| **Fundo** | Cinza Gelo | `#F5F5F5` | Redução de cansaço visual em tabelas |
| **Texto** | Grafite | `#212121` | Legibilidade máxima |
| **Bordas** | Cinza Médio | `#BDBDBD` | Divisores e separadores |

#### Tipografia

- **Fonte:** Roboto ou Public Sans (padrão governamental, transmite transparência)
- **Títulos (H1/H2):** Bold (700), 32px/24px
- **Corpo de Texto:** Regular (400), 16px, line-height 1.5
- **Labels/Dados:** Medium (500), 14px, caixa alta para campos críticos

#### Ícones

- **Padrão:** Material Symbols (Sharp, Outline)
- **Estilo:** Linha fina, minimalista, sem arredondamentos excessivos

#### Componentes UI

- **Botões:** Cantos vivos (máx 2px raio), ação principal em Vermelho Urgência
- **Tabelas:** Linhas alternadas em cinza claríssimo, grade visível
- **Cards:** Fundo branco, bordas sutis, para indicadores de emergência
- **Modais:** Overlay escuro (80% opacidade), foco total na decisão

> **Nota:** Evitar gradientes, sombras suaves ou animações fluidas. Prefira transições rápidas e layouts em blocos sólidos.

- **Nome:** "Antifome RS" — com "RS" em superscript verde

### Target Platforms

Web Responsive, Desktop First (1280px+)

---

## 4. Technical Assumptions

### Arquitetura: Frontend + Backend separados

O projeto tem duas partes que rodam separadamente:

| Parte | Tecnologia | Porta | Função |
|-------|-----------|-------|--------|
| **Frontend** | Next.js 14 (App Router) | 3000 | Interface do usuário, mapa, dashboards |
| **Backend** | NestJS | 3001 | API REST, regras de negócio, banco de dados |
| **Banco** | PostgreSQL | 5432 | Dados persistentes |
| **ORM** | Prisma | — | Conexão com o banco |

### Por que dois projetos?

O **Next.js** é excelente para interface (React, SSR, roteamento). O **NestJS** é excelente para API (controllers, services, testes, arquitetura limpa). Separar permite que o time trabalhe em paralelo — um no front, outro no back.

### Testing Requirements

Para o hackathon: smoke test manual. Não é prioridade unit testing no MVP.

### Additional Technical Assumptions and Requests

- **Leaflet** + `react-leaflet` para o mapa interativo (leve, sem dependência de Google Maps API)
- **GeoJSON estático** dos municípios do RS via IBGE (baixar uma vez, incluir no repo)
- **Tailwind CSS** para estilização rápida e consistente
- **shadcn/ui** para componentes (Cards, Tables, Forms, Badge)
- **Autenticação obrigatória** para áreas internas — tela de login para perfis de gestão e conselho; consulta pública permanece aberta quando aplicável
- **Dados simulados realistas** para o hackathon — seed com distribuição realista de ativo/atrasado/inativo (71%/17%/12%)
- **APIs públicas para integração futura:** IBGE (municipios/geometria), Portal da Transparência (orçamento SAN), Dados.gov.br
- **NestJS modules:** `MunicipiosModule`, `ConselhosModule`, `ReunioesModule`, `MembrosModule`, `DashboardModule`, `MapaModule`
- **APIs públicas confirmadas (testadas ao vivo):**

| API | Endpoint | O que retorna |
|-----|----------|---------------|
| **IBGE Municípios** | `GET https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios` | 497 municípios com nome, código IBGE, mesorregião, microrregião |
| **IBGE GeoJSON** | `GET https://servicodados.ibge.gov.br/api/v3/malhas/estados/43?formato=application/vnd.geo+json&qualidade=intermediaria&intrarregiao=municipio` | FeatureCollection com 497 polígonos reais (fronteiras municipais) |
| **Cozinhas Solidárias RS** | `https://mapacozinhas-rs.org.br/` | Mapeamento de cozinhas solidárias no RS |
| **Portal da Transparência** | API do governo federal | Dados de execução orçamentária SAN |
| **Dados.gov.br** | Dados abertos | Diversos datasets de SAN e desenvolvimento social |

> **Nota:** O GeoJSON do IBGE será importado como arquivo estático no seed (não depender da API em runtime). Qualidade `baixa` para overview, `intermediaria` para zoom.

- **Autenticação MVP:** Tela de login com autenticação por perfil e proteção das rotas internas do sistema; a experiência pública pode permanecer sem login

---

## 5. Epic List

### Epic 1: Fundação e Infraestrutura
> Configurar projeto Next.js (frontend) + NestJS (backend) + Prisma + PostgreSQL, schema do banco, seed data dos 497 municípios do RS via API do IBGE, e layout base com sidebar + KPIs.

### Epic 2: Dashboard do Estado (Visão Macro)
> Implementar o mapa interativo do RS com GeoJSON real do IBGE, ranking de municípios por Índice Antifome, indicadores (IAG, Cozinhas Solidárias, PPSAN, SISAN/COMSEA/CAISAN/Plano), e página de alertas de inatividade.

### Epic 3: Portal do Conselho Municipal
> Criar o portal do conselheiro com cadastro de membros, registro de reuniões, envio de atas, visualização do status/progresso do município, e repositório de documentos.

### Epic 4: Gestão CONSEA e Extras
> Implementar aba informativa Gestão CONSEA (com missão, contato, guia de criação), simulador de impacto, página de detalhe do município, notificações/relatórios, e polish final do dashboard.

---

## 6. Epic Details

### Epic 1: Fundação e Infraestrutura

**Objetivo:** Estabelecer a base técnica do projeto — Next.js com App Router, Prisma + PostgreSQL, schema de dados normalizado para multi-estado, e seed data dos 497 municípios do RS com distribuição realista de status. O epic termina com um layout funcional com sidebar, KPIs globais no topo, e o sistema rodando localmente.

---

#### Story 1.1: Setup do Frontend (Next.js)

**As a** dev,
**I want** um projeto Next.js 14 com App Router configurado,
**so that** temos a base para construir a interface do usuário.

**Acceptance Criteria:**
1. Projeto Next.js 14+ criado com App Router habilitado
2. TypeScript configurado
3. Tailwind CSS configurado com tema customizado (paleta Verde Petróleo/Vermelho Urgência)
4. shadcn/ui inicializado e funcionando
5. Pasta `src/app/` com layout raiz e page de teste rodando em `localhost:3000`
6. Dependências: `react-leaflet`, `leaflet`

---

#### Story 1.1b: Setup do Backend (NestJS)

**As a** dev,
**I want** um projeto NestJS configurado com módulos principais,
**so that** temos a API REST para o frontend consumir.

**Acceptance Criteria:**
1. Projeto NestJS criado com módulos: `MunicipiosModule`, `ConselhosModule`, `ReunioesModule`, `MembrosModule`, `DashboardModule`, `MapaModule`
2. TypeScript configurado
3. Prisma Service configurado para conexão com PostgreSQL
4. CORS habilitado para o frontend (`localhost:3000`)
5. Rodando em `localhost:3001`
6. Documentação Swagger disponível em `/api/docs`

---

#### Story 1.2: Schema do Banco de Dados (Prisma)

**As a** dev,
**I want** um schema Prisma completo com tabelas para estados, municípios, conselhos, membros, reuniões, atas, relatórios de fome e recursos SAN,
**so that** o banco suporta todas as funcionalidades do MVP e é escalável para multi-estado.

**Acceptance Criteria:**
1. Tabela `estados` (id, uf, nome, sigla)
2. Tabela `municipios` (id, ibge_code, nome, regiao, estado_id, geometria_geojson)
3. Tabela `conselhos` (id, municipio_id, status enum[ATIVO/ATRASADO/INATIVO], data_criacao, ultimo_relatorio_at)
4. Tabela `membros` (id, conselho_id, nome, cargo, contato, created_at)
5. Tabela `reunioes` (id, conselho_id, data, pauta, created_at)
6. Tabela `atas` (id, reuniao_id, descricao, arquivo_url, created_at)
7. Tabela `relatorios_fome` (id, municipio_id, qtd_familias_risco, nivel_gravidade, periodo, created_at)
8. Tabela `recursos_san` (id, municipio_id, orcamento_total, orcamento_executado, ano)
9. Tabela `selos` (id, municipio_id, tipo enum, conquistado_em)
10. Relacionamentos e índices definidos
11. `prisma migrate dev` executa sem erros

---

#### Story 1.3: Seed Data — 497 Municípios do RS

**As a** dev,
**I want** um script de seed que popula o banco com os 497 municípios do RS com nome, código IBGE, região, e dados simulados realistas,
**so that** o dashboard tem dados para exibir desde o primeiro run.

**Acceptance Criteria:**
1. Script `prisma/seed.ts` criado
2. JSON/CSV com 497 municípios do RS (nome, código IBGE, região)
3. Cada município recebe: status conselho (71% ativo, 17% atrasado, 12% inativo), famílias em risco (100-5000), orçamento SAN (simulado)
4. Pelo menos 10 municípios reais com nome correto (Porto Alegre, Caxias do Sul, Pelotas, Santa Maria, Uruguaiana, Passo Fundo, Rio Grande, São Leopoldo, Novo Hamburgo, Bento Gonçalves)
5. `npx prisma db seed` executa sem erros
6. Query no banco confirma 497 registros na tabela municipios

---

#### Story 1.4: Layout Base com Sidebar e KPIs

**As a** gestor do CONSEA-RS,
**I want** um layout fixo com sidebar de navegação e barra de KPIs no topo,
**so that** eu tenho acesso rápido a todas as funcionalidades e vejo os números principais em qualquer tela.

**Acceptance Criteria:**
1. Sidebar colapsável com links: Mapa RS, Ranking, Alertas, Novo Relatório, Gestão CONSEA
2. Badge de contador de alertas (número de inativos) ao lado do link "Alertas"
3. Top bar com 3 KPI cards: Conselhos Ativos (%), Famílias em Risco (número), Orçamento SAN (R$ executado / total)
4. KPIs buscam dados da API `GET /api/dashboard/stats`
5. Layout responsivo até 1280px mínimo
6. Footer da sidebar com botão "Recolher"

---

#### Story 1.5: Tela de Login e Autenticação

**As a** usuário interno do sistema,
**I want** acessar a plataforma por uma tela de login com autenticação,
**so that** apenas perfis autorizados consigam entrar nas áreas restritas e o sistema aplique permissões corretamente.

**Acceptance Criteria:**
1. Tela `/login` com campos de credencial e ação de entrar
2. Backend com endpoint de autenticação para validar credenciais
3. Sessão persistida com proteção das rotas internas
4. Redirecionamento pós-login conforme perfil (gestor estadual, gestor municipal, conselheiro)
5. Mensagem clara para credenciais inválidas
6. Logout disponível no layout autenticado

---

### Epic 2: Dashboard do Estado (Visão Macro)

**Objetivo:** Construir a visão executiva do gestor estadual — mapa choropleth real do RS, ranking de municípios por Índice Antifome, e sistema de alertas. O mapa é a peça central: cada município é colorido por status, e o clique navega para o detalhe.

---

#### Story 2.1: API REST — Dashboard Stats

**As a** frontend,
**I want** um endpoint `GET /api/dashboard/stats` que retorna os KPIs globais,
**so that** o dashboard exibe informações consolidadas de todos os municípios.

**Acceptance Criteria:**
1. Endpoint retorna: `conselhosAtivos` (count + percentage), `familiasEmRisco` (total), `orcamentoTotal`, `orcamentoExecutado`
2. Cálculo de conselhos ativos: `count(status === 'ATIVO') / total * 100`
3. Resposta em < 200ms
4. Tratamento de erro (500) com mensagem clara

---

#### Story 2.2: API REST — Mapa GeoJSON

**As a** frontend,
**I want** um endpoint `GET /api/mapa` que retorna o GeoJSON dos 497 municípios do RS com status e score,
**so that** o mapa renderiza cada polígono com a cor correta.

**Acceptance Criteria:**
1. Endpoint retorna FeatureCollection GeoJSON
2. Cada Feature tem propriedades: `municipioId`, `nome`, `ibgeCode`, `regiao`, `status`, `indiceAntifome`, `familiasEmRisco`
3. Geometria vem do arquivo GeoJSON estático do IBGE (importado no seed ou em arquivo separado)
4. Resposta em < 500ms (cache de geometria em memória)

---

#### Story 2.3: Mapa Interativo do RS (Leaflet) com Camadas

**As a** gestor do CONSEA-RS,
**I want** um mapa interativo do RS com os 497 municípios coloridos por status e camadas de indicadores,
**so that** eu visualizo de imediato quais municípios precisam de atenção e onde a fome é mais grave.

**Acceptance Criteria:**
1. Mapa renderizado com react-leaflet ocupando área principal
2. **Camada base:** Polígonos dos municípios coloridos por status (verde=ativo, amarelo=atrasado, vermelho=inativo)
3. **Camada IAG:** Mapa de calor (heatmap) vermelho semi-transparente sobre municípios com alta insegurança alimentar grave
4. **Camada Cozinhas Solidárias:** Marcadores/pins no mapa mostrando localização das cozinhas
5. **Camada PPSAN:** Marcadores/pins mostrando Pontos Populares de SAN
6. Tooltip ao hover: nome do município, status, famílias em risco, Índice Antifome, adesão SISAN
7. Clique no município → navega para `/municipios/[id]`
8. Controles de zoom (+/-) e layer toggle (ativar/desativar cada camada)
9. Filtros por: status (checkboxes), região (dropdown)
10. Legenda fixa no canto (verde/amarelo/vermelho + camadas)
11. Mapa carrega em < 3 segundos

---

#### Story 2.4: Ranking de Municípios

**As a** gestor do CONSEA-RS,
**I want** uma tabela completa dos 497 municípios ordenável por Índice Antifome,
**so that** eu identifico os municípios críticos e os que estão performando bem.

**Acceptance Criteria:**
1. Tabela com colunas: #, Município, Região, Status (badge), Famílias em Risco, Índice Antifome
2. Ordenação por qualquer coluna (clicar no header)
3. Busca por nome do município (input de filtro)
4. Filtro por status e região
5. Paginação ou infinite scroll (mínimo 20 visíveis por vez)
6. Clique no nome → navega para `/municipios/[id]`
7. Status com badge colorido (verde/amarelo/vermelho)

---

#### Story 2.5: Alertas de Inatividade

**As a** gestor do CONSEA-RS,
**I want** uma lista de conselhos inativos e atrasados com data da última ata e famílias em risco,
**so that** eu priorizo quais municípios notificar primeiro.

**Acceptance Criteria:**
1. Seção "Conselhos Inativos" — lista com: município, região, última ata, famílias em risco, botão "Quebrar Silêncio"
2. Seção "Conselhos em Atraso" — lista com: município, região, data da última ata
3. Badge com contador total de inativos (ex: "65")
4. Botão "Quebrar Silêncio" abre modal de confirmação (simulação)
5. Botão "Verificar Gargalos" no banner alerta (scroll para a seção)
6. Banner alerta no topo: "SILÊNCIO ADMINISTRATIVO DETECTADO: X municípios não enviaram atas nos últimos 30 dias. Y famílias em risco."

---

### Epic 3: Portal do Conselho Municipal

**Objetivo:** Construir a interface para o conselheiro municipal gerenciar seu conselho — cadastro de membros, registro de reuniões, envio de atas, e visualização de status/progresso para alcançar selos SAN.

---

#### Story 3.1: Login e Acesso ao Portal do Conselho

**As a** conselheiro municipal,
**I want** entrar no sistema com minhas credenciais e acessar o portal do meu município,
**so that** eu gerencio as atividades do conselho com segurança e permissões adequadas.

**Acceptance Criteria:**
1. Usuário autenticado acessa `/conselho` apenas se tiver perfil autorizado
2. Após login, o sistema identifica o município vinculado ao usuário
3. Header do portal mostra: nome do município, status atual, Índice Antifome
4. Barra de progresso para o próximo selo (ex: "Faltam 2 reuniões para o selo Bronze")
5. Tentativas de acesso sem autenticação redirecionam para `/login`

---

#### Story 3.2: Cadastro de Membros do Conselho

**As a** conselheiro municipal,
**I want** cadastrar e gerenciar os membros do meu conselho,
**so that** o conselho está vivo no sistema e conta para o cálculo de engajamento.

**Acceptance Criteria:**
1. Form de cadastro: nome completo, cargo (Presidente/Vice/Membro/Secretário), contato (telefone/email)
2. Lista de membros cadastrados com opção de editar/remover
3. Mínimo de 1 presidente obrigatório
4. Contador de membros visível (ex: "7 membros cadastrados")
5. Dados persistidos no banco via `POST /api/conselhos/[id]/membro`

---

#### Story 3.3: Registro de Reuniões e Envio de Atas

**As a** conselheiro municipal,
**I want** registrar reuniões realizadas e anexar atas,
**so that** meu município mantém o conselho ativo e acumula pontos no Índice Antifome.

**Acceptance Criteria:**
1. Form de reunião: data, descrição da pauta, lista de membros presentes (checkbox)
2. Opção de anexar ata (upload de arquivo ou texto descritivo para MVP)
3. Lista de reuniões passadas com data, pauta, e link da ata
4. Após registrar reunião → status do conselho atualiza automaticamente
5. Dados persistidos via `POST /api/conselhos/[id]/reuniao`

---

#### Story 3.4: Visualização de Status e Progresso do Município

**As a** conselheiro municipal,
**I want** ver o status completo do meu município com barra de progresso para o próximo selo,
**so that** eu entendo o que preciso fazer para melhorar minha posição no ranking.

**Acceptance Criteria:**
1. Dashboard do município: conselhos ativos, famílias em risco, orçamento SAN alocado
2. Status SISAN (Aderido/Em processo/Não aderido), CAISAN (Ativo/Em formação/Não criado), Plano Municipal SAN (Elaborado/Em elaboração/Não iniciado)
3. Barra de progresso para selo seguinte (ex: 7/10 reuniões para selo Prata)
4. Lista de selos conquistados com data
5. Posição no ranking geral (ex: "147º de 497")
6. Gráfico simples de reuniões por mês (últimos 6 meses)

---

#### Story 3.5: Repositório de Documentos

**As a** gestor municipal ou conselheiro,
**I want** acessar um repositório de documentos com leis, decretos e modelos para download,
**so that** eu tenho os documentos necessários para formalizar o conselho e aderir ao SISAN.

**Acceptance Criteria:**
1. Lista de documentos categorizados: Leis, Decretos, Termos de Compromisso, Modelos
2. Cada documento com: título, descrição, data de upload, formato (PDF/DOC)
3. Botão de download para cada documento
4. Funcionalidade de upload de documentos pelos municípios (leis municipais, atas)
5. Busca por nome do documento
6. API: `GET /api/documentos` e `POST /api/documentos`

---

### Epic 4: Gestão CONSEA e Extras

**Objetivo:** Implementar a aba informativa do CONSEA-RS, a página de detalhe do município, o simulador de impacto, e finalizar o polish visual para apresentação do hackathon.

---

#### Story 4.1: Página de Detalhe do Município

**As a** gestor ou conselheiro,
**I want** uma página completa com todas as informações de um município,
**so that** eu tenho contexto total ao tomar decisões.

**Acceptance Criteria:**
1. Header com: nome, código IBGE, região, status do conselho
2. Seção "Conselho": data de criação, último relatório, total de reuniões
3. Seção "Membros": lista de conselheiros com cargo e contato
4. Seção "Recursos SAN": orçamento total vs. executado (barra de progresso)
5. Seção "Histórico": últimas reuniões e atas
6. Indicadores: Índice Antifome destacado, famílias em risco
7. Link "Voltar" para o mapa

---

#### Story 4.2: Gestão CONSEA (Aba Informativa)

**As a** usuário do sistema,
**I want** uma página informativa sobre o CONSEA-RS com missão, contato e guia de criação de conselhos,
**so that** eu entendo o contexto e facilito a adesão municipal.

**Acceptance Criteria:**
1. Descrição do CONSEA-RS e sua missão
2. Informações de contato (telefone, email, Instagram, endereço)
3. Seção "Como criar um conselho municipal" — guia passo a passo
4. Links úteis: SISAN, CadÚnico, Portal da Transparência, IBGE
5. Informação sobre as 3 esferas: municipal, estadual, nacional

---

#### Story 4.3: Simulador de Impacto

**As a** gestor do CONSEA-RS,
**I want** um simulador que mostra como mudanças na eficiência impactam famílias atendidas,
**so that** eu consigo comunicar o valor do Antifome no pitch.

**Acceptance Criteria:**
1. Input: slider de "Eficiência de Alocação" (50% a 100%)
2. Cálculo: "Se a eficiência aumentar X%, são Y mil famílias a mais atendidas sem gastar um real extra"
3. Fórmula visível: "1.294.950 famílias × X% = Y famílias atendidas"
4. Destaque visual para o número (grande, verde)
5. Presente no dashboard principal ou como modal

---

#### Story 4.4: Polish Visual e Data do Mapa

**As a** dev,
**I want** aplicar o design system final e garantir que o mapa tem geometria real dos 497 municípios,
**so that** o produto fica profissional e a demonstração é impactante.

**Acceptance Criteria:**
1. Todas as páginas seguem o design system (cores, tipografia, spacing)
2. Mapa com geometria real do RS (GeoJSON do IBGE com 497 polígonos)
3. Transições suaves entre telas
4. Loading states para dados carregando (skeleton)
5. Favicon e título "Antifome RS"
6. Banner de alerta funcional e visível

---

## 7. Checklist Results Report

| Verificação | Status |
|-------------|--------|
| Todos os FR (1-20) cobertos por stories? | ✅ Sim |
| Todos os NFR (1-11) cobertos? | ✅ Sim |
| Usuários-alvo definidos? | ✅ 4 personas (Gestor Estadual, Gestor Municipal, Conselheiro, Sociedade Civil) |
| Critérios de sucesso definidos? | ✅ 8 critérios para o hackathon |
| Escopo factível em 15h? | ⚠️ Apertado — Epics 3-4 são stretch |
| Fórmula do Índice Antifome testada? | ✅ Normalizada (0-10) |
| Arquitetura (Next.js + NestJS) definida? | ✅ Sim |
| Dados do IBGE confirmados? | ✅ 497 municípios + GeoJSON reais (testados) |
| Branding definido? | ✅ Paleta Verde Petróleo/Vermelho Urgência + Roboto |
| LGPD/Privacidade contemplada? | ✅ NFR8-10 |
| APIs públicas mapeadas? | ✅ IBGE, Cozinhas RS, Transparência, Dados.gov.br |

---

## 8. Next Steps

### UX Expert Prompt
> "Crie a interface da Plataforma Antifome RS — dashboard governamental com mapa choropleth do RS, sidebar azul escura, KPI cards brancos com sombra. Foco em clareza executiva: gestor vê o mapa e entende a situação em 5 segundos. Paleta: azul #1E3A5F, verde #22C55E, amarelo #F59E0B, vermelho #EF4444. Tipografia Inter. Usar shadcn/ui + Tailwind."

### Architect Prompt
> "Projete a arquitetura técnica da Plataforma Antifome RS — Frontend: Next.js 14 App Router + Tailwind + Roboto + shadcn/ui + Leaflet. Backend: NestJS com modules (Auth, Municipios, Conselhos, Reuniões, Membros, Dashboard, Mapa, Documentos, Cozinhas, Notificacoes). Banco: Prisma + PostgreSQL. Schema normalizado para multi-estado (estados → municipios → conselhos → CAISAN). Indicadores: Índice Antifome, IAG, status SISAN/COMSEA/CAISAN/Plano SAN, Cozinhas Solidárias, PPSAN. Seed via API do IBGE (497 municípios + GeoJSON). API REST: /api/auth/login, /api/auth/logout, /api/dashboard/stats, /api/mapa/geojson, /api/municipios, /api/municipios/:id/sisan, /api/municipios/:id/cozinhas, /api/municipios/:id/ppsan, /api/ranking, /api/conselhos/:id/membro, /api/conselhos/:id/reuniao, /api/documentos. RBAC com perfis (gestor-estadual, gestor-municipal, conselheiro, sociedade-civil). LGPD: anonimização de CPFs. Branding: paleta #1A2F23/#B71C1C."
