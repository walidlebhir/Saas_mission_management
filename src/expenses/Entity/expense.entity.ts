import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mission } from '../../missions/Entity/mission.entity.js';
import { User } from '../../users/Entity/user.entity.js';
import { ExpenseCategory } from './enum/ExpenseCategory.js';
import { ExpenseStatus } from './enum/ExpenseStatus.js';
import type { ExpenseComment } from './expense-comment.entity.js';

@Entity('expenses')
export class Expense {


  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mission_id', type: 'uuid' })
  missionId: string;

  @ManyToOne(() => Mission, (mission) => mission.expenses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mission_id' })
  mission: Mission;


  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;


  @ManyToOne(() => User, (user) => user.expenses, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'user_id' })
  user: User;


  @Column({ name: 'submitted_by', type: 'uuid', nullable: true })
  submittedBy: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'submitted_by' })
  submitter: User;

  @Column({ type: 'enum', enum: ExpenseCategory })
  category: ExpenseCategory;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 3 })
  currency: string;

  @Column({
    name: 'amount_base',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  amountBase: number;

  @Column({
    name: 'exchange_rate',
    type: 'decimal',
    precision: 10,
    scale: 6,
    nullable: true,
  })
  exchangeRate: number;

  @Column({ name: 'expense_date', type: 'date' })
  expenseDate: Date;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'receipt_url', type: 'text', nullable: true })
  receiptUrl: string;

  @Column({
    name: 'ocr_data',
    type: 'jsonb',
    nullable: true,
  })
  ocrData: Record<string, unknown>;

  @Column({ type: 'enum', enum: ExpenseStatus })
  status: ExpenseStatus;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason: string;

  @Column({ name: 'approved_by', type: 'uuid', nullable: true })
  approvedBy: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'approved_by' })
  approver: User;

  @Column({ name: 'approved_at', type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column({ name: 'reimbursed_at', type: 'timestamp', nullable: true })
  reimbursedAt: Date;

  @Column({ name: 'reimbursement_ref', type: 'varchar', length: 100, nullable: true })
  reimbursementRef: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany('expense_comments', (comment: any) => comment.expense)
  comments: ExpenseComment[];

}