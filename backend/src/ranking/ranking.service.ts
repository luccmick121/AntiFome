import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface RankingQuery {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDir?: 'asc' | 'desc';
  search?: string;
  status?: string;
}

export interface RankingResponse {
  data: MunicipioRanking[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface MunicipioRanking {
  posicao: number;
  id: string;
  codigo_ibge: string;
  nome: string;
  status: string;
  indice_antifome: number;
  populacao: number;
  selo_atual: string | null;
}

@Injectable()
export class RankingService {
  constructor(private readonly prisma: PrismaService) {}

  async getRanking(query: RankingQuery): Promise<RankingResponse> {
    const {
      page = 1,
      limit = 20,
      orderBy = 'indice_antifome',
      orderDir = 'desc',
      search,
      status,
    } = query;

    const skip = (page - 1) * limit;

    // Construir where clause
    const where: Record<string, unknown> = {};

    if (search) {
      where.nome = { contains: search, mode: 'insensitive' };
    }

    if (status && status !== 'TODOS') {
      where.status = status;
    }

    // Mapear orderBy para campo do Prisma
    const orderByField = this.mapOrderBy(orderBy);

    // Executar query com total
    const [municipios, total] = await Promise.all([
      this.prisma.municipio.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [orderByField]: orderDir },
        include: {
          selos: {
            orderBy: { conquistado_em: 'desc' },
            take: 1,
          },
        },
      }),
      this.prisma.municipio.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    // Calcular posição global
    const basePosition = skip;

    const data: MunicipioRanking[] = municipios.map((m, index) => ({
      posicao: basePosition + index + 1,
      id: m.id,
      codigo_ibge: m.codigo_ibge,
      nome: m.nome,
      status: m.status,
      indice_antifome: m.indice_antifome,
      populacao: m.populacao,
      selo_atual: m.selos[0]?.tipo ?? null,
    }));

    return {
      data,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  private mapOrderBy(orderBy: string): string {
    const mapping: Record<string, string> = {
      nome: 'nome',
      status: 'status',
      indice: 'indice_antifome',
      indice_antifome: 'indice_antifome',
      populacao: 'populacao',
    };
    return mapping[orderBy] ?? 'indice_antifome';
  }
}
