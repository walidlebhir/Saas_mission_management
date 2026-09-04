import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/Entity/user.entity.js';
import { RefreshToken } from '../users/Entity/refresh-token.entity.js';
import { RegisterRequest } from './Dto/RegisterRequest.js';
import { LoginRequest } from './Dto/LoginRequest.js';
import { AuthUtil } from './auth.utils.js';
import { Role } from '../users/Entity/enum/Role.js';
import {
  ResourceExistsException,
  InvalidCredentialsException,
  InternalServerErrorException,
} from '../common/exception/index.js';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly RefreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async register(datarequest: RegisterRequest, deviceInfo?: string) {
    const userExists = await this.UserRepository.findOne({
      where: { email: datarequest.email },
    });
    if (userExists !== null) {
      throw new ResourceExistsException('Cet email est déjà utilisé');
    }

    try {
      const passwordHash = await AuthUtil.hashPassword(datarequest.password);

      const user = this.UserRepository.create({
        firstName: datarequest.firstName,
        lastName: datarequest.lastName,
        email: datarequest.email,
        role: Role.Finance,
        passwordHash,
      });

      const savedUser = await this.UserRepository.save(user);

      const accessToken = await this.generateToken({
        id: savedUser.id,
        email: savedUser.email,
        role: savedUser.role,
      });

      const refreshToken = await AuthUtil.generateAndSaveRefreshToken(
        this.RefreshTokenRepository,
        savedUser.id,
        deviceInfo,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      const message =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Erreur lors de l\'inscription',
        message,
      );
    }
  }

  async login(datarequest: LoginRequest, deviceInfo?: string) {
    const user = await this.UserRepository.findOne({
      where: { email: datarequest.email },
    });
    if (user === null) {
      throw new InvalidCredentialsException();
    }

    const passwordValid = await bcrypt.compare(
      datarequest.password,
      user.passwordHash,
    );
    if (!passwordValid) {
      throw new InvalidCredentialsException();
    }

    const accessToken = await this.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await AuthUtil.generateAndSaveRefreshToken(
      this.RefreshTokenRepository,
      user.id,
      deviceInfo,
    );

    return { accessToken, refreshToken };
  }

  async generateToken(user: AuthUser): Promise<string> {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtService.signAsync(payload);
  }
}