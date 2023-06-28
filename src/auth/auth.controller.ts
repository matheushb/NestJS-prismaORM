import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserSignupDto } from './dto/user-signup.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login() {
    return this.authService.login();
  }

  @Post('/signup')
  signup(@Body() userSingupDto: UserSignupDto) {
    return this.authService.signup(userSingupDto);
  }
}
