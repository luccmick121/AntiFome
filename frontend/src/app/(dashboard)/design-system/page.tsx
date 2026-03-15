"use client";

import { type ComponentType, useMemo, useState } from "react";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectItem } from "@/components/ui/select";
import { Snippet } from "@/components/ui/snippet";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, Tab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/toast";
import { Tooltip } from "@/components/ui/tooltip";
import {
  colorTokens,
  componentPatterns,
  designPrinciples,
  radiusScale,
  shadowScale,
  spacingScale,
  typographyScale,
} from "@/lib/design-tokens";
import {
  AlertTriangle,
  Blocks,
  BookOpen,
  CheckCircle2,
  Component,
  Gauge,
  Layers3,
  LayoutTemplate,
  MapPinned,
  Palette,
  ShieldCheck,
  Sparkles,
  SwatchBook,
} from "lucide-react";

type Tone = "success" | "warning" | "urgency";

const categoryCards = [
  {
    title: "Actions and Inputs",
    description: "Buttons, inputs, forms, textarea e controls para fluxos operacionais.",
    file: "docs/design-system/heroui/components/actions-and-inputs.md",
    count: 18,
    icon: Component,
  },
  {
    title: "Selection and Pickers",
    description: "Select, autocomplete, calendars e componentes de escolha estruturada.",
    file: "docs/design-system/heroui/components/selection-and-pickers.md",
    count: 18,
    icon: Layers3,
  },
  {
    title: "Navigation and Layout",
    description: "Cards, tabs, breadcrumbs e blocos de organizacao visual da interface.",
    file: "docs/design-system/heroui/components/navigation-and-layout.md",
    count: 12,
    icon: LayoutTemplate,
  },
  {
    title: "Data Display and Feedback",
    description: "Alertas, progresso, tabelas, chips e componentes de leitura de estado.",
    file: "docs/design-system/heroui/components/data-display-and-feedback.md",
    count: 15,
    icon: Gauge,
  },
  {
    title: "Overlays and Utilities",
    description: "Modais, toasts, tooltip, popovers e blocos auxiliares de interacao.",
    file: "docs/design-system/heroui/components/overlays-and-utilities.md",
    count: 12,
    icon: Sparkles,
  },
];

