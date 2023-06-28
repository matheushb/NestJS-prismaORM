import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  login(userLoginDto: UserLoginDto) {
    this.prismaService.$queryRaw`SELECT * FROM User`;
  }

  signup(userdata: UserSignupDto) {
    return userdata;
  }
}
