import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './Entity/mission.entity.js';
import { MissionAssignment } from './Entity/mission-assignment.entity.js';
import {MissionService} from "./mission.service.js";
import {MissionController} from "./mission.controller.js";
import {Organization} from "../organizations/Entity/organization.entity.js";
import {User} from "../users/Entity/user.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Mission, MissionAssignment , Organization , User])],
  providers:[MissionService] ,
  controllers : [MissionController] ,
  exports: [TypeOrmModule],
})
export class MissionsModule {}