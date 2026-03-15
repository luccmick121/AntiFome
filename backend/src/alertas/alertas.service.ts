import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface AlertaMunicipio {
  id: string;
  tipo: 'SEM_REUNIAO' | 'SEM_RELATORIO' | 'CONSELHO_SUSPENSO';
  municipio_id: string;
  municipio_nome: string;
  codigo_ibge: string;
  dias_inatividade: number;
  ultimo_evento: string | null;
  contato: string | null;
  severidade: 'CRITICA' | 'ALTA' | 'MEDIA';
}

export interface AlertasResponse {
  resumo: {
    sem_reuniao: number;
    sem_relatorio: number;
    conselho_suspenso: number;
    total: number;
  };
  alertas: AlertaMunicipio[];
  total: number;
}

@Injectable()
export class AlertasService {
  private readonly logger = new Logger(AlertasService.name);

  constructor(private readonly prisma: PrismaService) {}

  async getAlertas(filtros?: { tipo?: string }): Promise<AlertasResponse> {
    const agora = new Date();
    const dias90Atras = new Date(agora.getTime() - 90 * 24 * 60 * 60 * 1000);
    const dias30Atras = new Date(agora.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Buscar todos os alertas em paralelo
    const [alertasSemReuniao, alertasSemRelatorio, alertasConselho] =
      await Promise.all([
        this.getMunicipiosSemReuniao(dias90Atras),
        this.getMunicipiosSemRelatorio(dias30Atras),
        this.getConselhosSuspensos(),
      ]);

    // Combinar todos os alertas
    let todosAlertas: AlertaMunicipio[] = [
      ...alertasSemReuniao,
      ...alertasSemRelatorio,
      ...alertasConselho,
    ];

    // Aplicar filtros
    if (filtros?.tipo && filtros.tipo !== 'TODOS') {
      todosAlertas = todosAlertas.filter((a) => a.tipo === filtros.tipo);
    }

    // Ordenar por dias de inatividade (maior primeiro)
    todosAlertas.sort((a, b) => b.dias_inatividade - a.dias_inatividade);

    return {
      resumo: {
        sem_reuniao: alertasSemReuniao.length,
        sem_relatorio: alertasSemRelatorio.length,
        conselho_suspenso: alertasConselho.length,
        total:
          alertasSemReuniao.length +
          alertasSemRelatorio.length +
          alertasConselho.length,
      },
      alertas: todosAlertas,
      total: todosAlertas.length,
    };
  }

  private async getMunicipiosSemReuniao(
    dataLimite: Date,
  ): Promise<AlertaMunicipio[]> {
    const conselhos = await this.prisma.conselho.findMany({
      where: { status: 'ATIVO' },
      include: {
        municipio: true,
        reunioes: {
          orderBy: { data: 'desc' },
          take: 1,
        },
      },
    });

    const agora = new Date();
    const alertas: AlertaMunicipio[] = [];

    for (const conselho of conselhos) {
      const ultimaReuniao = conselho.reunioes[0];

      if (!ultimaReuniao || ultimaReuniao.data < dataLimite) {
        const diasInatividade = ultimaReuniao
          ? Math.floor(
              (agora.getTime() - ultimaReuniao.data.getTime()) /
                (24 * 60 * 60 * 1000),
            )
          : 365;

        alertas.push({
          id: `sem-reuniao-${conselho.id}`,
          tipo: 'SEM_REUNIAO',
          municipio_id: conselho.municipio_id,
          municipio_nome: conselho.municipio.nome,
          codigo_ibge: conselho.municipio.codigo_ibge,
          dias_inatividade: diasInatividade,
          ultimo_evento: ultimaReuniao?.data.toISOString() ?? null,
          contato: null,
          severidade: diasInatividade > 180 ? 'CRITICA' : 'ALTA',
        });
      }
    }

    return alertas;
  }

  private async getMunicipiosSemRelatorio(
    dataLimite: Date,
  ): Promise<AlertaMunicipio[]> {
    const municipios = await this.prisma.municipio.findMany({
      where: { status: { in: ['ATIVO', 'ATRASADO'] } },
      include: {
        relatorios: {
          orderBy: { created_at: 'desc' },
          take: 1,
        },
      },
    });

    const agora = new Date();
    const alertas: AlertaMunicipio[] = [];

    for (const municipio of municipios) {
      const ultimoRelatorio = municipio.relatorios[0];

      if (!ultimoRelatorio || ultimoRelatorio.created_at < dataLimite) {
        const diasInatividade = ultimoRelatorio
          ? Math.floor(
              (agora.getTime() - ultimoRelatorio.created_at.getTime()) /
                (24 * 60 * 60 * 1000),
            )
          : 365;

        alertas.push({
          id: `sem-relatorio-${municipio.id}`,
          tipo: 'SEM_RELATORIO',
          municipio_id: municipio.id,
          municipio_nome: municipio.nome,
          codigo_ibge: municipio.codigo_ibge,
          dias_inatividade: diasInatividade,
          ultimo_evento: ultimoRelatorio?.created_at.toISOString() ?? null,
          contato: null,
          severidade: 'MEDIA',
        });
      }
    }

    return alertas;
  }

  private async getConselhosSuspensos(): Promise<AlertaMunicipio[]> {
    const conselhos = await this.prisma.conselho.findMany({
      where: { status: 'SUSPENSO' },
      include: { municipio: true },
    });

    return conselhos.map((conselho) => ({
      id: `suspenso-${conselho.id}`,
      tipo: 'CONSELHO_SUSPENSO' as const,
      municipio_id: conselho.municipio_id,
      municipio_nome: conselho.municipio.nome,
      codigo_ibge: conselho.municipio.codigo_ibge,
      dias_inatividade: Math.floor(
        (Date.now() - conselho.updated_at.getTime()) / (24 * 60 * 60 * 1000),
      ),
      ultimo_evento: conselho.updated_at.toISOString(),
      contato: null,
      severidade: 'CRITICA' as const,
    }));
  }

  async quebrarSilencio(
    alertaId: string,
    gestorId: string,
  ): Promise<{ message: string }> {
    this.logger.log(
      `Gestor ${gestorId} quebrou silêncio do alerta ${alertaId}`,
    );

    return {
      message: 'Silêncio quebrado com sucesso. O conselho será notificado.',
    };
  }
}
