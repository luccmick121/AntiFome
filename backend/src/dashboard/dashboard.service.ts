import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface DashboardStats {
  totalMunicipios: number;
  municipiosAtivos: number;
  municipiosInativos: number;
  municipiosAtrasados: number;
  indiceAntifomeMedio: number;
  totalConselhos: number;
  conselhosAtivos: number;
  totalReunioesMes: number;
  selosDistribuidos: number;
  timestamp: Date;
}

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  // Cache em memória (5 minutos TTL)
  private cache: { data: DashboardStats; expiresAt: number } | null = null;
  private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

  constructor(private readonly prisma: PrismaService) {}

  async getStats(): Promise<DashboardStats> {
    // Verificar cache
    if (this.cache && Date.now() < this.cache.expiresAt) {
      this.logger.debug('Retornando stats do cache');
      return this.cache.data;
    }

    this.logger.debug('Calculando stats do banco de dados');
    const inicio = Date.now();

    // Executar todas as queries em paralelo para melhor performance
    const [
      totalMunicipios,
      municipiosAtivos,
      municipiosInativos,
      municipiosAtrasados,
      indiceMedia,
      totalConselhos,
      conselhosAtivos,
      totalReunioesMes,
      selosDistribuidos,
    ] = await Promise.all([
      // Total de municípios
      this.prisma.municipio.count(),

      // Municípios por status
      this.prisma.municipio.count({
        where: { status: 'ATIVO' },
      }),
      this.prisma.municipio.count({
        where: { status: 'INATIVO' },
      }),
      this.prisma.municipio.count({
        where: { status: 'ATRASADO' },
      }),

      // Média do índice antifome
      this.prisma.municipio.aggregate({
        _avg: { indice_antifome: true },
      }),

      // Conselhos
      this.prisma.conselho.count(),
      this.prisma.conselho.count({
        where: { status: 'ATIVO' },
      }),

      // Reuniões do mês atual
      this.getReunioesMesAtual(),

      // Total de selos
      this.prisma.selo.count(),
    ]);

    const stats: DashboardStats = {
      totalMunicipios,
      municipiosAtivos,
      municipiosInativos,
      municipiosAtrasados,
      indiceAntifomeMedio: Number(
        (indiceMedia._avg.indice_antifome ?? 0).toFixed(1),
      ),
      totalConselhos,
      conselhosAtivos,
      totalReunioesMes: totalReunioesMes,
      selosDistribuidos,
      timestamp: new Date(),
    };

    // Atualizar cache
    this.cache = {
      data: stats,
      expiresAt: Date.now() + this.CACHE_TTL_MS,
    };

    const duracao = Date.now() - inicio;
    this.logger.log(`Stats calculadas em ${duracao}ms`);

    return stats;
  }

  private async getReunioesMesAtual(): Promise<number> {
    const agora = new Date();
    const inicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
    const fimMes = new Date(agora.getFullYear(), agora.getMonth() + 1, 0);

    return this.prisma.reuniao.count({
      where: {
        data: {
          gte: inicioMes,
          lte: fimMes,
        },
      },
    });
  }

  // Método para invalidar cache (útil quando dados são atualizados)
  invalidateCache(): void {
    this.cache = null;
    this.logger.debug('Cache invalidado');
  }
}
