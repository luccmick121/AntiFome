import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { RankingService, RankingResponse } from './ranking.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Ranking')
@Controller('ranking')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  @ApiOperation({
    summary: 'Obter ranking de municípios',
    description:
      'Retorna lista paginada de municípios ordenada por índice antifome, com filtros e busca.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({
    name: 'orderBy',
    required: false,
    enum: ['nome', 'status', 'indice_antifome', 'populacao'],
    example: 'indice_antifome',
  })
  @ApiQuery({
    name: 'orderDir',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
  })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'Porto' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['ATIVO', 'INATIVO', 'ATRASADO', 'TODOS'],
    example: 'TODOS',
  })
  @ApiResponse({ status: 200, description: 'Ranking retornado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getRanking(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('orderBy') orderBy?: string,
    @Query('orderDir') orderDir?: 'asc' | 'desc',
    @Query('search') search?: string,
    @Query('status') status?: string,
  ): Promise<RankingResponse> {
    return this.rankingService.getRanking({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
      orderBy,
      orderDir,
      search,
      status,
    });
  }
}
