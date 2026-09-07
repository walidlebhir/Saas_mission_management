import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
import { RegisterRequest } from './Dto/RegisterRequest.js';
import { LoginRequest } from './Dto/LoginRequest.js';
import type { SafeUser } from '../users/user.service.js';

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

  @Get('check-connection')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check if the current user is connected' })
  checkConnection(@CurrentUser() user: SafeUser) {
    return this.authService.checkConnection(user.id);
  }


}