import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './Entity/organization.entity.js';
import { User } from '../users/Entity/user.entity.js';
import { OrganizationService } from './organization.service.js';
import { OrganizationController } from './organization.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization, User]),
  ],
  providers: [OrganizationService],
  controllers: [OrganizationController],
})
export class OrganizationsModule {}