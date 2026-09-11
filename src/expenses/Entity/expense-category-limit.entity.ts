import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Mission } from '../../missions/Entity/mission.entity.js';
import { ExpenseCategory } from './enum/ExpenseCategory.js';

@Entity('expense_category_limits')
@Unique('uq_mission_category', ['missionId', 'category'])
export class ExpenseCategoryLimit {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mission_id', type: 'uuid' })
  missionId: string;

  @ManyToOne(() => Mission, (mission) => mission.categoryLimits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mission_id' })
  mission: Mission;

  @Column({ type: 'enum', enum: ExpenseCategory })
  category: ExpenseCategory;

  @Column({
    name: 'daily_limit',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  dailyLimit: number;

  @Column({
    name: 'per_expense_limit',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  perExpenseLimit: number;

  @Column({
    name: 'requires_receipt_above',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  requiresReceiptAbove: number;

}