import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expense } from './expense.entity.js';
import { User } from '../../users/Entity/user.entity.js';

@Entity('expense_comments')
export class ExpenseComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expense_id', type: 'uuid' })
  expenseId: string;

  @ManyToOne(() => Expense, (expense) => expense.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'expense_id' })
  expense: Expense;

  @Column({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}