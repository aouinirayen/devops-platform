import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const header: string | undefined = req.headers['authorization'];
    const [type, token] = header?.split(' ') ?? [];
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Token manquant');
    }
    try {
      req.user = await this.jwt.verifyAsync(token);
    } catch {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
    return true;
  }
}
