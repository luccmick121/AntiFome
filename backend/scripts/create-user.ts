import 'dotenv/config';
import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';

const connectionString = process.env.DATABASE_URL!;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Configurações do usuário a ser criado
  const email = 'admin@antifome.rs';
  const senha = 'admin123';
  const role = Role.ADMIN;

  console.log('👤 Criando usuário...');

  // Verificar se usuário já existe
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { email },
  });

  if (usuarioExistente) {
    console.log(`⚠️  Usuário ${email} já existe. Atualizando senha...`);

    const senhaHash = await bcrypt.hash(senha, 10);

    await prisma.usuario.update({
      where: { email },
      data: { senha_hash: senhaHash },
    });

    console.log(`✅ Senha atualizada para ${email}`);
  } else {
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.usuario.create({
      data: {
        email,
        senha_hash: senhaHash,
        role,
      },
    });

    console.log(`✅ Usuário criado com sucesso!`);
    console.log(`   ID: ${usuario.id}`);
    console.log(`   Email: ${usuario.email}`);
    console.log(`   Role: ${usuario.role}`);
  }

  console.log('\n📋 Credenciais de login:');
  console.log(`   Email: ${email}`);
  console.log(`   Senha: ${senha}`);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
