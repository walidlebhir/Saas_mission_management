import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards, Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrganizationService } from './organization.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { OrganizationRequest } from './Dto/OrganizationRequest.js';
import type { SafeUser } from '../users/user.service.js';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post("/crate")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create and configure an organization (finance only)' })
  createOrganization(
    @Body() dto: OrganizationRequest,
    @CurrentUser() user: SafeUser,
  ) {
    return this.organizationService.CreateNewOrganization(dto, user);
  }


  @Get("/show/:idorganization")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({summary : "recuepartion organization "})
  ShowOrganization(
      @Param("idorganization") idorganization : string
  ){
    return this.organizationService.ShowOrganization(idorganization) ;
  }



  @Patch("/update/:idorganization")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Mise à jour d'une organisation (finance only)" })
  updateOrganization(
      @Param("idorganization") idorganization: string,
      @Body() dto: OrganizationRequest,
      @CurrentUser() user: SafeUser,
  ) {
    return this.organizationService.updateOrganization(idorganization, dto, user);
  }






}