import { Module } from '@nestjs/common';
import { ConselhosController } from './conselhos.controller';
import { ConselhosService } from './conselhos.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ConselhosController],
  providers: [ConselhosService],
  exports: [ConselhosService],
})
export class ConselhosModule {}
