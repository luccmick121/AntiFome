import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realizar login com email e senha' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(
    @Body() body: { email: string; senha: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const resultado = await this.authService.login(body);

    // Definir cookie HTTP-only com o token
    res.cookie('access_token', resultado.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 horas
      path: '/',
    });

    return {
      message: 'Login realizado com sucesso',
      usuario: resultado.usuario,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Realizar logout' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      path: '/',
    });

    return {
      message: 'Logout realizado com sucesso',
    };
  }

  @Get('me')
  @ApiOperation({ summary: 'Obter dados do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  async me(@Headers('cookie') cookie: string) {
    // Extrair token do cookie
    const token = this.extrairTokenDoCookie(cookie);
    if (!token) {
      return { error: 'Não autenticado', statusCode: HttpStatus.UNAUTHORIZED };
    }

    const usuario = await this.authService.verificarToken(token);
    return { usuario };
  }

  private extrairTokenDoCookie(cookie: string | undefined): string | null {
    if (!cookie) return null;
    const match = cookie.match(/access_token=([^;]+)/);
    return match ? match[1] : null;
  }
}
