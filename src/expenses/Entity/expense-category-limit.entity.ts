import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Organization } from '../../organizations/Entity/organization.entity.js';
import { ExpenseCategory } from './enum/ExpenseCategory.js';

@Entity('expense_category_limits')
@Unique('uq_organization_category', ['organizationId', 'category'])
export class ExpenseCategoryLimit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.categoryLimits, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

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