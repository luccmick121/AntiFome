import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ConselhosService } from './conselhos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Cargo, TipoReuniao } from '@prisma/client';

@ApiTags('Conselhos')
@Controller('conselhos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ConselhosController {
  constructor(private readonly conselhosService: ConselhosService) {}

  @Get('mine')
  @ApiOperation({ summary: 'Obter conselho do usuário logado' })
  @ApiResponse({ status: 200, description: 'Dados do conselho' })
  @ApiResponse({ status: 404, description: 'Conselho não encontrado' })
  async getMine(@Request() req: { user: { sub: string } }) {
    return this.conselhosService.getConselhoDoUsuario(req.user.sub);
  }

  @Get('mine/stats')
  @ApiOperation({ summary: 'Obter estatísticas do conselho do usuário logado' })
  @ApiResponse({ status: 200, description: 'Estatísticas do conselho' })
  async getMineStats(@Request() req: { user: { sub: string } }) {
    return this.conselhosService.getEstatisticas(req.user.sub);
  }

  @Get('mine/membros')
  @ApiOperation({ summary: 'Listar membros do conselho do usuário logado' })
  async getMineMembros(@Request() req: { user: { sub: string } }) {
    return this.conselhosService.getMembrosDoUsuario(req.user.sub);
  }

  @Get('mine/reunioes')
  @ApiOperation({ summary: 'Listar reuniões do conselho do usuário logado' })
  async getMineReunioes(@Request() req: { user: { sub: string } }) {
    return this.conselhosService.getReunioesDoUsuario(req.user.sub);
  }

  @Get('mine/status')
  @ApiOperation({
    summary: 'Status completo do conselho (SISAN, CAISAN, selos, progresso)',
  })
  @ApiResponse({ status: 200, description: 'Status detalhado do conselho' })
  async getMineStatus(@Request() req: { user: { sub: string } }) {
    return this.conselhosService.getStatusDoConselho(req.user.sub);
  }

  // Membros
  @Get(':conselhoId/membros')
  @ApiOperation({ summary: 'Listar membros do conselho' })
  async getMembros(@Param('conselhoId') conselhoId: string) {
    return this.conselhosService.getMembros(conselhoId);
  }

  @Post(':conselhoId/membros')
  @ApiOperation({ summary: 'Criar novo membro' })
  async criarMembro(
    @Param('conselhoId') conselhoId: string,
    @Body()
    body: { nome: string; cargo: Cargo; email?: string; telefone?: string },
  ) {
    return this.conselhosService.criarMembro(conselhoId, body);
  }

  @Put(':conselhoId/membros/:membroId')
  @ApiOperation({ summary: 'Atualizar membro' })
  async atualizarMembro(
    @Param('conselhoId') conselhoId: string,
    @Param('membroId') membroId: string,
    @Body()
    body: Partial<{
      nome: string;
      cargo: Cargo;
      email: string;
      telefone: string;
    }>,
  ) {
    return this.conselhosService.atualizarMembro(conselhoId, membroId, body);
  }

  @Delete(':conselhoId/membros/:membroId')
  @ApiOperation({ summary: 'Remover membro' })
  async removerMembro(
    @Param('conselhoId') conselhoId: string,
    @Param('membroId') membroId: string,
  ) {
    return this.conselhosService.removerMembro(conselhoId, membroId);
  }

  // Reuniões
  @Get(':conselhoId/reunioes')
  @ApiOperation({ summary: 'Listar reuniões do conselho' })
  async getReunioes(@Param('conselhoId') conselhoId: string) {
    return this.conselhosService.getReunioes(conselhoId);
  }

  @Post(':conselhoId/reunioes')
  @ApiOperation({ summary: 'Criar nova reunião' })
  async criarReuniao(
    @Param('conselhoId') conselhoId: string,
    @Body()
    body: { data: string; tipo: TipoReuniao; pauta?: string; ata_url?: string },
  ) {
    return this.conselhosService.criarReuniao(conselhoId, {
      ...body,
      data: new Date(body.data),
    });
  }

  @Put(':conselhoId/reunioes/:reuniaoId')
  @ApiOperation({ summary: 'Atualizar reunião' })
  async atualizarReuniao(
    @Param('conselhoId') conselhoId: string,
    @Param('reuniaoId') reuniaoId: string,
    @Body()
    body: Partial<{
      data: string;
      tipo: TipoReuniao;
      pauta: string;
      ata_url: string;
    }>,
  ) {
    return this.conselhosService.atualizarReuniao(conselhoId, reuniaoId, {
      ...body,
      data: body.data ? new Date(body.data) : undefined,
    });
  }

  @Delete(':conselhoId/reunioes/:reuniaoId')
  @ApiOperation({ summary: 'Remover reunião' })
  async removerReuniao(
    @Param('conselhoId') conselhoId: string,
    @Param('reuniaoId') reuniaoId: string,
  ) {
    return this.conselhosService.removerReuniao(conselhoId, reuniaoId);
  }

  // Documentos (Story 3.5)
  @Get('mine/documentos')
  @ApiOperation({ summary: 'Listar documentos do conselho' })
  async getMineDocumentos(
    @Request() req: { user: { sub: string } },
    @Param('categoria') categoria?: string,
  ) {
    return this.conselhosService.getDocumentos(req.user.sub, categoria);
  }

  @Post('mine/documentos')
  @ApiOperation({ summary: 'Upload de documento' })
  async criarDocumento(
    @Request() req: { user: { sub: string } },
    @Body()
    body: {
      nome: string;
      categoria: string;
      descricao?: string;
      arquivo_url: string;
      arquivo_tipo: string;
      arquivo_tamanho: number;
    },
  ) {
    return this.conselhosService.criarDocumento(req.user.sub, body);
  }

  @Delete('mine/documentos/:documentoId')
  @ApiOperation({ summary: 'Remover documento' })
  async removerDocumento(
    @Request() req: { user: { sub: string } },
    @Param('documentoId') documentoId: string,
  ) {
    return this.conselhosService.removerDocumento(req.user.sub, documentoId);
  }
}
