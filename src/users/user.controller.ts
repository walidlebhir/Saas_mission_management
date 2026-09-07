import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserService, SafeUser } from './user.service.js';
import { CreateUserDto } from './Dto/CreateUserDto.js';
import { UpdateUserDto } from './Dto/UpdateUserDto.js';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a new user' })
  async createUser(@Body() dto: CreateUserDto): Promise<SafeUser> {
    return this.userService.sanitizeUser(await this.userService.createUser(dto));
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  async getUsers(): Promise<SafeUser[]> {
    const users = await this.userService.getUsers();
    return users.map((user) => this.userService.sanitizeUser(user));
  }

  @Get('organization/:organizationId')
  @ApiOperation({ summary: 'List users by organization' })
  async getUsersByOrganization(
    @Param('organizationId', ParseUUIDPipe) organizationId: string,
  ): Promise<SafeUser[]> {
    const users = await this.userService.getUsersByOrganization(organizationId);
    return users.map((user) => this.userService.sanitizeUser(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<SafeUser> {
    return this.userService.sanitizeUser(await this.userService.getUserById(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<SafeUser> {
    return this.userService.sanitizeUser(
      await this.userService.updateUser(id, dto),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}