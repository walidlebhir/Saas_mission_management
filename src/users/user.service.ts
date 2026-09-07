import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './Entity/user.entity.js';
import { CreateUserDto } from './Dto/CreateUserDto.js';
import { UpdateUserDto } from './Dto/UpdateUserDto.js';
import { UserUtil } from './user.utils.js';
import {
  ResourceExistsException,
  NotFoundException,
  InternalServerErrorException,
} from '../common/exception/index.js';
import { Role } from './Entity/enum/Role.js';

export type SafeUser = Omit<
  User,
  'passwordHash' | 'inviteToken' | 'inviteExpiresAt'
>;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const existing = await this.UserRepository.findOne({
      where: { email: dto.email },
    });
    if (existing !== null) {
      throw new ResourceExistsException('Cet email est déjà utilisé');
    }

    try {
      const passwordHash = await UserUtil.hashPassword(dto.password);

      const user = this.UserRepository.create({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash,
        role: dto.role ?? Role.Finance,
      });

      return await this.UserRepository.save(user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      const message =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Erreur lors de la création de l\'utilisateur',
        message,
      );
    }
  }

  async getUsers(): Promise<User[]> {
    return this.UserRepository.find();
  }

  async getUsersByOrganization(organizationId: string): Promise<User[]> {
    return this.UserRepository.find({ where: { organizationId } });
  }

  async findById(id: string): Promise<User | null> {
    return this.UserRepository.findOne({ where: { id } });
  }

  sanitizeUser(user: User): SafeUser {
    const { passwordHash: _passwordHash, inviteToken: _inviteToken, inviteExpiresAt: _inviteExpiresAt, ...safeUser } = user;
    return safeUser as SafeUser;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (user === null) {
      throw new NotFoundException('Utilisateur introuvable');
    }
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    if (dto.email !== undefined && dto.email !== user.email) {
      const existing = await this.UserRepository.findOne({
        where: { email: dto.email },
      });
      if (existing !== null) {
        throw new ResourceExistsException('Cet email est déjà utilisé');
      }
    }

    try {
      const updated = this.UserRepository.merge(user, dto);
      if (dto.password !== undefined) {
        updated.passwordHash = await UserUtil.hashPassword(dto.password);
      }
      return await this.UserRepository.save(updated);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      const message =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'Erreur lors de la mise à jour de l\'utilisateur',
        message,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUserById(id);
    await this.UserRepository.remove(user);
  }


}