'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tab, Tabs } from '@/components/ui/tabs';
import {
  Target,
  Users,
  Phone,
  Mail,
  MapPin,
  FileText,
  BookOpen,
  ExternalLink,
  Download,
  CheckCircle,
  ArrowRight,
  Building,
  Scale,
  Heart,
} from 'lucide-react';

const MISSAO = {
  titulo: 'CONSEA-RS',
  subtitulo: 'Conselho Estadual de Segurança Alimentar e Nutricional',
  descricao:
    'O CONSEA-RS é o órgão colegiado de caráter consultivo e permanente, vinculado ao Governo do Estado do Rio Grande do Sul, com a finalidade de propor, acompanhar e avaliar a Política Estadual de Segurança Alimentar e Nutricional.',
  objetivos: [
    'Formular e avaliar a Política Estadual de Segurança Alimentar e Nutricional (SAN)',
    'Promover a articulação entre conselhos municipais de SAN',
    'Acompanhar e avaliar a implementação do Sistema Estadual de SAN (SISAN)',
    'Fomentar a participação popular nas discussões sobre segurança alimentar',
    'Propor ações para garantir o direito humano à alimentação adequada',
    'Articular com órgãos governamentais e sociedade civil',
  ],
};

const CONTATO = {
  telefone: '(51) 3288-6000',
  email: 'consea-rs@sedes.rs.gov.br',
  endereco: 'Av. Ipiranga, 1481 - Praia de Belas, Porto Alegre - RS',
  horario: 'Segunda a Sexta, 9h às 18h',
};

const ETAPAS_CRIACAO = [
  {
    numero: 1,
    titulo: 'Mobilização Social',
    descricao: 'Reúna lideranças comunitárias, movimentos sociais e representantes de entidades interessadas em segurança alimentar.',
    icone: Users,
  },
  {
    numero: 2,
    titulo: 'Contato com CONSEA-RS',
    descricao: 'Entre em contato com o CONSEA-RS para orientações sobre o processo de criação do conselho municipal.',
    icone: Phone,
  },
  {
    numero: 3,
    titulo: 'Lei de Criação',
    descricao: 'Elabore e encaminhe projeto de lei à Câmara Municipal para criação formal do conselho.',
    icone: Scale,
  },
  {
    numero: 4,
    titulo: 'Composição do Conselho',
    descricao: 'Defina a composição com representantes do governo e da sociedade civil (mínimo 2/3 sociedade civil).',
    icone: Building,
  },
  {
    numero: 5,
    titulo: 'Regimento Interno',
    descricao: 'Elabore e aprove o regimento interno definindo funcionamento, competências e procedimentos.',
    icone: FileText,
  },
  {
    numero: 6,
    titulo: 'Implementação do SISAN',
    descricao: 'Aderir ao Sistema Nacional de Segurança Alimentar e Nutricional (SISAN).',
    icone: CheckCircle,
  },
];

const LINKS_UTEIS = [
  {
    categoria: 'Legislação',
    links: [
      { titulo: 'Lei Orgânica de SAN (Lei 11.346/2006)', url: '#' },
      { titulo: 'Lei do SISAN (Lei 11.947/2009)', url: '#' },
      { titulo: 'Decreto 7.272/2010 - SISAN', url: '#' },
      { titulo: 'Constituição Federal - Art. 227', url: '#' },
    ],
  },
  {
    categoria: 'Documentos',
    links: [
      { titulo: 'Guia de Criação de CONSEA Municipal', url: '#' },
      { titulo: 'Manual do Conselheiro', url: '#' },
      { titulo: 'Modelo de Regimento Interno', url: '#' },
      { titulo: 'Plano Municipal de SAN - Modelo', url: '#' },
    ],
  },
  {
    categoria: 'Recursos',
    links: [
      { titulo: 'Portal Nacional do CONSEA', url: '#' },
      { titulo: 'Programa Nacional de Alimentação Escolar', url: '#' },
      { titulo: 'Cadastro Único - CadÚnico', url: '#' },
      { titulo: 'Rede PENSSAN', url: '#' },
    ],
  },
];

