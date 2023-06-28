import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserSignupDto } from './dto/user-signup.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  login() {}

  signup(userdata: UserSignupDto) {
    return userdata;
  }
}
