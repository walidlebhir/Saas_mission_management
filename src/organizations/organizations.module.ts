import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Organization} from "./Entity/organization.entity.js";


@Module({
    imports : [
        TypeOrmModule.forFeature([
            Organization
        ])
    ],
})
export class OrganizationsModule {}
