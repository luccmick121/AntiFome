"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { BreadcrumbItem, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { DsInfoBlock, DsPageIntro, DsPanel } from "@/components/design-system/primitives";
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
import { Divider } from "@/components/ui/divider";
import { Input } from "@/components/ui/input";
import { Calendar, RangeCalendar } from "@/components/ui/calendar";
import { DateInput, TimeInput } from "@/components/ui/date-input";
import { Menu, MenuItem, MenuSection } from "@/components/ui/menu";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@/components/ui/navbar";
import { Pagination } from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Select, SelectItem } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, Tab } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/toast";

const wrapperRows = [
  { name: "Button", base: "HeroUI Button", status: "Wrapper pronto" },
  { name: "Badge", base: "HeroUI Chip", status: "Wrapper pronto" },
  { name: "Card", base: "HeroUI Card", status: "Wrapper pronto" },
  { name: "Input", base: "HeroUI Input", status: "Wrapper pronto" },
  { name: "Dialog", base: "HeroUI Modal", status: "Wrapper pronto" },
  { name: "Select", base: "HeroUI Select", status: "Wrapper pronto" },
  { name: "Table", base: "HeroUI Table", status: "Wrapper pronto" },
  { name: "Tabs", base: "HeroUI Tabs", status: "Wrapper pronto" },
  { name: "DateInput", base: "HeroUI DateInput", status: "Wrapper pronto" },
  { name: "TimeInput", base: "HeroUI TimeInput", status: "Wrapper pronto" },
  { name: "Calendar", base: "HeroUI Calendar", status: "Wrapper pronto" },
  { name: "RangeCalendar", base: "HeroUI RangeCalendar", status: "Wrapper pronto" },
  { name: "Menu", base: "HeroUI Menu", status: "Wrapper pronto" },
  { name: "Navbar", base: "HeroUI Navbar", status: "Wrapper pronto" },
];