const wrapperRows = [
  { name: "Button", base: "HeroUI Button", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Badge", base: "HeroUI Chip", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Card", base: "HeroUI Card", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Input", base: "HeroUI Input", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Dialog", base: "HeroUI Modal", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Toast", base: "HeroUI Toast", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Select", base: "HeroUI Select", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Progress", base: "HeroUI Progress", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Table", base: "HeroUI Table", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Textarea", base: "HeroUI Textarea", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Tabs", base: "HeroUI Tabs", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Pagination", base: "HeroUI Pagination", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Divider", base: "HeroUI Divider", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Snippet", base: "HeroUI Snippet", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Spinner", base: "HeroUI Spinner", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Tooltip", base: "HeroUI Tooltip", status: "Wrapper pronto", tone: "success" as Tone },
  { name: "Breadcrumbs", base: "HeroUI Breadcrumbs", status: "Wrapper pronto", tone: "success" as Tone },
];

const docsEntries = [
  "docs/design-system/heroui/README.md",
  "docs/design-system/heroui/overview.md",
  "docs/design-system/heroui/setup-nextjs.md",
  "docs/design-system/heroui/theming-and-tokens.md",
  "docs/design-system/heroui/all-components.md",
  "docs/design-system/heroui/guidelines.md",
  "docs/design-system/heroui/component-index.md",
  "docs/design-system/heroui/project-mapping.md",
  "docs/design-system/heroui/official-references.md",
];

const sectionNav = [
  { id: "overview", label: "Visão geral", detail: "Hero, objetivos e resumo executivo." },
  { id: "foundations", label: "Foundations", detail: "Cores, tipografia, spacing, raio e sombras." },
  { id: "components", label: "Componentes", detail: "Playground, catálogo e wrappers locais." },
  { id: "states", label: "Estados", detail: "Loading, vazio, sucesso, aviso e risco crítico." },
  { id: "governance", label: "Governança", detail: "Guidelines, do e don't, snippets e critérios." },
];

const operationalStates = [
  {
    title: "Sucesso operacional",
    description: "Use quando o fluxo terminou e o próximo passo está claro.",
    tone: "success" as const,
    helper: "Bom para confirmações, consolidação de dados e publicação concluída.",
  },
  {
    title: "Atenção tática",
    description: "Use para pendências que ainda podem ser resolvidas sem escalar crise.",
    tone: "warning" as const,
    helper: "Bom para atrasos, revisões documentais e dados parcialmente válidos.",
  },
  {
    title: "Risco crítico",
    description: "Use apenas quando houver urgência real, interrupção ou não conformidade grave.",
    tone: "urgency" as const,
    helper: "Bom para suspensão, inatividade prolongada e bloqueios institucionais.",
  },
];

const governanceChecklist = [
  "Toda tela precisa explicar o que está acontecendo em até 5 segundos.",
  "Ação primária sempre visível acima da dobra nas telas principais.",
  "Estados crítico e urgente só aparecem quando a consequência é real.",
  "Dados tabulares devem ter leitura escaneável e badges consistentes.",
  "Componentes novos devem nascer como wrapper local antes do uso amplo.",
];

const dosDonts = [
  {
    title: "Faça",
    items: [
      "Use wrappers locais para preservar tokens e variantes.",
      "Mantenha densidade executiva com blocos claros e títulos objetivos.",
      "Use superfícies sólidas e contraste alto para leitura institucional.",
    ],
  },
  {
    title: "Evite",
    items: [
      "Aplicar transparência forte em painéis principais e cards de conteúdo.",
      "Misturar sem critério danger, warning e success na mesma área.",
      "Criar páginas sem estado vazio, loading e mensagem de orientação.",
    ],
  },
];

const tableRows = [
  {
    municipio: "Porto Alegre",
    status: "Ativo",
    risco: "Baixo",
    adesao: "Aderido",
  },
  {
    municipio: "Pelotas",
    status: "Em atenção",
    risco: "Moderado",
    adesao: "Em processo",
  },
  {
    municipio: "Uruguaiana",
    status: "Inativo",
    risco: "Crítico",
    adesao: "Não aderido",
  },
];

function toneToBadgeVariant(tone: Tone) {
  if (tone === "success") {
    return "success" as const;
  }

  if (tone === "urgency") {
    return "urgency" as const;
  }

  return "warning" as const;
}

function statusToBadge(status: string) {
  if (status === "Ativo") {
    return "success" as const;
  }

  if (status === "Inativo") {
    return "urgency" as const;
  }

  return "warning" as const;
}

export default function DesignSystemPage() {
  const { toast } = useToast();
  const [selectedDoc, setSelectedDoc] = useState(docsEntries[0]);
  const [componentFilter, setComponentFilter] = useState("all");
  const [contactName, setContactName] = useState("");

  const filteredWrappers = useMemo(() => {
    if (componentFilter === "all") {
      return wrapperRows;
    }

    return wrapperRows.filter((item) => {
      if (componentFilter === "ready") {
        return item.status === "Wrapper pronto";
      }

      if (componentFilter === "direct") {
        return item.status === "Uso direto";
      }

      return item.status === "Boa candidata a wrapper";
    });
  }, [componentFilter]);

  return (
    <div className="page-shell space-y-8">
      <section
        id="overview"
        className="institutional-hero overflow-hidden rounded-[var(--radius-lg)] border-none px-6 py-8 text-white shadow-[0_24px_50px_rgba(16,24,40,0.22)] md:px-8 md:py-10"
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.85fr)]">
          <div className="relative z-10 space-y-5">
            <Badge className="border border-white/15 bg-white/12 text-white">
              HeroUI Lab do Antifome RS
            </Badge>
            <div className="space-y-3">
              <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight md:text-5xl">
                Biblioteca visual do HeroUI adaptada para um sistema governamental claro, técnico e replicável.
              </h1>
              <p className="max-w-3xl text-base text-white/88 md:text-lg">
                Esta tela conecta a documentação oficial do HeroUI, os wrappers locais do projeto
                e os padrões de interface que o time precisa seguir para construir novas telas com
                velocidade e consistência.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#components">Abrir playground</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/12 text-white hover:bg-white/18"
              >
                <a href="#governance">Abrir guia visual</a>
              </Button>
              <Button asChild size="lg" variant="urgency">
                <a href="#states">Ver estados críticos</a>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <HeroFact label="Biblioteca local" value="14 arquivos" />
              <HeroFact label="Categorias mapeadas" value="5 blocos" />
              <HeroFact label="Catálogo oficial" value="70 componentes" />
              <HeroFact label="Wrappers locais" value="15 itens" />
            </div>
          </div>

          <Card className="border-default-300 bg-white">
            <CardHeader>
              <CardDescription>Direcao do sistema</CardDescription>
              <CardTitle>Princípios de design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {designPrinciples.map((principle) => (
                <div
                  key={principle}
                  className="flex gap-3 rounded-lg border border-default-200 bg-[#F8FAFC] p-4"
                >
                  <MapPinned className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-foreground-600">{principle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        <SummaryCard
          icon={BookOpen}
          title="Documentação"
          value="HeroUI + projeto"
          subtitle="Overview, setup, guidelines, índice e referências oficiais"
        />
        <SummaryCard
          icon={SwatchBook}
          title="Foundations"
          value="Tokens"
          subtitle="Cores, tipografia, spacing, radius e shadow alinhados ao produto"
        />
        <SummaryCard
          icon={Blocks}
          title="Catálogo"
          value="Todos os blocos"
          subtitle="Categorias que ajudam a escolher o componente certo mais rápido"
        />
        <SummaryCard
          icon={ShieldCheck}
          title="Padrão local"
          value="Wrappers"
          subtitle="Mapeamento do HeroUI oficial para uso real no Antifome RS"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <Card className="border-default-300 xl:sticky xl:top-6 xl:self-start">
          <CardHeader>
            <CardDescription>Navegação do design system</CardDescription>
            <CardTitle>Índice operacional</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sectionNav.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block rounded-lg border border-default-200 bg-[#F8FAFC] px-4 py-3 hover:border-primary/30 hover:bg-white"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-foreground-500">
                  Seção {index + 1}
                </p>
                <p className="mt-1 font-medium text-foreground">{item.label}</p>
                <p className="mt-1 text-sm text-foreground-500">{item.detail}</p>
              </a>
            ))}
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Governança imediata</CardDescription>
            <CardTitle>Checklist de pronto para novas telas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {governanceChecklist.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-lg border border-default-200 bg-[#F8FAFC] p-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                <p className="text-sm text-foreground-600">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section
        id="foundations"
        className="grid gap-6 xl:grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)]"
      >
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Foundations</CardDescription>
            <CardTitle>Paleta institucional</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {colorTokens.map((token) => (
              <div key={token.name} className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <div className={`h-24 rounded-lg shadow-inner ${token.className}`} />
                <div className="mt-4 space-y-1">
                  <p className="font-medium text-foreground">{token.name}</p>
                  <p className="font-mono text-sm text-foreground-500">{token.value}</p>
                  <p className="text-sm text-foreground-500">{token.usage}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Foundations</CardDescription>
            <CardTitle>Tipografia e escala</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {typographyScale.map((item) => (
              <div key={item.token} className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-foreground-500">
                  {item.token}
                </p>
                <p className={item.className}>{item.preview}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>System scale</CardDescription>
            <CardTitle>Spacing, raio e sombras</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-3">
            <ScaleList title="Spacing" items={spacingScale} />
            <ScaleList title="Raio" items={radiusScale} />
            <ScaleList title="Sombras" items={shadowScale} />
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Patterns</CardDescription>
            <CardTitle>Composição recomendada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {componentPatterns.map((pattern) => (
              <div key={pattern.title} className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="font-medium text-foreground">{pattern.title}</p>
                <p className="mt-2 text-sm text-foreground-500">{pattern.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section
        id="components"
        className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]"
      >
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Components</CardDescription>
            <CardTitle>Playground dos wrappers locais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primário</Button>
              <Button variant="outline">Secundário</Button>
              <Button variant="success">Sucesso</Button>
              <Button variant="warning">Aviso</Button>
              <Button variant="urgency">Urgência</Button>
              <Button variant="ghost">Ghost</Button>
            </div>

            <Divider />

            <div className="flex flex-wrap gap-3">
              <Badge>Ativo</Badge>
              <Badge variant="success">Aderido</Badge>
              <Badge variant="warning">Em processo</Badge>
              <Badge variant="urgency">Crítico</Badge>
              <Badge variant="outline">Informativo</Badge>
            </div>

            <Divider />

            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Município"
                labelPlacement="outside"
                placeholder="Ex.: Pelotas"
                value={contactName}
                onValueChange={setContactName}
              />
              <Input
                label="Contato responsável"
                labelPlacement="outside"
                placeholder="nome@consea.rs.gov.br"
              />
            </div>

            <Textarea
              label="Observação institucional"
              labelPlacement="outside"
              placeholder="Descreva contexto, risco, pendência documental ou decisão da reunião."
              minRows={4}
            />

            <Divider />

            <div className="grid gap-4 md:grid-cols-2">
              <Alert>
                <AlertTitle>Informação operacional</AlertTitle>
                <AlertDescription>
                  Use alertas curtos para orientar o gestor sem poluir a tela.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Risco crítico</AlertTitle>
                <AlertDescription>
                  Conselhos suspensos exigem ação e comunicação imediata.
                </AlertDescription>
              </Alert>
            </div>

            <AlertBanner
              tipo="info"
              titulo="Banner contextual"
              mensagem="Bom para chamadas de atenção de produto, onboarding ou aviso operacional."
            />

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">
                  Progresso de adesão ao SISAN
                </p>
                <p className="mt-3 font-display text-3xl font-semibold text-foreground">74%</p>
                <Progress
                  value={74}
                  color="success"
                  className="mt-4"
                  aria-label="Meta de adesão ao SISAN"
                />
              </div>

              <div className="flex items-end gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Exemplo de modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar ação</DialogTitle>
                      <DialogDescription>
                        Este wrapper local do Modal HeroUI mantém o visual institucional do projeto.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <p className="text-sm text-foreground-500">
                        Use este padrão para confirmações, edições rápidas e formulários curtos.
                      </p>
                    </DialogBody>
                    <DialogFooter>
                      <Button variant="ghost">Cancelar</Button>
                      <Button onPress={() => toast("sucesso", "Fluxo do modal validado com sucesso.")}>
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="success"
                  onPress={() => toast("sucesso", "Toast disparado pelo HeroUI Lab.")}
                >
                  Testar toast
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="flex justify-center rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Pagination page={2} total={6} color="primary" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Breadcrumbs aria-label="Exemplo de breadcrumb">
                <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
                <BreadcrumbItem href="#">Governança</BreadcrumbItem>
                <BreadcrumbItem>Design System</BreadcrumbItem>
              </Breadcrumbs>
              <Tooltip content="Ajuda contextual curta e não essencial">
                <Button variant="outline" size="sm">
                  Hover de exemplo
                </Button>
              </Tooltip>
            </div>

            <div className="flex justify-center rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Spinner label="Sincronizando dados do catálogo local" />
            </div>

            <Tabs
              aria-label="Exemplo de abas do design system"
              selectedKey="wrappers"
              classNames={{ panel: "pt-4" }}
            >
              <Tab key="wrappers" title="Wrappers">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4 text-sm text-foreground-500">
                  Use wrappers locais para preservar tokens, variantes e densidade institucional.
                </div>
              </Tab>
              <Tab key="catalogo" title="Catálogo">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4 text-sm text-foreground-500">
                  O catálogo mestre documenta os 70 componentes oficiais e orienta a adoção por prioridade.
                </div>
              </Tab>
              <Tab key="guidelines" title="Guidelines">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4 text-sm text-foreground-500">
                  Cada tela deve ser explicável em segundos, com semântica clara e mínimo ruído visual.
                </div>
              </Tab>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Components</CardDescription>
            <CardTitle>Catálogo oficial por categoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryCards.map((category) => {
              const Icon = category.icon;

              return (
                <div key={category.title} className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{category.title}</p>
                        <p className="mt-1 text-sm text-foreground-500">{category.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                  <p className="mt-3 font-mono text-xs text-foreground-500">{category.file}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

      <section id="states" className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Estados operacionais</CardDescription>
            <CardTitle>Matriz de feedback da interface</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {operationalStates.map((state) => (
              <div
                key={state.title}
                className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium text-foreground">{state.title}</p>
                    <p className="mt-1 text-sm text-foreground-500">{state.description}</p>
                  </div>
                  <Badge variant={toneToBadgeVariant(state.tone)}>
                    {state.tone === "success"
                      ? "Baixa fricção"
                      : state.tone === "warning"
                        ? "Atenção"
                        : "Escala imediata"}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-foreground-500">{state.helper}</p>
              </div>
            ))}

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Loading</p>
                <div className="mt-4 space-y-3">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Estado vazio</p>
                <p className="mt-4 font-medium text-foreground">Nenhum município filtrado</p>
                <p className="mt-2 text-sm text-foreground-500">
                  Ajuste filtros ou remova restrições para recuperar dados.
                </p>
              </div>
              <div className="rounded-lg border border-danger/20 bg-[#FFF1F1] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-danger">Erro crítico</p>
                <p className="mt-4 font-medium text-foreground">Falha ao sincronizar conselho</p>
                <p className="mt-2 text-sm text-foreground-500">
                  Repetir tentativa ou acionar suporte estadual.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Uso orientado</CardDescription>
            <CardTitle>Quando usar cada intensidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Guideline
              title="Success"
              description="Confirmação, status estável, avanço concluído e metas atingidas."
            />
            <Guideline
              title="Warning"
              description="Risco reversível, pendência, revisão e acompanhamento em aberto."
            />
            <Guideline
              title="Urgency"
              description="Falha operacional, suspensão, inatividade prolongada e decisão sensível."
            />
          </CardContent>
        </Card>
      </section>

      <section
        id="governance"
        className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]"
      >
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Project mapping</CardDescription>
            <CardTitle>Inventário de wrappers e adoção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-3">
              <Button variant={componentFilter === "all" ? "default" : "outline"} onPress={() => setComponentFilter("all")}>
                Todos
              </Button>
              <Button variant={componentFilter === "ready" ? "default" : "outline"} onPress={() => setComponentFilter("ready")}>
                Wrapper pronto
              </Button>
              <Button variant={componentFilter === "direct" ? "default" : "outline"} onPress={() => setComponentFilter("direct")}>
                Uso direto
              </Button>
              <Button variant={componentFilter === "candidate" ? "default" : "outline"} onPress={() => setComponentFilter("candidate")}>
                Boa candidata
              </Button>
            </div>

            <Table
              removeWrapper
              aria-label="Inventário de wrappers locais"
              classNames={{
                th: "bg-content2 text-foreground-500 uppercase tracking-[0.12em] text-xs",
                td: "py-4",
              }}
            >
              <TableHeader>
                <TableColumn>COMPONENTE</TableColumn>
                <TableColumn>BASE HEROUI</TableColumn>
                <TableColumn>STATUS</TableColumn>
              </TableHeader>
              <TableBody items={filteredWrappers}>
                {(row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                    <TableCell>{row.base}</TableCell>
                    <TableCell>
                      <Badge variant={toneToBadgeVariant(row.tone)}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Documentation</CardDescription>
            <CardTitle>Biblioteca local em Markdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select
              label="Documento"
              labelPlacement="outside"
              selectedKeys={[selectedDoc]}
              onSelectionChange={(keys) => {
                const first = Array.from(keys)[0];
                if (typeof first === "string") {
                  setSelectedDoc(first);
                }
              }}
            >
              {docsEntries.map((entry) => (
                <SelectItem key={entry}>{entry}</SelectItem>
              ))}
            </Select>

            <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">
                Arquivo selecionado
              </p>
              <Snippet hideSymbol copyButtonProps={{ size: "sm" }} className="mt-3">
                {selectedDoc}
              </Snippet>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Arquivos principais</p>
              {docsEntries.slice(0, 5).map((entry) => (
                <div key={entry} className="rounded-lg border border-default-200 bg-[#F8FAFC] px-3 py-2">
                  <p className="font-mono text-xs text-foreground-500">{entry}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Patterns</CardDescription>
            <CardTitle>Exemplo de listagem institucional</CardTitle>
          </CardHeader>
          <CardContent>
            <Table
              removeWrapper
              aria-label="Exemplo de tabela institucional"
              classNames={{
                th: "bg-content2 text-foreground-500 uppercase tracking-[0.12em] text-xs",
                td: "py-4",
              }}
            >
              <TableHeader>
                <TableColumn>MUNICÍPIO</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>RISCO</TableColumn>
                <TableColumn>ADESÃO</TableColumn>
              </TableHeader>
              <TableBody items={tableRows}>
                {(row) => (
                  <TableRow key={row.municipio}>
                    <TableCell className="font-medium text-foreground">{row.municipio}</TableCell>
                    <TableCell>
                      <Badge variant={statusToBadge(row.status)}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.risco}</TableCell>
                    <TableCell>{row.adesao}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-default-300">
          <CardHeader>
            <CardDescription>Guidelines</CardDescription>
            <CardTitle>Como usar o HeroUI no Antifome RS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dosDonts.map((block) => (
              <div key={block.title} className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">{block.title}</p>
                <div className="mt-3 space-y-3">
                  {block.items.map((item) => (
                    <div key={item} className="flex gap-3">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <p className="text-sm text-foreground-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Guideline
              title="Prefira wrapper local"
              description="Se o componente ja existe em components/ui, use o wrapper antes de importar HeroUI direto."
            />
            <Guideline
              title="Use tokens, nao estilos soltos"
              description="As cores e o radius institucionais devem nascer do tema e dos wrappers, nao de overrides espalhados."
            />
            <Guideline
              title="Danger e urgency com criterio"
              description="Estados criticos devem ser reservados para risco real, exclusao e acoes sensiveis."
            />
            <Guideline
              title="Toda tela deve ser explicavel"
              description="A banca precisa entender o componente, o dado e a acao em poucos segundos."
            />

            <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">
                Snippet recomendado
              </p>
              <Snippet hideSymbol className="mt-3">
                {"import { Button } from '@/components/ui/button';"}
              </Snippet>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/12 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <p className="text-xs uppercase tracking-[0.14em] text-white/70">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <Card className="overflow-hidden border-default-300">
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">{title}</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">{value}</p>
          <p className="mt-2 text-sm text-foreground-500">{subtitle}</p>
        </div>
        <div className="rounded-lg bg-[#F4F6F8] p-3">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}

function ScaleList({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<{ token: string; value: string }>;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item.token}
            className="flex items-center justify-between rounded-lg border border-default-200 bg-[#F8FAFC] px-3 py-2"
          >
            <span className="text-sm text-foreground">{item.token}</span>
            <span className="font-mono text-xs text-foreground-500">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Guideline({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary/10 p-2 text-primary">
          <Palette className="h-4 w-4" />
        </div>
        <p className="font-medium text-foreground">{title}</p>
      </div>
      <p className="mt-3 text-sm text-foreground-500">{description}</p>
    </div>
  );
}
