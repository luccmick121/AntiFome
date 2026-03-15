// Script para gerar GeoJSON dos municípios do RS
// Executar: npx ts-node scripts/gerar-geojson.ts

import * as fs from 'fs';
import * as path from 'path';
import { municipiosRS } from '../prisma/data/municipios-rs';

interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: {
    codigo_ibge: string;
    nome: string;
  };
}

interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// Criar polígono simples (hexágono aproximado) ao redor do centroide
function criarPoligono(lat: number, lng: number, deltaLat: number, deltaLng: number): number[][][] {
  // Criar um polígono com 6 lados para parecer mais natural
  const pontos: number[][] = [];

  for (let i = 0; i < 6; i++) {
    const angulo = (Math.PI / 3) * i;
    // Variação aleatória para tornar o polígono menos regular
    const variacao = 0.7 + Math.random() * 0.6;
    const x = lng + Math.cos(angulo) * deltaLng * variacao;
    const y = lat + Math.sin(angulo) * deltaLat * variacao;
    pontos.push([x, y]);
  }

  // Fechar o polígono (primeiro ponto = último)
  pontos.push([...pontos[0]]);

  return [pontos];
}

// Tamanho do polígono baseado na população
function calcularDelta(populacao: number): { deltaLat: number; deltaLng: number } {
  // Cidades maiores = polígonos maiores
  if (populacao > 500000) return { deltaLat: 0.15, deltaLng: 0.18 };
  if (populacao > 200000) return { deltaLat: 0.12, deltaLng: 0.14 };
  if (populacao > 100000) return { deltaLat: 0.10, deltaLng: 0.12 };
  if (populacao > 50000) return { deltaLat: 0.08, deltaLng: 0.10 };
  if (populacao > 20000) return { deltaLat: 0.06, deltaLng: 0.08 };
  return { deltaLat: 0.04, deltaLng: 0.06 };
}

function gerarGeoJSON(): GeoJSONFeatureCollection {
  console.log(`Gerando GeoJSON para ${municipiosRS.length} municípios...`);

  const features: GeoJSONFeature[] = municipiosRS.map((municipio, index) => {
    const { deltaLat, deltaLng } = calcularDelta(municipio.populacao);

    // Seed aleatório baseado no código IBGE para consistência
    const seed = parseInt(municipio.codigo_ibge) % 1000;
    Math.random(); // Avançar o random para consistência

    const feature: GeoJSONFeature = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: criarPoligono(
          municipio.latitude,
          municipio.longitude,
          deltaLat,
          deltaLng
        ),
      },
      properties: {
        codigo_ibge: municipio.codigo_ibge,
        nome: municipio.nome,
      },
    };

    if ((index + 1) % 100 === 0) {
      console.log(`  ${index + 1}/${municipiosRS.length} processados...`);
    }

    return feature;
  });

  console.log(`✅ ${features.length} features geradas`);

  return {
    type: 'FeatureCollection',
    features,
  };
}

// Executar
const geojson = gerarGeoJSON();

// Salvar arquivo
const outputPath = path.join(__dirname, '..', 'public', 'data', 'rs-municipios-geojson.json');

// Criar diretório se não existir
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2), 'utf-8');

const tamanhoKB = Math.round(fs.statSync(outputPath).size / 1024);
console.log(`\n✅ GeoJSON salvo em: ${outputPath}`);
console.log(`📊 Tamanho: ${tamanhoKB} KB`);
console.log(`📍 Features: ${geojson.features.length}`);