export default function DesignSystemComponentsPage() {
  const { toast } = useToast();
  const [contactName, setContactName] = useState("");

  return (
    <div className="space-y-8">
      <DsPageIntro
        eyebrow="Componentes"
        title="Playground de wrappers e catálogo operacional"
        description="Todo componente usado pelo produto deve nascer desta camada. O objetivo é encapsular HeroUI com tokens, densidade e semântica do Antifome RS."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
        <DsPanel eyebrow="Playground" title="Blocos principais" description="Use este espaço para revisar densidade, variantes e estado inicial dos wrappers.">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primário</Button>
              <Button variant="outline">Secundário</Button>
              <Button variant="success">Sucesso</Button>
              <Button variant="warning">Aviso</Button>
              <Button variant="urgency">Urgência</Button>
              <Button variant="ghost">Ghost</Button>
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
              <Select label="Status" labelPlacement="outside" placeholder="Selecione um status">
                <SelectItem key="ativo">Ativo</SelectItem>
                <SelectItem key="atencao">Em atenção</SelectItem>
                <SelectItem key="critico">Crítico</SelectItem>
              </Select>
            </div>

            <Textarea
              label="Observação institucional"
              labelPlacement="outside"
              placeholder="Descreva contexto, risco e encaminhamento."
              minRows={4}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <DateInput label="Data base" labelPlacement="outside" />
              <TimeInput label="Horário limite" labelPlacement="outside" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="mb-4 text-sm uppercase tracking-[0.12em] text-foreground-500">Calendar</p>
                <Calendar aria-label="Calendário institucional" />
              </div>
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="mb-4 text-sm uppercase tracking-[0.12em] text-foreground-500">RangeCalendar</p>
                <RangeCalendar aria-label="Calendário de intervalo" visibleMonths={2} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Aderência ao SISAN</p>
                <p className="mt-3 font-display text-3xl font-semibold text-foreground">74%</p>
                <Progress value={74} color="success" className="mt-4" aria-label="Aderência ao SISAN" />
              </div>

              <div className="flex items-end gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Abrir modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirmar ação</DialogTitle>
                      <DialogDescription>Fluxo de confirmação para ações sensíveis ou rápidas.</DialogDescription>
                    </DialogHeader>
                    <DialogBody>
                      <p className="text-sm text-foreground-500">
                        Toda confirmação deve ser curta, explícita e contextual.
                      </p>
                    </DialogBody>
                    <DialogFooter>
                      <Button variant="ghost">Cancelar</Button>
                      <Button onPress={() => toast("sucesso", "Ação confirmada com sucesso.")}>Confirmar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button variant="success" onPress={() => toast("sucesso", "Toast disparado pelo design system.")}>
                  Testar toast
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Breadcrumbs aria-label="Exemplo de breadcrumb">
                <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
                <BreadcrumbItem href="#">Governança</BreadcrumbItem>
                <BreadcrumbItem>Componentes</BreadcrumbItem>
              </Breadcrumbs>
              <Tooltip content="Ajuda contextual breve">
                <Button variant="outline" size="sm">
                  Tooltip
                </Button>
              </Tooltip>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>

            <div className="flex justify-center rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Pagination page={2} total={6} color="primary" />
            </div>

            <div className="flex justify-center rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
              <Spinner label="Sincronizando catálogo" />
            </div>

            <Tabs aria-label="Abas de exemplo" selectedKey="wrappers" classNames={{ panel: "pt-4" }}>
              <Tab key="wrappers" title="Wrappers">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4 text-sm text-foreground-500">
                  Encapsule HeroUI antes de usar direto em páginas de negócio.
                </div>
              </Tab>
              <Tab key="guidelines" title="Guidelines">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4 text-sm text-foreground-500">
                  Componentes novos precisam nascer com variante, estado e densidade definidos.
                </div>
              </Tab>
            </Tabs>

            <div className="space-y-4">
              <Navbar>
                <NavbarBrand>
                  <div className="rounded-md bg-primary/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    Antifome RS
                  </div>
                </NavbarBrand>
                <NavbarContent justify="end">
                  <NavbarItem className="font-medium text-foreground">Painel executivo</NavbarItem>
                  <NavbarItem>Municípios</NavbarItem>
                  <NavbarItem>Conselhos</NavbarItem>
                </NavbarContent>
              </Navbar>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)]">
                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-4">
                  <p className="text-sm uppercase tracking-[0.12em] text-foreground-500">Uso recomendado</p>
                  <p className="mt-3 text-sm text-foreground-600">
                    `Navbar` serve para shells horizontais, áreas de laboratório e páginas públicas.
                    `Menu` funciona bem como agrupador de ações institucionais, atalhos e contextos
                    laterais compactos.
                  </p>
                </div>

                <div className="rounded-lg border border-default-200 bg-[#F8FAFC] p-3">
                  <Menu aria-label="Menu institucional">
                    <MenuSection title="Ações rápidas">
                      <MenuItem key="ranking">Abrir ranking estadual</MenuItem>
                      <MenuItem key="alertas">Ver alertas críticos</MenuItem>
                    </MenuSection>
                    <MenuSection title="Governança">
                      <MenuItem key="atas">Revisar atas pendentes</MenuItem>
                      <MenuItem key="documentos">Atualizar documentos</MenuItem>
                    </MenuSection>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </DsPanel>

        <DsPanel eyebrow="Inventário" title="Wrappers locais">
          <Table removeWrapper aria-label="Inventário de wrappers locais">
            <TableHeader>
              <TableColumn>COMPONENTE</TableColumn>
              <TableColumn>BASE</TableColumn>
              <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody items={wrapperRows}>
              {(row) => (
                <TableRow key={row.name}>
                  <TableCell className="font-medium text-foreground">{row.name}</TableCell>
                  <TableCell>{row.base}</TableCell>
                  <TableCell>
                    <Badge variant="success">{row.status}</Badge>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="mt-4 space-y-3">
            <DsInfoBlock title="Regra principal" description="HeroUI direto só entra no projeto quando ainda não existe wrapper local equivalente." />
            <DsInfoBlock title="Critério de promoção" description="Componentes usados em duas ou mais telas devem migrar para components/ui." />
          </div>
        </DsPanel>
      </div>
    </div>
  );
}
