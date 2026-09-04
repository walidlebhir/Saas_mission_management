import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Role } from '../Entity/enum/Role.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(8, 72)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message:
      'password must contain at least one lowercase letter, one uppercase letter and one number',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @Length(2, 100)
  department?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}