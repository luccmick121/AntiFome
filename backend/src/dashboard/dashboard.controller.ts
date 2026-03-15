import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DashboardService, DashboardStats } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Dashboard')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({
    summary: 'Obter estatísticas do dashboard',
    description:
      'Retorna KPIs consolidados do estado: total de municípios, status, índice antifome, conselhos, reuniões e selos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
    schema: {
      type: 'object',
      properties: {
        totalMunicipios: { type: 'number', example: 497 },
        municipiosAtivos: { type: 'number', example: 353 },
        municipiosInativos: { type: 'number', example: 84 },
        municipiosAtrasados: { type: 'number', example: 60 },
        indiceAntifomeMedio: { type: 'number', example: 6.8 },
        totalConselhos: { type: 'number', example: 412 },
        conselhosAtivos: { type: 'number', example: 380 },
        totalReunioesMes: { type: 'number', example: 145 },
        selosDistribuidos: { type: 'number', example: 234 },
        timestamp: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getStats(): Promise<DashboardStats> {
    return this.dashboardService.getStats();
  }
}
