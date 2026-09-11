import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ExpenseconfigService } from '../services/expenseconfig.service.js';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard.js';
import { Expenseconfigrequest } from '../Dto/expenseconfigrequest.js';

@ApiTags('Expense Config')
@Controller('expense-config')
export class ExpenseconfigController {
  constructor(private readonly expenseconfigService: ExpenseconfigService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an expense configuration for a mission' })
  createExpenseConfig(@Body() dto: Expenseconfigrequest) {
    return this.expenseconfigService.CreateNewOCnfigurationExpense(dto);
  }

  @Get('/mission/:missionId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get expense configurations by mission id' })
  getExpenseConfigByMissionId(@Param('missionId') missionId: string) {
    return this.expenseconfigService.GetExpenseConfigByMissionId(missionId);
  }
}