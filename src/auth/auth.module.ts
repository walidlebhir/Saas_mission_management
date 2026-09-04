import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { User } from '../users/Entity/user.entity.js';
import { RefreshToken } from '../users/Entity/refresh-token.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, RefreshToken]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): { secret: string; signOptions: JwtSignOptions } => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret',
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ||
            '15m') as JwtSignOptions['expiresIn'],
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}