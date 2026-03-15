import { Module } from '@nestjs/common';
import { MapaController } from './mapa.controller';
import { MapaService } from './mapa.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MapaController],
  providers: [MapaService],
  exports: [MapaService],
})
export class MapaModule {}
