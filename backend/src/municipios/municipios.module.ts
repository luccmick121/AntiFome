import { Module } from '@nestjs/common';
import { MunicipiosController } from './municipios.controller';
import { MunicipiosService } from './municipios.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MunicipiosController],
  providers: [MunicipiosService],
  exports: [MunicipiosService],
})
export class MunicipiosModule {}
