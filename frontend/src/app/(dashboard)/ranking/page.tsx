"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Award,
} from "lucide-react";

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

const statusColors: Record<string, string> = {
  ATIVO: "bg-green-100 text-green-800",
  ATRASADO: "bg-yellow-100 text-yellow-800",
  INATIVO: "bg-red-100 text-red-800",
};

const seloIcons: Record<string, string> = {
  PLATINA: "💎",
  OURO: "🥇",
  PRATA: "🥈",
  BRONZE: "🥉",
};

export default function RankingPage() {
  const router = useRouter();
  const [data, setData] = useState<RankingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("TODOS");
  const [orderBy, setOrderBy] = useState("indice_antifome");
  const [orderDir, setOrderDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);

  const fetchRanking = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
        orderBy,
        orderDir,
        ...(search && { search }),
        ...(status !== "TODOS" && { status }),
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ranking?${params}`,
        { credentials: "include" }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, orderBy, orderDir, search, status]);

  useEffect(() => {
    fetchRanking();
  }, [fetchRanking]);

  // Debounce de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSort = (column: string) => {
    if (orderBy === column) {
      setOrderDir(orderDir === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrderDir("desc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (orderBy !== column) return <ArrowUpDown className="w-4 h-4 ml-1" />;
    return orderDir === "asc" ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  const formatPopulacao = (pop: number) => {
    return new Intl.NumberFormat("pt-BR").format(pop);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ranking de Municípios</h1>
        <p className="text-gray-500">
          Compare municípios por índice antifome e outros critérios
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar município..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="TODOS">Todos os Status</option>
          <option value="ATIVO">Ativo</option>
          <option value="ATRASADO">Atrasado</option>
          <option value="INATIVO">Inativo</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-16">
                  #
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("nome")}
                >
                  <div className="flex items-center">
                    Município
                    <SortIcon column="nome" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    <SortIcon column="status" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("indice_antifome")}
                >
                  <div className="flex items-center">
                    Índice
                    <SortIcon column="indice_antifome" />
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("populacao")}
                >
                  <div className="flex items-center">
                    População
                    <SortIcon column="populacao" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Selo
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3"><Skeleton className="h-4 w-8" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-40" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-12" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-4 py-3"><Skeleton className="h-4 w-8" /></td>
                  </tr>
                ))
              ) : data?.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Nenhum município encontrado
                  </td>
                </tr>
              ) : (
                data?.data.map((municipio) => (
                  <tr
                    key={municipio.id}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() => router.push(`/municipios/${municipio.codigo_ibge}`)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-500">
                      {municipio.posicao <= 3 ? (
                        <Award
                          className={`w-5 h-5 ${
                            municipio.posicao === 1
                              ? "text-yellow-500"
                              : municipio.posicao === 2
                              ? "text-gray-400"
                              : "text-amber-600"
                          }`}
                        />
                      ) : (
                        municipio.posicao
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{municipio.nome}</div>
                      <div className="text-xs text-gray-500">{municipio.codigo_ibge}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[municipio.status] ?? "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {municipio.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${
                          municipio.indice_antifome >= 7
                            ? "text-green-600"
                            : municipio.indice_antifome >= 4
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {municipio.indice_antifome.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatPopulacao(municipio.populacao)}
                    </td>
                    <td className="px-4 py-3 text-xl">
                      {municipio.selo_atual && seloIcons[municipio.selo_atual]}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50">
            <div className="text-sm text-gray-500">
              Mostrando {(data.page - 1) * 20 + 1}-
              {Math.min(data.page * 20, data.total)} de {data.total}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={!data.hasPrev}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-600">
                Página {data.page} de {data.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={!data.hasNext}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
