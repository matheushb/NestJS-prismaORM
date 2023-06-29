import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async login(userinfo: UserLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: userinfo.email,
      },
    });

    if (!user || !(await bcrypt.compare(userinfo.password, user.password))) {
      throw new NotFoundException('Credentials dont match');
    }
    delete user.password;
    return {
      user,
      token: await this.signToken(user.id, user.email),
    };
  }

  async signup(userdata: UserSignupDto) {
    userdata.password = bcrypt.hashSync(userdata.password, 12);

    try {
      const newUser = await this.prismaService.user.create({
        data: {
          email: userdata.email,
          name: userdata.name,
          password: userdata.password,
          age: userdata.age,
        },
      });

      delete newUser.password;
      return {
        newUser,
        token: await this.signToken(newUser.id, newUser.email),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }

  signToken(id: number, email: string): Promise<string> {
    return this.jwt.signAsync(
      { sub: id, email: email },
      { expiresIn: process.env.JWT_EXPIRES_IN, secret: process.env.JWT_SECRET },
    );
  }
}