export default function GestaoConseaPage() {
  const [abaAtiva, setAbaAtiva] = useState('missao');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1A2F23]">Gestão CONSEA</h1>
        <p className="text-gray-500">
          Informações sobre o Conselho Estadual de Segurança Alimentar e Nutricional do RS
        </p>
      </div>

      <Tabs
        aria-label="Seções da gestão CONSEA"
        selectedKey={abaAtiva}
        onSelectionChange={(key) => setAbaAtiva(String(key))}
        classNames={{
          tabList: 'border-default-200 bg-white',
          tabContent: 'flex items-center gap-2',
          panel: 'pt-6',
        }}
      >
        <Tab
          key="missao"
          title={
            <>
              <Target className="h-4 w-4" />
              <span>Missão</span>
            </>
          }
        >
          <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#1A2F23] flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle>{MISSAO.titulo}</CardTitle>
                  <p className="text-sm text-gray-500">{MISSAO.subtitulo}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">{MISSAO.descricao}</p>
              <h3 className="font-semibold text-[#1A2F23] mb-3">Objetivos</h3>
              <ul className="space-y-2">
                {MISSAO.objetivos.map((objetivo, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{objetivo}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          </div>
        </Tab>

        <Tab
          key="contato"
          title={
            <>
              <Phone className="h-4 w-4" />
              <span>Contato</span>
            </>
          }
        >
          <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações de Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#1A2F23]" />
                <div>
                  <p className="text-sm text-gray-500">Telefone</p>
                  <p className="font-medium">{CONTATO.telefone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#1A2F23]" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{CONTATO.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#1A2F23] flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Endereço</p>
                  <p className="font-medium">{CONTATO.endereco}</p>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <Button className="bg-[#1A2F23]">
                  <Phone className="w-4 h-4 mr-2" />
                  Entrar em Contato
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Guia PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Horário de Atendimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{CONTATO.horario}</p>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Dica:</strong> Para questões urgentes sobre insegurança alimentar,
                  entre em contato com o Disque Alimentação: 121.
                </p>
              </div>
            </CardContent>
          </Card>
          </div>
        </Tab>

        <Tab
          key="guia"
          title={
            <>
              <BookOpen className="h-4 w-4" />
              <span>Guia de Criação</span>
            </>
          }
        >
          <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Como Criar um Conselho Municipal de SAN</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Siga estas etapas para criar um conselho municipal de segurança alimentar
                e nutricional em seu município:
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ETAPAS_CRIACAO.map((etapa) => {
              const Icon = etapa.icone;
              return (
                <Card key={etapa.numero} className="relative">
                  <CardContent className="p-6">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-[#1A2F23]">{etapa.numero}</Badge>
                    </div>
                    <Icon className="w-8 h-8 text-[#1A2F23] mb-3" />
                    <h3 className="font-semibold text-[#1A2F23] mb-2">{etapa.titulo}</h3>
                    <p className="text-sm text-gray-600">{etapa.descricao}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800">Precisa de ajuda?</h3>
                  <p className="text-sm text-green-700 mt-1">
                    O CONSEA-RS oferece apoio técnico para municípios que desejam criar
                    ou reativar seus conselhos municipais. Entre em contato conosco!
                  </p>
                  <Button className="mt-4 bg-green-700 hover:bg-green-800">
                    Solicitar Apoio
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </Tab>

        <Tab
          key="links"
          title={
            <>
              <ExternalLink className="h-4 w-4" />
              <span>Links Úteis</span>
            </>
          }
        >
          <div className="space-y-4">
          {LINKS_UTEIS.map((categoria) => (
            <Card key={categoria.categoria}>
              <CardHeader>
                <CardTitle className="text-lg">{categoria.categoria}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {categoria.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-[#1A2F23] flex-shrink-0" />
                      <span className="text-sm text-[#1A2F23]">{link.titulo}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
