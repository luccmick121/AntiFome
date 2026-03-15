import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

interface LoginDto {
  email: string;
  senha: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Validar credenciais do usuário
  async validateUser(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
      include: { municipio: true },
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return usuario;
  }

  // Realizar login e gerar token JWT
  async login(loginDto: LoginDto) {
    const usuario = await this.validateUser(loginDto.email, loginDto.senha);

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      role: usuario.role,
      municipioId: usuario.municipio_id,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        municipio_id: usuario.municipio_id,
        municipio_nome: usuario.municipio?.nome,
      },
    };
  }

  // Verificar token e retornar dados do usuário
  async verificarToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const usuario = await this.prisma.usuario.findUnique({
        where: { id: payload.sub },
        include: { municipio: true },
      });

      if (!usuario) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      return {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        municipio_id: usuario.municipio_id,
        municipio_nome: usuario.municipio?.nome,
      };
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }
}
