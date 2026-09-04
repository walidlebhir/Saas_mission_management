import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 72)
  password: string;
}