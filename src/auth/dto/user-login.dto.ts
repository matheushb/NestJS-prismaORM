import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
