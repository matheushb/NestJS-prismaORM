import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async login(userinfo: UserLoginDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: userinfo.email },
    });
    if (!user) throw new NotFoundException('Credentials dont match');

    const passwordCorrect = await bcrypt.compare(
      userinfo.password,
      user.password,
    );
    if (!passwordCorrect) throw new NotFoundException('Credentials dont match');

    return user;
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
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }
      throw error;
    }
  }
}
