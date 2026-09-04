import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './Entity/expense.entity.js';
import { ExpenseComment } from './Entity/expense-comment.entity.js';
import { ExpenseCategoryLimit } from './Entity/expense-category-limit.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, ExpenseComment, ExpenseCategoryLimit]),
  ],
  exports: [TypeOrmModule],
})
export class ExpensesModule {}