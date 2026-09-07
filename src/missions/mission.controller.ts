import {Body, Controller, Get, HttpCode, HttpStatus, Post} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {MissionService} from "./mission.service.js";
import {MissionRequest} from "./Dto/MissionRequest.js";
import type {SafeUser} from "../users/user.service.js";
import {CurrentUser} from "../auth/decorators/current-user.decorator.js";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard.js";

@ApiTags('Missions')
@Controller('missions')
export class MissionController {
    constructor(private readonly missionService: MissionService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Créer une nouvelle mission" })
    @HttpCode(HttpStatus.CREATED)
    createMission(
        @Body() dto: MissionRequest,
        @CurrentUser() user: SafeUser,
    ) {
        return this.missionService.CreateNewMission(dto, user);
    }

    @Get('statuses')
    @ApiOperation({ summary: "Liste des statuts de mission disponibles" })
    getMissionStatuses() {
        return this.missionService.getMissionStatuses();
    }

    @Get('expense-categories')
    @ApiOperation({ summary: "Liste des catégories de dépenses disponibles" })
    getExpenseCategories() {
        return this.missionService.getExpenseCategories();
    }
}