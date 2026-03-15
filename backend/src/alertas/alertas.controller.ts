import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AlertasService, AlertasResponse } from './alertas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Alertas')
@Controller('alertas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Get()
  @ApiOperation({
    summary: 'Obter alertas de inatividade',
    description:
      'Retorna lista de alertas de municípios inativos, com resumo por categoria.',
  })
  @ApiQuery({
    name: 'tipo',
    required: false,
    enum: ['SEM_REUNIAO', 'SEM_RELATORIO', 'CONSELHO_SUSPENSO', 'TODOS'],
    example: 'TODOS',
  })
  @ApiResponse({ status: 200, description: 'Alertas retornados com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getAlertas(@Query('tipo') tipo?: string): Promise<AlertasResponse> {
    return this.alertasService.getAlertas({ tipo });
  }

  @Post(':id/quebrar-silencio')
  @ApiOperation({
    summary: 'Quebrar silêncio de um município',
    description:
      'Registra a intenção de contato com um município inativo e notifica o gestor.',
  })
  @ApiResponse({ status: 200, description: 'Silêncio quebrado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async quebrarSilencio(
    @Param('id') id: string,
    @Request() req: { user: { sub: string } },
  ): Promise<{ message: string }> {
    return this.alertasService.quebrarSilencio(id, req.user.sub);
  }
}
