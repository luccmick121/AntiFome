import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

export interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  properties: {
    codigo_ibge: string;
    nome: string;
    status: string;
    indice_antifome: number;
    populacao: number;
    [key: string]: unknown;
  };
}

export interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

@Injectable()
export class MapaService implements OnModuleInit {
  private readonly logger = new Logger(MapaService.name);

  // Cache em memória (1 hora TTL)
  private geojsonCache: {
    data: GeoJSONFeatureCollection;
    expiresAt: number;
  } | null = null;
  private readonly CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

  // GeoJSON base do IBGE (carregado na inicialização)
  private geojsonBase: GeoJSONFeatureCollection | null = null;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // Carregar GeoJSON base na inicialização
    await this.carregarGeoJSONBase();
  }

  private async carregarGeoJSONBase(): Promise<void> {
    try {
      const geojsonPath = path.join(
        process.cwd(),
        'public',
        'data',
        'rs-municipios-geojson.json',
      );

      if (fs.existsSync(geojsonPath)) {
        const data = fs.readFileSync(geojsonPath, 'utf-8');
        this.geojsonBase = JSON.parse(data);
        this.logger.log(
          `GeoJSON base carregado: ${this.geojsonBase?.features.length ?? 0} features`,
        );
      } else {
        this.logger.warn(
          'Arquivo GeoJSON base não encontrado. Use o endpoint para gerar dados mock.',
        );
      }
    } catch (error) {
      this.logger.error('Erro ao carregar GeoJSON base:', error);
    }
  }

  async getGeoJSON(): Promise<GeoJSONFeatureCollection> {
    // Verificar cache
    if (this.geojsonCache && Date.now() < this.geojsonCache.expiresAt) {
      this.logger.debug('Retornando GeoJSON do cache');
      return this.geojsonCache.data;
    }

    this.logger.debug('Gerando GeoJSON com dados do banco');

    // Buscar todos os municípios com status e índice
    const municipios = await this.prisma.municipio.findMany({
      select: {
        codigo_ibge: true,
        nome: true,
        status: true,
        indice_antifome: true,
        populacao: true,
        latitude: true,
        longitude: true,
      },
    });

    // Criar mapa para lookup rápido
    const municipioMap = new Map(municipios.map((m) => [m.codigo_ibge, m]));

    let featureCollection: GeoJSONFeatureCollection;

    if (this.geojsonBase) {
      // Merge GeoJSON base com dados do banco
      featureCollection = {
        type: 'FeatureCollection',
        features: this.geojsonBase.features.map((feature) => {
          const codigoIbge = feature.properties.codigo_ibge;
          const municipio = municipioMap.get(codigoIbge);

          return {
            ...feature,
            properties: {
              ...feature.properties,
              status: municipio?.status ?? 'DESCONHECIDO',
              indice_antifome: municipio?.indice_antifome ?? 0,
              populacao: municipio?.populacao ?? 0,
            },
          };
        }),
      };
    } else {
      // Gerar features mock com base nos dados do banco
      featureCollection = {
        type: 'FeatureCollection',
        features: municipios.map((m) => this.criarFeatureMock(m)),
      };
    }

    // Atualizar cache
    this.geojsonCache = {
      data: featureCollection,
      expiresAt: Date.now() + this.CACHE_TTL_MS,
    };

    return featureCollection;
  }

  async getGeoJSONByMunicipio(codigoIbge: string): Promise<GeoJSONFeature> {
    const municipio = await this.prisma.municipio.findUnique({
      where: { codigo_ibge: codigoIbge },
    });

    if (!municipio) {
      throw new NotFoundException(
        `Município com código IBGE ${codigoIbge} não encontrado`,
      );
    }

    // Se temos o GeoJSON base, buscar a feature correspondente
    if (this.geojsonBase) {
      const feature = this.geojsonBase.features.find(
        (f) => f.properties.codigo_ibge === codigoIbge,
      );

      if (feature) {
        return {
          ...feature,
          properties: {
            ...feature.properties,
            status: municipio.status,
            indice_antifome: municipio.indice_antifome,
            populacao: municipio.populacao,
          },
        };
      }
    }

    // Fallback: criar feature mock
    return this.criarFeatureMock(municipio);
  }

  private criarFeatureMock(municipio: {
    codigo_ibge: string;
    nome: string;
    status: string;
    indice_antifome: number;
    populacao: number;
    latitude: number | null;
    longitude: number | null;
  }): GeoJSONFeature {
    // Criar polígono simples ao redor do centroide
    const lat = municipio.latitude ?? -29.5;
    const lng = municipio.longitude ?? -53.0;
    const delta = 0.05; // Aproximadamente 5km

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [lng - delta, lat - delta],
            [lng + delta, lat - delta],
            [lng + delta, lat + delta],
            [lng - delta, lat + delta],
            [lng - delta, lat - delta],
          ],
        ],
      },
      properties: {
        codigo_ibge: municipio.codigo_ibge,
        nome: municipio.nome,
        status: municipio.status,
        indice_antifome: municipio.indice_antifome,
        populacao: municipio.populacao,
      },
    };
  }

  // Invalidar cache (útil quando dados são atualizados)
  invalidateCache(): void {
    this.geojsonCache = null;
    this.logger.debug('Cache do GeoJSON invalidado');
  }
}
