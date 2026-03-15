import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MunicipiosService } from './municipios.service';

@ApiTags('Municípios')
@Controller('municipios')
export class MunicipiosController {
  constructor(private readonly municipiosService: MunicipiosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os municípios' })
  @ApiResponse({ status: 200, description: 'Lista de municípios' })
  async listar(
    @Query('status') status?: string,
    @Query('estado_id') estadoId?: string,
  ) {
    return this.municipiosService.listar({ status, estado_id: estadoId });
  }

  @Get('codigo/:codigoIbge')
  @ApiOperation({ summary: 'Buscar município por código IBGE' })
  @ApiResponse({ status: 200, description: 'Dados do município' })
  @ApiResponse({ status: 404, description: 'Município não encontrado' })
  async buscarPorCodigoIbge(@Param('codigoIbge') codigoIbge: string) {
    return this.municipiosService.buscarPorCodigoIbge(codigoIbge);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe completo do município' })
  @ApiResponse({ status: 200, description: 'Dados completos do município' })
  @ApiResponse({ status: 404, description: 'Município não encontrado' })
  async detalhe(@Param('id') id: string) {
    return this.municipiosService.detalhe(id);
  }

  @Get(':id/historico')
  @ApiOperation({ summary: 'Histórico de eventos do município' })
  @ApiResponse({ status: 200, description: 'Timeline de eventos' })
  async historico(@Param('id') id: string) {
    return this.municipiosService.historico(id);
  }

  @Get(':id/indice-historico')
  @ApiOperation({ summary: 'Histórico do índice antifome (para gráfico)' })
  @ApiResponse({ status: 200, description: 'Dados do gráfico' })
  async indiceHistorico(@Param('id') id: string) {
    return this.municipiosService.indiceHistorico(id);
  }
}
