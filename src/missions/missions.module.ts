import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './Entity/mission.entity.js';
import { MissionAssignment } from './Entity/mission-assignment.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Mission, MissionAssignment])],
  exports: [TypeOrmModule],
})
export class MissionsModule {}