import { Module } from '@nestjs/common';
import { AlertasController } from './alertas.controller';
import { AlertasService } from './alertas.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AlertasController],
  providers: [AlertasService],
  exports: [AlertasService],
})
export class AlertasModule {}
