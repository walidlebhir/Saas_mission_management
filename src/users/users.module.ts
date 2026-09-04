import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './Entity/user.entity.js';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}