import * as bcrypt from 'bcrypt';
import { createHash, randomBytes } from 'node:crypto';
import { Repository } from 'typeorm';
import { RefreshToken } from '../users/Entity/refresh-token.entity.js';

export class AuthUtil {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async generateAndSaveRefreshToken(
    refreshTokenRepository: Repository<RefreshToken>,
    userId: string,
    deviceInfo?: string,
  ): Promise<string> {
    const token = randomBytes(64).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const refreshToken = refreshTokenRepository.create({
      userId,
      tokenHash,
      deviceInfo,
      expiresAt,
    });

    await refreshTokenRepository.save(refreshToken);

    return token;
  }
}