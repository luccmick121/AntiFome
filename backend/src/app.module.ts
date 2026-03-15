import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { ConselhosModule } from './conselhos/conselhos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MapaModule } from './mapa/mapa.module';
import { RankingModule } from './ranking/ranking.module';
import { AlertasModule } from './alertas/alertas.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MunicipiosModule,
    ConselhosModule,
    DashboardModule,
    MapaModule,
    RankingModule,
    AlertasModule,
    HealthModule,
  ],
})
export class AppModule {}
