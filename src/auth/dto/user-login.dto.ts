import { IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
