import { IsString } from 'class-validator';

export class CreateBookmarkDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsString()
  link: string;
}
