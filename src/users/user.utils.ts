import * as bcrypt from 'bcrypt';

export class UserUtil {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}