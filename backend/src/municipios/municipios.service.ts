import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MunicipiosService {
  constructor(private readonly prisma: PrismaService) {}

  // Listar todos os municípios (com filtros)
  async listar(filtros?: { status?: string; estado_id?: string }) {
    return this.prisma.municipio.findMany({
      where: {
        ...(filtros?.status ? { status: filtros.status as any } : {}),
        ...(filtros?.estado_id ? { estado_id: filtros.estado_id } : {}),
      },
      include: {
        estado: true,
        conselhos: { where: { status: 'ATIVO' }, take: 1 },
      },
      orderBy: { nome: 'asc' },
    });
  }

  // Detalhe completo de um município
  async detalhe(municipioId: string) {
    const municipio = await this.prisma.municipio.findUnique({
      where: { id: municipioId },
      include: {
        estado: true,
        conselhos: {
          include: {
            membros: {
              orderBy: { cargo: 'asc' },
            },
            reunioes: {
              orderBy: { data: 'desc' },
              take: 10,
            },
          },
        },
        selos: {
          orderBy: { conquistado_em: 'desc' },
        },
        relatorios: {
          orderBy: { created_at: 'desc' },
          take: 6,
        },
      },
    });

    if (!municipio) {
      throw new NotFoundException('Município não encontrado');
    }

    const conselhoAtivo = municipio.conselhos.find((c) => c.status === 'ATIVO');

    return {
      ...municipio,
      conselho: conselhoAtivo || null,
      resumo: {
        total_membros: conselhoAtivo?.membros.length || 0,
        total_reunioes: conselhoAtivo?.reunioes.length || 0,
        total_selos: municipio.selos.length,
        total_relatorios: municipio.relatorios.length,
      },
    };
  }

  // Histórico de eventos do município
  async historico(municipioId: string) {
    const [reunioes, relatorios, selos] = await Promise.all([
      this.prisma.reuniao.findMany({
        where: { conselho: { municipio_id: municipioId } },
        orderBy: { data: 'desc' },
        take: 20,
      }),
      this.prisma.relatorioFome.findMany({
        where: { municipio_id: municipioId },
        orderBy: { created_at: 'desc' },
        take: 12,
      }),
      this.prisma.selo.findMany({
        where: { municipio_id: municipioId },
        orderBy: { conquistado_em: 'desc' },
      }),
    ]);

    // Combinar eventos em timeline
    const eventos = [
      ...reunioes.map((r) => ({
        tipo: 'REUNIAO' as const,
        data: r.data,
        titulo: `Reunião ${r.tipo}`,
        descricao: r.pauta || 'Sem pauta definida',
      })),
      ...relatorios.map((r) => ({
        tipo: 'RELATORIO' as const,
        data: r.created_at,
        titulo: `Relatório ${r.mes_ano}`,
        descricao: `Gravidade: ${r.nivel_gravidade}`,
      })),
      ...selos.map((s) => ({
        tipo: 'SELO' as const,
        data: s.conquistado_em,
        titulo: `Selo ${s.tipo} conquistado`,
        descricao: `Município recebeu o selo ${s.tipo}`,
      })),
    ];

    // Ordenar por data (mais recente primeiro)
    eventos.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
    );

    return eventos;
  }

  // Histórico do índice antifome (simulado para gráfico)
  async indiceHistorico(municipioId: string) {
    const municipio = await this.prisma.municipio.findUnique({
      where: { id: municipioId },
      select: { indice_antifome: true, status: true },
    });

    if (!municipio) {
      throw new NotFoundException('Município não encontrado');
    }

    // Gerar dados simulados dos últimos 12 meses baseados no índice atual
    const indiceAtual = municipio.indice_antifome;
    const meses: { mes: string; indice: number }[] = [];
    const agora = new Date();

    for (let i = 11; i >= 0; i--) {
      const data = new Date(agora);
      data.setMonth(agora.getMonth() - i);
      const variacao = (Math.random() - 0.5) * 2; // Variação de -1 a +1
      const indice = Math.max(
        0,
        Math.min(10, indiceAtual + variacao * (i / 6)),
      );

      meses.push({
        mes: `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, '0')}`,
        indice: parseFloat(indice.toFixed(1)),
      });
    }

    return {
      atual: indiceAtual,
      historico: meses,
    };
  }

  // Buscar município por código IBGE
  async buscarPorCodigoIbge(codigoIbge: string) {
    const municipio = await this.prisma.municipio.findUnique({
      where: { codigo_ibge: codigoIbge },
      include: { estado: true },
    });

    if (!municipio) {
      throw new NotFoundException('Município não encontrado');
    }

    return municipio;
  }
}
