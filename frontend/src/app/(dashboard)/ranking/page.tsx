"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { Select, SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@/components/ui/table";
import { buildApiPath } from "@/lib/api";
import { Search, Trophy } from "lucide-react";

interface MunicipioRanking {
  posicao: number;
  id: string;
  codigo_ibge: string;
  nome: string;
  status: string;
  indice_antifome: number;
  populacao: number;
  selo_atual: string | null;
}

interface RankingResponse {
  data: MunicipioRanking[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const statusVariant: Record<string, "success" | "warning" | "urgency"> = {
  ATIVO: "success",
  ATRASADO: "warning",
  INATIVO: "urgency",
};

const seloIcons: Record<string, string> = {
  PLATINA: "PL",
  OURO: "OU",
  PRATA: "PR",
  BRONZE: "BR",
};

export default function RankingPage() {
  const router = useRouter();
  const [data, setData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("TODOS");
  const [page, setPage] = useState(1);

  const fetchRanking = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        orderBy: "indice_antifome",
        orderDir: "desc",
        ...(search && { search }),
        ...(status !== "TODOS" && { status }),
      });

      const response = await fetch(`${buildApiPath("/ranking")}?${params}`, {
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, status]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  const formatPopulacao = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  return (
    <div className="page-shell space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ranking de municípios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
            <Input
              placeholder="Buscar município"
              value={search}
              onValueChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              startContent={<Search className="h-4 w-4 text-foreground-400" />}
            />
            <Select
              label="Filtrar por status"
              labelPlacement="outside"
              selectedKeys={[status]}
              onSelectionChange={(keys) => {
                const nextValue = Array.from(keys)[0];
                setStatus(String(nextValue));
                setPage(1);
              }}
            >
              <SelectItem key="TODOS">Todos os status</SelectItem>
              <SelectItem key="ATIVO">Ativo</SelectItem>
              <SelectItem key="ATRASADO">Atrasado</SelectItem>
              <SelectItem key="INATIVO">Inativo</SelectItem>
            </Select>
          </div>

          <Table
            aria-label="Ranking dos municípios"
            removeWrapper
            selectionMode="none"
            classNames={{
              th: "bg-content2 text-foreground-500 uppercase tracking-[0.12em] text-xs",
              tr: "cursor-pointer",
            }}
          >
            <TableHeader>
              <TableColumn>POSIÇÃO</TableColumn>
              <TableColumn>MUNICÍPIO</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>ÍNDICE</TableColumn>
              <TableColumn>POPULAÇÃO</TableColumn>
              <TableColumn>SELO</TableColumn>
            </TableHeader>
            <TableBody
              isLoading={isLoading}
              loadingContent={<Spinner color="primary" />}
              emptyContent="Nenhum município encontrado."
              items={data?.data ?? []}
            >
              {(municipio) => (
                <TableRow
                  key={municipio.id}
                  onClick={() => router.push(`/municipios/${municipio.codigo_ibge}`)}
                >
                  <TableCell className="font-medium text-foreground">
                    {municipio.posicao <= 3 ? (
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-warning" />
                        {municipio.posicao}
                      </div>
                    ) : (
                      municipio.posicao
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{municipio.nome}</p>
                      <p className="text-xs text-foreground-500">{municipio.codigo_ibge}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[municipio.status] ?? "outline"}>
                      {municipio.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-foreground">
                      {municipio.indice_antifome.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>{formatPopulacao(municipio.populacao)}</TableCell>
                  <TableCell>{municipio.selo_atual ? seloIcons[municipio.selo_atual] : "—"}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {data && data.totalPages > 1 ? (
            <div className="flex flex-col gap-4 border-t border-default-100 pt-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-foreground-500">
                Mostrando {(data.page - 1) * 20 + 1} a {Math.min(data.page * 20, data.total)} de {data.total}
              </p>
              <Pagination
                page={page}
                total={data.totalPages}
                onChange={setPage}
                color="primary"
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
