import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(email: string, password: string) {
    const normalized = email.toLowerCase();
    if (await this.users.findByEmail(normalized)) {
      throw new ConflictException('Cet email est déjà utilisé');
    }
    const passwordHash = await hash(password, 12);
    const user = await this.users.create(normalized, passwordHash);
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email.toLowerCase());
    // Même message pour email inconnu et mauvais mot de passe
    if (!user || !(await compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken };
  }
}
