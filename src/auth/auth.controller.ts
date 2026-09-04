import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterRequest } from './Dto/RegisterRequest.js';
import { LoginRequest } from './Dto/LoginRequest.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  register(@Body() dto: RegisterRequest) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login a user' })
  login(@Body() dto: LoginRequest) {
    return this.authService.login(dto);
  }
}