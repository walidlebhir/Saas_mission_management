import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Patch, Post, UseGuards} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {MissionService} from "./mission.service.js";
import {MissionRequest} from "./Dto/MissionRequest.js";
import {UpdateMissionRequest} from "./Dto/UpdateMissionRequest.js";
import {AssignMissionRequest} from "./Dto/AssignMissionRequest.js";
import type {SafeUser} from "../users/user.service.js";
import {CurrentUser} from "../auth/decorators/current-user.decorator.js";
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

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Récupérer une mission par son ID" })
    @HttpCode(HttpStatus.OK)
    showMission(
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.missionService.ShowMission(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Mettre à jour une mission" })
    @HttpCode(HttpStatus.OK)
    updateMission(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: UpdateMissionRequest,
        @CurrentUser() user: SafeUser,
    ) {
        return this.missionService.UpdateMission(id, dto, user);
    }

    @Post(':id/assign')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Assigner un utilisateur à une mission" })
    @HttpCode(HttpStatus.CREATED)
    assignMission(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() dto: AssignMissionRequest,
        @CurrentUser() user: SafeUser,
    ) {
        return this.missionService.assignMissionUser(id, dto, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Supprimer une mission" })
    async deleteMission(
        @Param('id', ParseUUIDPipe) id: string,
        @CurrentUser() user: SafeUser,
    ): Promise<void> {
        await this.missionService.deleteMission(id, user);
    }

    @Get('organization/:organizationId')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Lister les missions d'une organisation" })
    @HttpCode(HttpStatus.OK)
    listMissionsByOrganization(
        @Param('organizationId', ParseUUIDPipe) organizationId: string,
    ) {
        return this.missionService.listMissionsByOrganization(organizationId);
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