import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Conectar ao banco de dados ao iniciar o módulo
    await this.$connect();
  }

  async onModuleDestroy() {
    // Desconectar ao destruir o módulo
    await this.$disconnect();
  }
}
