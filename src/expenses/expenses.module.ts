import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './Entity/expense.entity.js';
import { ExpenseComment } from './Entity/expense-comment.entity.js';
import { ExpenseCategoryLimit } from './Entity/expense-category-limit.entity.js';
import {User} from "../users/Entity/user.entity.js";
import {Mission} from "../missions/Entity/mission.entity.js";
import {ExpenseService} from "./services/expense.service.js";
import {ExpenseController} from "./controllers/expense.controller.js";
import {ExpenseconfigService} from "./services/expenseconfig.service.js";
import {ExpenseconfigController} from "./controllers/expenseconfig.controller.js";

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ExpenseComment, Mission, ExpenseCategoryLimit , User , Mission]),
  ],
  providers : [ExpenseService , ExpenseconfigService] ,
  controllers : [ExpenseController , ExpenseconfigController],
  exports: [TypeOrmModule],
})
export class ExpensesModule {}