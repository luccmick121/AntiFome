import 'dotenv/config';
import { PrismaClient, StatusMunicipio, StatusConselho, Cargo, TipoReuniao, NivelGravidade, TipoSelo, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { municipiosRS } from './data/municipios-rs';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Utilitário para gerar número aleatório entre min e max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Utilitário para selecionar elemento aleatório de array
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Utilitário para distribuir status proporcionalmente
function distribuirStatus(total: number): StatusMunicipio[] {
  const ativo = Math.floor(total * 0.71); // 353
  const inativo = Math.floor(total * 0.17); // 84
  const atrasado = total - ativo - inativo; // 60

  const status: StatusMunicipio[] = [
    ...Array(ativo).fill(StatusMunicipio.ATIVO),
    ...Array(inativo).fill(StatusMunicipio.INATIVO),
    ...Array(atrasado).fill(StatusMunicipio.ATRASADO),
  ];

  // Embaralhar
  for (let i = status.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [status[i], status[j]] = [status[j], status[i]];
  }

  return status;
}

// Calcular índice antifome baseado no status
function calcularIndiceAntifome(status: StatusMunicipio): number {
  switch (status) {
    case StatusMunicipio.ATIVO:
      return parseFloat((Math.random() * 3.5 + 6.0).toFixed(1)); // 6.0 - 9.5
    case StatusMunicipio.ATRASADO:
      return parseFloat((Math.random() * 2.9 + 3.0).toFixed(1)); // 3.0 - 5.9
    case StatusMunicipio.INATIVO:
      return parseFloat((Math.random() * 2.9).toFixed(1)); // 0.0 - 2.9
    default:
      return 0;
  }
}

// Nomes fictícios para membros
const nomes = [
  'Maria Silva', 'João Santos', 'Ana Oliveira', 'Pedro Souza', 'Carla Lima',
  'José Ferreira', 'Lucia Costa', 'Francisco Almeida', 'Antônia Pereira', 'Manoel Rodrigues',
  'Teresa Gomes', 'Raimundo Martins', 'Helena Ribeiro', 'Luiz Carvalho', 'Rosa Araújo',
  'Carlos Nascimento', 'Diana Melo', 'Miguel Cardoso', 'Beatriz Freitas', 'Antônio Dias',
  'Gabriela Correia', 'Roberto Teixeira', 'Fernanda Campos', 'Paulo Moreira', 'Juliana Barbosa',
];

// Nomes de conselhos
const nomesConselhos = [
  'Conselho Municipal de Segurança Alimentar e Nutricional',
  'CONSEA Municipal',
  'Conselho de Alimentação Escolar',
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // 1. Criar Estado RS
  console.log('📍 Criando estado Rio Grande do Sul...');
  const estadoRS = await prisma.estado.upsert({
    where: { sigla: 'RS' },
    update: {},
    create: {
      nome: 'Rio Grande do Sul',
      sigla: 'RS',
    },
  });
  console.log(`✅ Estado criado: ${estadoRS.nome} (${estadoRS.sigla})`);

  // 2. Distribuir status
  const statusDistribuicao = distribuirStatus(municipiosRS.length);

  // 3. Criar Municípios
  console.log('🏘️ Criando 497 municípios...');
  const municipiosCriados = [];

  for (let i = 0; i < municipiosRS.length; i++) {
    const municipioData = municipiosRS[i];
    const status = statusDistribuicao[i];
    const indiceAntifome = calcularIndiceAntifome(status);

    const municipio = await prisma.municipio.upsert({
      where: { codigo_ibge: municipioData.codigo_ibge },
      update: {},
      create: {
        codigo_ibge: municipioData.codigo_ibge,
        nome: municipioData.nome,
        estado_id: estadoRS.id,
        populacao: municipioData.populacao,
        latitude: municipioData.latitude,
        longitude: municipioData.longitude,
        status,
        indice_antifome: indiceAntifome,
      },
    });

    municipiosCriados.push({ ...municipio, statusOriginal: status });

    if ((i + 1) % 100 === 0) {
      console.log(`  📊 ${i + 1}/${municipiosRS.length} municípios criados...`);
    }
  }
  console.log(`✅ ${municipiosCriados.length} municípios criados`);

  // 4. Criar Conselhos (para ~80% dos ATIVOS, alguns ATRASADOS)
  console.log('🏛️ Criando conselhos...');
  let conselhosCount = 0;

  for (const municipio of municipiosCriados) {
    if (municipio.statusOriginal === StatusMunicipio.ATIVO && Math.random() < 0.8) {
      await prisma.conselho.create({
        data: {
          municipio_id: municipio.id,
          nome: randomChoice(nomesConselhos) + ' de ' + municipio.nome,
          status: StatusConselho.ATIVO,
        },
      });
      conselhosCount++;
    } else if (municipio.statusOriginal === StatusMunicipio.ATRASADO && Math.random() < 0.4) {
      await prisma.conselho.create({
        data: {
          municipio_id: municipio.id,
          nome: randomChoice(nomesConselhos) + ' de ' + municipio.nome,
          status: Math.random() < 0.5 ? StatusConselho.SUSPENSO : StatusConselho.INATIVO,
        },
      });
      conselhosCount++;
    }
  }
  console.log(`✅ ${conselhosCount} conselhos criados`);

  // 5. Criar Membros (3-5 por conselho)
  console.log('👥 Criando membros dos conselhos...');
  const conselhos = await prisma.conselho.findMany();
  let membrosCount = 0;

  for (const conselho of conselhos) {
    if (conselho.status === StatusConselho.ATIVO) {
      const numMembros = randomInt(3, 5);

      // Sempre criar presidente primeiro
      await prisma.membro.create({
        data: {
          conselho_id: conselho.id,
          nome: randomChoice(nomes),
          cargo: Cargo.PRESIDENTE,
          email: `presidente.${conselho.id.slice(0, 6)}@exemplo.com`,
          telefone: `(51) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
        },
      });
      membrosCount++;

      // Criar vice
      await prisma.membro.create({
        data: {
          conselho_id: conselho.id,
          nome: randomChoice(nomes),
          cargo: Cargo.VICE,
          email: `vice.${conselho.id.slice(0, 6)}@exemplo.com`,
          telefone: `(51) 9${randomInt(1000, 9999)}-${randomInt(1000, 9999)}`,
        },
      });
      membrosCount++;

      // Criar membros adicionais
      for (let m = 2; m < numMembros; m++) {
        await prisma.membro.create({
          data: {
            conselho_id: conselho.id,
            nome: randomChoice(nomes),
            cargo: Cargo.MEMBRO,
            email: `membro${m}.${conselho.id.slice(0, 6)}@exemplo.com`,
          },
        });
        membrosCount++;
      }
    }
  }
  console.log(`✅ ${membrosCount} membros criados`);

  // 6. Criar Reuniões (6-12 por conselho ativo)
  console.log('📅 Criando reuniões...');
  let reunioesCount = 0;

  for (const conselho of conselhos) {
    if (conselho.status === StatusConselho.ATIVO) {
      const numReunioes = randomInt(6, 12);
      const agora = new Date();

      for (let r = 0; r < numReunioes; r++) {
        const dataReuniao = new Date(agora);
        dataReuniao.setMonth(agora.getMonth() - r);

        await prisma.reuniao.create({
          data: {
            conselho_id: conselho.id,
            data: dataReuniao,
            tipo: Math.random() < 0.7 ? TipoReuniao.ORDINARIA : TipoReuniao.EXTRAORDINARIA,
            pauta: `Pauta da reunião ${r + 1} - Discussão de ações do plano municipal`,
            ata_url: Math.random() < 0.6 ? `https://docs.exemplo.com/ata-${conselho.id.slice(0, 6)}-${r}.pdf` : null,
          },
        });
        reunioesCount++;
      }
    }
  }
  console.log(`✅ ${reunioesCount} reuniões criadas`);

  // 7. Criar Relatórios Fome (6 meses)
  console.log('📊 Criando relatórios de fome...');
  let relatoriosCount = 0;
  const niveis = [NivelGravidade.BAIXO, NivelGravidade.MODERADO, NivelGravidade.ALTO, NivelGravidade.CRITICO];

  for (const municipio of municipiosCriados) {
    if (municipio.statusOriginal !== StatusMunicipio.INATIVO) {
      // Gerar 6 meses únicos dos últimos 12 meses
      const agora = new Date();
      const todosMeses: string[] = [];

      for (let m = 1; m <= 12; m++) {
        const dataRelatorio = new Date(agora);
        dataRelatorio.setMonth(agora.getMonth() - m);
        todosMeses.push(`${dataRelatorio.getFullYear()}-${String(dataRelatorio.getMonth() + 1).padStart(2, '0')}`);
      }

      // Embaralhar e pegar 6
      for (let i = todosMeses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todosMeses[i], todosMeses[j]] = [todosMeses[j], todosMeses[i]];
      }

      const mesesSelecionados = todosMeses.slice(0, 6);

      for (const mesAno of mesesSelecionados) {
        const nivelBase = municipio.statusOriginal === StatusMunicipio.ATIVO
          ? randomInt(0, 1)
          : randomInt(1, 3);

        await prisma.relatorioFome.upsert({
          where: {
            municipio_id_mes_ano: {
              municipio_id: municipio.id,
              mes_ano: mesAno,
            },
          },
          update: {},
          create: {
            municipio_id: municipio.id,
            mes_ano: mesAno,
            nivel_gravidade: niveis[nivelBase],
            dados_json: JSON.stringify({
              familias_atendidas: randomInt(50, 500),
              cestas_distribuidas: randomInt(30, 300),
              refeicoes_ofertadas: randomInt(100, 2000),
            }),
          },
        });
        relatoriosCount++;
      }
    }
  }
  console.log(`✅ ${relatoriosCount} relatórios criados`);

  // 8. Criar Selos
  console.log('🏆 Criando selos...');
  let selosCount = 0;
  const tiposSelo = [TipoSelo.BRONZE, TipoSelo.PRATA, TipoSelo.OURO, TipoSelo.PLATINA];

  for (const municipio of municipiosCriados) {
    if (municipio.statusOriginal === StatusMunicipio.ATIVO && municipio.indice_antifome >= 7) {
      const tipoSelo = municipio.indice_antifome >= 9
        ? TipoSelo.PLATINA
        : municipio.indice_antifome >= 8
          ? TipoSelo.OURO
          : TipoSelo.PRATA;

      await prisma.selo.create({
        data: {
          municipio_id: municipio.id,
          tipo: tipoSelo,
          conquistado_em: new Date(Date.now() - randomInt(30, 365) * 24 * 60 * 60 * 1000),
        },
      });
      selosCount++;
    } else if (municipio.statusOriginal === StatusMunicipio.ATIVO && municipio.indice_antifome >= 6) {
      await prisma.selo.create({
        data: {
          municipio_id: municipio.id,
          tipo: TipoSelo.BRONZE,
          conquistado_em: new Date(Date.now() - randomInt(30, 365) * 24 * 60 * 60 * 1000),
        },
      });
      selosCount++;
    }
  }
  console.log(`✅ ${selosCount} selos criados`);

  // 9. Criar Usuários de teste
  console.log('🔐 Criando usuários de teste...');
  const senhaHash = await bcrypt.hash('senha123', 10);

  // Admin
  await prisma.usuario.upsert({
    where: { email: 'admin@antifome.rs' },
    update: {},
    create: {
      email: 'admin@antifome.rs',
      senha_hash: senhaHash,
      role: Role.ADMIN,
    },
  });

  // Gestores Estaduais
  await prisma.usuario.upsert({
    where: { email: 'gestor1@antifome.rs' },
    update: {},
    create: {
      email: 'gestor1@antifome.rs',
      senha_hash: senhaHash,
      role: Role.GESTOR_ESTADUAL,
    },
  });

  await prisma.usuario.upsert({
    where: { email: 'gestor2@antifome.rs' },
    update: {},
    create: {
      email: 'gestor2@antifome.rs',
      senha_hash: senhaHash,
      role: Role.GESTOR_ESTADUAL,
    },
  });

  // Conselheiros (vinculados a conselhos ativos)
  const conselhosAtivos = conselhos.filter(c => c.status === StatusConselho.ATIVO).slice(0, 10);

  for (let i = 0; i < conselhosAtivos.length; i++) {
    const conselho = conselhosAtivos[i];
    await prisma.usuario.upsert({
      where: { email: `conselheiro${i + 1}@exemplo.com` },
      update: {},
      create: {
        email: `conselheiro${i + 1}@exemplo.com`,
        senha_hash: senhaHash,
        role: Role.CONSELHEIRO_MUNICIPAL,
        municipio_id: conselho.municipio_id,
      },
    });
  }

  console.log('✅ 13 usuários de teste criados');

  // Resumo final
  console.log('\n🎉 Seed concluído com sucesso!');
  console.log('📊 Resumo:');
  console.log(`  - Estados: 1 (RS)`);
  console.log(`  - Municípios: ${municipiosCriados.length}`);
  console.log(`  - Conselhos: ${conselhosCount}`);
  console.log(`  - Membros: ${membrosCount}`);
  console.log(`  - Reuniões: ${reunioesCount}`);
  console.log(`  - Relatórios: ${relatoriosCount}`);
  console.log(`  - Selos: ${selosCount}`);
  console.log(`  - Usuários: 13`);
  console.log('\n🔑 Credenciais de teste:');
  console.log('  Admin: admin@antifome.rs / senha123');
  console.log('  Gestor: gestor1@antifome.rs / senha123');
  console.log('  Conselheiro: conselheiro1@exemplo.com / senha123');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
