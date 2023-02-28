import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';
import { salt } from 'src/utils';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';

Injectable();
export class AuthService {
  prisma: PrismaService;
  constructor() {
    this.prisma = new PrismaService();
  }

  async signup(req: SignupDto) {
    const hash: string = bcrypt.hashSync(req.password, salt);
    const check = await this.prisma.user.findFirst({
      where: { email: req.email },
    });

    if (check != null) throw new ForbiddenException('User already exists');

    try {
      const user = await this.prisma.user.create({
        data: {
          email: req.email,
          password: hash,
          name: req.name,
        },
      });

      const token = 'Bearer ' + jwt.sign(user.email, process.env.JWT_SECRET!);
      return { statusCode: 200, user, token };
    } catch (e) {
      throw new ForbiddenException('Signup failed');
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      var user = await this.prisma.user.findFirst({
        where: { email },
      });
    } catch (e) {
      throw new Error(e.message);
    }

    if (user == null) throw new NotFoundException('User not found');

    const passwordvalid = bcrypt.compareSync(password, user.password);

    if (!passwordvalid) throw new UnauthorizedException('Invalid password');

    const token = 'Bearer ' + jwt.sign(user.email, process.env.JWT_SECRET!);

    return { statusCode: 200, user, token };
  }
}
