import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cargo, TipoReuniao } from '@prisma/client';

@Injectable()
export class ConselhosService {
  constructor(private readonly prisma: PrismaService) {}

  // Obter conselho do município do usuário logado
  async getConselhoDoUsuario(userId: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: { municipio: true },
    });

    if (!usuario || !usuario.municipio_id) {
      throw new NotFoundException('Usuário sem município associado');
    }

    const conselho = await this.prisma.conselho.findFirst({
      where: { municipio_id: usuario.municipio_id, status: 'ATIVO' },
      include: {
        municipio: true,
        membros: true,
        reunioes: { orderBy: { data: 'desc' }, take: 10 },
      },
    });

    if (!conselho) {
      throw new NotFoundException(
        'Conselho não encontrado para este município',
      );
    }

    return conselho;
  }

  // Obter estatísticas do conselho do usuário
  async getEstatisticas(userId: string) {
    const conselho = await this.getConselhoDoUsuario(userId);

    const [totalMembros, totalReunioes, ultimaReuniao] = await Promise.all([
      this.prisma.membro.count({ where: { conselho_id: conselho.id } }),
      this.prisma.reuniao.count({ where: { conselho_id: conselho.id } }),
      this.prisma.reuniao.findFirst({
        where: { conselho_id: conselho.id, data: { gte: new Date() } },
        orderBy: { data: 'asc' },
      }),
    ]);

    // Calcular progresso para próximo selo (simplificado)
    const reunioesAno = await this.prisma.reuniao.count({
      where: {
        conselho_id: conselho.id,
        data: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
    });

    const metaSelo = 12; // 12 reuniões por ano para OURO
    const progressoProximoSelo = Math.min(
      100,
      Math.round((reunioesAno / metaSelo) * 100),
    );
    const reunioesFaltando = Math.max(0, metaSelo - reunioesAno);

    // Determinar selo atual baseado no progresso
    let seloAtual: string | null = null;
    if (progressoProximoSelo >= 100) seloAtual = 'OURO';
    else if (progressoProximoSelo >= 80) seloAtual = 'PRATA';
    else if (progressoProximoSelo >= 50) seloAtual = 'BRONZE';

    return {
      totalMembros,
      totalReunioes,
      proximaReuniao: ultimaReuniao?.data.toISOString() || null,
      seloAtual,
      progressoProximoSelo,
      reunioesFaltando,
    };
  }

  // Obter membros do conselho do usuário
  async getMembrosDoUsuario(userId: string) {
    const conselho = await this.getConselhoDoUsuario(userId);
    return this.getMembros(conselho.id);
  }

  // Obter reuniões do conselho do usuário
  async getReunioesDoUsuario(userId: string) {
    const conselho = await this.getConselhoDoUsuario(userId);
    return this.getReunioes(conselho.id);
  }

  // Listar membros do conselho
  async getMembros(conselhoId: string) {
    await this.verificarConselhoExiste(conselhoId);

    return this.prisma.membro.findMany({
      where: { conselho_id: conselhoId },
      orderBy: { cargo: 'asc' },
    });
  }

  // Criar novo membro
  async criarMembro(
    conselhoId: string,
    body: { nome: string; cargo: Cargo; email?: string; telefone?: string },
  ) {
    await this.verificarConselhoExiste(conselhoId);

    return this.prisma.membro.create({
      data: {
        conselho_id: conselhoId,
        nome: body.nome,
        cargo: body.cargo,
        email: body.email,
        telefone: body.telefone,
      },
    });
  }

  // Atualizar membro
  async atualizarMembro(
    conselhoId: string,
    membroId: string,
    body: Partial<{
      nome: string;
      cargo: Cargo;
      email: string;
      telefone: string;
    }>,
  ) {
    await this.verificarConselhoExiste(conselhoId);
    await this.verificarMembroExiste(membroId, conselhoId);

    return this.prisma.membro.update({
      where: { id: membroId },
      data: body,
    });
  }

  // Remover membro
  async removerMembro(conselhoId: string, membroId: string) {
    await this.verificarConselhoExiste(conselhoId);
    await this.verificarMembroExiste(membroId, conselhoId);

    return this.prisma.membro.delete({
      where: { id: membroId },
    });
  }

  // Listar reuniões do conselho
  async getReunioes(conselhoId: string) {
    await this.verificarConselhoExiste(conselhoId);

    return this.prisma.reuniao.findMany({
      where: { conselho_id: conselhoId },
      orderBy: { data: 'desc' },
    });
  }

  // Criar nova reunião
  async criarReuniao(
    conselhoId: string,
    body: { data: Date; tipo: TipoReuniao; pauta?: string; ata_url?: string },
  ) {
    await this.verificarConselhoExiste(conselhoId);

    return this.prisma.reuniao.create({
      data: {
        conselho_id: conselhoId,
        data: body.data,
        tipo: body.tipo,
        pauta: body.pauta,
        ata_url: body.ata_url,
      },
    });
  }

  // Atualizar reunião
  async atualizarReuniao(
    conselhoId: string,
    reuniaoId: string,
    body: Partial<{
      data: Date;
      tipo: TipoReuniao;
      pauta: string;
      ata_url: string;
    }>,
  ) {
    await this.verificarConselhoExiste(conselhoId);
    await this.verificarReuniaoExiste(reuniaoId, conselhoId);

    return this.prisma.reuniao.update({
      where: { id: reuniaoId },
      data: body,
    });
  }

  // Remover reunião
  async removerReuniao(conselhoId: string, reuniaoId: string) {
    await this.verificarConselhoExiste(conselhoId);
    await this.verificarReuniaoExiste(reuniaoId, conselhoId);

    return this.prisma.reuniao.delete({
      where: { id: reuniaoId },
    });
  }

  // Status completo do conselho (Story 3.4)
  async getStatusDoConselho(userId: string) {
    const conselho = await this.getConselhoDoUsuario(userId);
    const municipio = conselho.municipio;

    // Calcular reuniões do ano atual
    const inicioAno = new Date(new Date().getFullYear(), 0, 1);
    const [reunioesAno, relatoriosAno, totalMembros] = await Promise.all([
      this.prisma.reuniao.count({
        where: { conselho_id: conselho.id, data: { gte: inicioAno } },
      }),
      this.prisma.relatorioFome.count({
        where: { municipio_id: municipio.id, created_at: { gte: inicioAno } },
      }),
      this.prisma.membro.count({ where: { conselho_id: conselho.id } }),
    ]);

    // Determinar selos baseado em requisitos
    const selos = this.calcularProgressoSelos(
      reunioesAno,
      relatoriosAno,
      totalMembros,
      conselho.status,
    );

    // Calcular progresso geral
    const progressoGeral = this.calcularProgressoGeral(
      reunioesAno,
      relatoriosAno,
      totalMembros,
    );

    // Gerar recomendações
    const recomendacoes = this.gerarRecomendacoes(
      reunioesAno,
      relatoriosAno,
      totalMembros,
    );

    // Próximas reuniões (simuladas - baseado no calendário)
    const proximasReunioes = this.gerarProximasReunioes(reunioesAno);

    return {
      conselho: {
        id: conselho.id,
        nome: conselho.nome,
        status: conselho.status,
      },
      municipio: {
        nome: municipio.nome,
        codigo_ibge: municipio.codigo_ibge,
        indice_antifome: municipio.indice_antifome,
      },
      sisan: {
        adesao:
          municipio.indice_antifome >= 6
            ? 'IMPLEMENTACAO'
            : municipio.indice_antifome >= 3
              ? 'ADESAO'
              : 'NAO_ADESAO',
        data_adesao: municipio.indice_antifome >= 3 ? '2024-01-15' : null,
      },
      caisan: {
        composicao: `${totalMembros} membros`,
        status_funcionamento:
          conselho.status === 'ATIVO' ? 'FUNCIONANDO' : 'INATIVO',
      },
      plano_municipal: {
        vigencia: '2024-2027',
        status_execucao: progressoGeral >= 70 ? 'EM_EXECUCAO' : 'PENDENTE',
        percentual_execucao: progressoGeral,
      },
      selos,
      reunioes: {
        realizadas: reunioesAno,
        necessarias: 12,
        percentual: Math.min(100, Math.round((reunioesAno / 12) * 100)),
      },
      relatorios: {
        enviados: relatoriosAno,
        necessarios: 6,
        percentual: Math.min(100, Math.round((relatoriosAno / 6) * 100)),
      },
      progresso_geral: progressoGeral,
      recomendacoes,
      proximas_reunioes: proximasReunioes,
    };
  }

  // Calcular progresso para cada selo
  private calcularProgressoSelos(
    reunioesAno: number,
    relatoriosAno: number,
    totalMembros: number,
    statusConselho: string,
  ) {
    const requisitos = [
      { tipo: 'BRONZE', reunioes: 6, relatorios: 3, membros: 0 },
      { tipo: 'PRATA', reunioes: 10, relatorios: 6, membros: 5 },
      { tipo: 'OURO', reunioes: 12, relatorios: 10, membros: 5 },
      { tipo: 'PLATINA', reunioes: 12, relatorios: 12, membros: 5 },
    ];

    return requisitos.map((req) => {
      const progressoReunioes = Math.min(
        100,
        Math.round((reunioesAno / req.reunioes) * 100),
      );
      const progressoRelatorios = Math.min(
        100,
        Math.round((relatoriosAno / req.relatorios) * 100),
      );
      const progressoMembros =
        req.membros > 0
          ? Math.min(100, Math.round((totalMembros / req.membros) * 100))
          : 100;
      const progressoTotal = Math.round(
        (progressoReunioes + progressoRelatorios + progressoMembros) / 3,
      );

      return {
        tipo: req.tipo,
        progresso: progressoTotal,
        atingido: progressoTotal >= 100 && statusConselho === 'ATIVO',
        detalhes: {
          reunioes: {
            atual: reunioesAno,
            necessarias: req.reunioes,
            progresso: progressoReunioes,
          },
          relatorios: {
            atual: relatoriosAno,
            necessarios: req.relatorios,
            progresso: progressoRelatorios,
          },
          membros: {
            atual: totalMembros,
            minimo: req.membros,
            progresso: progressoMembros,
          },
        },
      };
    });
  }

  // Calcular progresso geral
  private calcularProgressoGeral(
    reunioesAno: number,
    relatoriosAno: number,
    totalMembros: number,
  ): number {
    const pReunioes = Math.min(1, reunioesAno / 12);
    const pRelatorios = Math.min(1, relatoriosAno / 6);
    const pMembros = Math.min(1, totalMembros / 5);
    return Math.round(((pReunioes + pRelatorios + pMembros) / 3) * 100);
  }

  // Gerar recomendações
  private gerarRecomendacoes(
    reunioesAno: number,
    relatoriosAno: number,
    totalMembros: number,
  ) {
    const recomendacoes: string[] = [];

    if (reunioesAno < 6) {
      recomendacoes.push(
        `Faltam ${6 - reunioesAno} reuniões para o selo BRONZE`,
      );
    } else if (reunioesAno < 10) {
      recomendacoes.push(
        `Faltam ${10 - reunioesAno} reuniões para o selo PRATA`,
      );
    } else if (reunioesAno < 12) {
      recomendacoes.push(
        `Faltam ${12 - reunioesAno} reuniões para o selo OURO`,
      );
    }

    if (relatoriosAno < 3) {
      recomendacoes.push(
        `Faltam ${3 - relatoriosAno} relatórios para o selo BRONZE`,
      );
    } else if (relatoriosAno < 6) {
      recomendacoes.push(
        `Faltam ${6 - relatoriosAno} relatórios para o selo PRATA`,
      );
    } else if (relatoriosAno < 10) {
      recomendacoes.push(
        `Faltam ${10 - relatoriosAno} relatórios para o selo OURO`,
      );
    }

    if (totalMembros < 5) {
      recomendacoes.push(
        `Faltam ${5 - totalMembros} membros para atingir o mínimo exigido`,
      );
    }

    if (recomendacoes.length === 0) {
      recomendacoes.push(
        'Parabéns! Todos os requisitos mínimos foram atingidos.',
      );
    }

    return recomendacoes;
  }

  // Gerar próximas reuniões sugeridas
  private gerarProximasReunioes(reunioesAno: number) {
    const proximas = [];
    const agora = new Date();
    const reunioesRestantes = Math.max(0, 12 - reunioesAno);

    for (let i = 0; i < Math.min(reunioesRestantes, 4); i++) {
      const dataProxima = new Date(agora);
      dataProxima.setMonth(agora.getMonth() + i + 1);
      dataProxima.setDate(15); // Dia 15 de cada mês

      proximas.push({
        data: dataProxima.toISOString().split('T')[0],
        tipo: i === 0 ? 'ORDINARIA' : 'ORDINARIA',
        sugerida: true,
      });
    }

    return proximas;
  }

  // === Documentos (Story 3.5) ===

  // Listar documentos do conselho
  async getDocumentos(userId: string, categoria?: string) {
    const conselho = await this.getConselhoDoUsuario(userId);

    return this.prisma.documento.findMany({
      where: {
        conselho_id: conselho.id,
        ...(categoria && categoria !== 'TODOS' ? { categoria } : {}),
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // Criar documento
  async criarDocumento(
    userId: string,
    data: {
      nome: string;
      categoria: string;
      descricao?: string;
      arquivo_url: string;
      arquivo_tipo: string;
      arquivo_tamanho: number;
    },
  ) {
    const conselho = await this.getConselhoDoUsuario(userId);

    return this.prisma.documento.create({
      data: {
        conselho_id: conselho.id,
        nome: data.nome,
        categoria: data.categoria,
        descricao: data.descricao,
        arquivo_url: data.arquivo_url,
        arquivo_tipo: data.arquivo_tipo,
        arquivo_tamanho: data.arquivo_tamanho,
        criado_por: userId,
      },
    });
  }

  // Remover documento
  async removerDocumento(userId: string, documentoId: string) {
    const conselho = await this.getConselhoDoUsuario(userId);

    const documento = await this.prisma.documento.findFirst({
      where: { id: documentoId, conselho_id: conselho.id },
    });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado');
    }

    return this.prisma.documento.delete({ where: { id: documentoId } });
  }

  // Métodos auxiliares de verificação
  private async verificarConselhoExiste(conselhoId: string) {
    const conselho = await this.prisma.conselho.findUnique({
      where: { id: conselhoId },
    });

    if (!conselho) {
      throw new NotFoundException('Conselho não encontrado');
    }

    return conselho;
  }

  private async verificarMembroExiste(membroId: string, conselhoId: string) {
    const membro = await this.prisma.membro.findFirst({
      where: { id: membroId, conselho_id: conselhoId },
    });

    if (!membro) {
      throw new NotFoundException('Membro não encontrado neste conselho');
    }

    return membro;
  }

  private async verificarReuniaoExiste(reuniaoId: string, conselhoId: string) {
    const reuniao = await this.prisma.reuniao.findFirst({
      where: { id: reuniaoId, conselho_id: conselhoId },
    });

    if (!reuniao) {
      throw new NotFoundException('Reunião não encontrada neste conselho');
    }

    return reuniao;
  }
}
