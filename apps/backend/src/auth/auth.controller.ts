import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './credentials.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register')
  register(@Body() dto: CredentialsDto) {
    return this.auth.register(dto.email, dto.password);
  }

  @Post('login')
  login(@Body() dto: CredentialsDto) {
    return this.auth.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req: { user: { sub: string; email: string; role: string } }) {
    return req.user;
  }
}
