import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {
  MapaService,
  GeoJSONFeatureCollection,
  GeoJSONFeature,
} from './mapa.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Mapa')
@Controller('mapa')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MapaController {
  constructor(private readonly mapaService: MapaService) {}

  @Get('geojson')
  @ApiOperation({
    summary: 'Obter GeoJSON de todos os municípios',
    description:
      'Retorna FeatureCollection GeoJSON com 497 features, incluindo status e índice antifome de cada município.',
  })
  @ApiResponse({
    status: 200,
    description: 'GeoJSON retornado com sucesso',
    schema: {
      type: 'object',
      properties: {
        type: { type: 'string', example: 'FeatureCollection' },
        features: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: { type: 'string', example: 'Feature' },
              geometry: {
                type: 'object',
                properties: {
                  type: { type: 'string', example: 'Polygon' },
                  coordinates: { type: 'array' },
                },
              },
              properties: {
                type: 'object',
                properties: {
                  codigo_ibge: { type: 'string', example: '4314902' },
                  nome: { type: 'string', example: 'Porto Alegre' },
                  status: { type: 'string', example: 'ATIVO' },
                  indice_antifome: { type: 'number', example: 8.5 },
                  populacao: { type: 'number', example: 1488252 },
                },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getGeoJSON(): Promise<GeoJSONFeatureCollection> {
    return this.mapaService.getGeoJSON();
  }

  @Get('geojson/:codigoIbge')
  @ApiOperation({
    summary: 'Obter GeoJSON de um município específico',
    description:
      'Retorna Feature GeoJSON de um único município pelo código IBGE.',
  })
  @ApiParam({
    name: 'codigoIbge',
    description: 'Código IBGE do município (7 dígitos)',
    example: '4314902',
  })
  @ApiResponse({
    status: 200,
    description: 'Feature do município retornada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Município não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async getGeoJSONByMunicipio(
    @Param('codigoIbge') codigoIbge: string,
  ): Promise<GeoJSONFeature> {
    return this.mapaService.getGeoJSONByMunicipio(codigoIbge);
  }
}
