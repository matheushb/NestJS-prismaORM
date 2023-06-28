import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserSignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  age: number;
}
