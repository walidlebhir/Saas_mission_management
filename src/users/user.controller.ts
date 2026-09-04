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
import { UserService } from './user.service.js';
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
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users' })
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}