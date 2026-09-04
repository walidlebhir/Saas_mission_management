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
import { Organization } from '../../organizations/Entity/organization.entity.js';
import { User } from '../../users/Entity/user.entity.js';
import { MissionStatus } from './enum/MissionStatus.js';
import type { MissionAssignment } from './mission-assignment.entity.js';
import type { Expense } from '../../expenses/Entity/expense.entity.js';
import { ExpenseCategory } from '../../expenses/Entity/enum/ExpenseCategory.js';

@Entity('missions')
export class Mission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(() => Organization, (organization) => organization.missions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ name: 'created_by', type: 'uuid' })
  createdBy: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 200 })
  destination: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  budget: number;

  @Column({ type: 'varchar', length: 3, default: 'MAD' })
  currency: string;

  @Column({ type: 'enum', enum: MissionStatus })
  status: MissionStatus;

  @Column({
    name: 'allowed_categories',
    type: 'simple-array',
    nullable: true,
  })
  allowedCategories: ExpenseCategory[];

  @Column({
    name: 'advance_amount',
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  advanceAmount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany('mission_assignments', (assignment: any) => assignment.mission)
  assignments: MissionAssignment[];

  @OneToMany('expenses', (expense: any) => expense.mission)
  expenses: Expense[];
}