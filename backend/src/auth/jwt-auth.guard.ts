import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    if (!token) {
      throw new UnauthorizedException('Token de autenticação não encontrado');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado');
    }
  }

  private extractTokenFromCookie(request: Request): string | null {
    const cookies = request.headers.cookie;
    if (!cookies) return null;

    const match = cookies.match(/access_token=([^;]+)/);
    return match ? match[1] : null;
  }
}
