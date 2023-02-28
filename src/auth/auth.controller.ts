import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  async signup(@Body() req: SignupDto) {
    return await this.auth.signup(req);
  }

  @Post('login')
  login(@Body() req: LoginDto) {
    return this.auth.login(req);
  }
}
