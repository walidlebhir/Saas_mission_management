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
import { Role } from './enum/Role.js';
import type { RefreshToken } from './refresh-token.entity.js';
import type { Expense } from '../../expenses/Entity/expense.entity.js';
import type { MissionAssignment } from '../../missions/Entity/mission-assignment.entity.js';
import type { Notification } from '../../notifications/Entity/notification.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid', nullable: true })
  organizationId: string;


  @ManyToOne(() => Organization, (organization) => organization.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ name: 'first_name', type: 'varchar', length: 100 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'varchar', length: 100, nullable: true })
  department: string;

  @Column({ name: 'manager_id', type: 'uuid', nullable: true })
  managerId: string;

  @ManyToOne(() => User, (user) => user.directReports, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @OneToMany(() => User, (user) => user.manager)
  directReports: User[];

  @Column({
    name: 'monthly_limit',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  monthlyLimit: number;

  @Column({ name: 'avatar_url', type: 'text', nullable: true })
  avatarUrl: string;

  @Column({ name: 'invite_token', type: 'text', nullable: true })
  inviteToken: string;

  @Column({ name: 'invite_expires_at', type: 'timestamp', nullable: true })
  inviteExpiresAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: false })
  isActive: boolean;

  @Column({ name: 'two_factor_enabled', type: 'boolean', default: false })
  twoFactorEnabled: boolean;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany('refresh_tokens', (token: any) => token.user)
  refreshTokens: RefreshToken[];

  @OneToMany('mission_assignments', (assignment: any) => assignment.user)
  missionAssignments: MissionAssignment[];

  @OneToMany('expenses', (expense: any) => expense.user)
  expenses: Expense[];

  @OneToMany('notifications', (notification: any) => notification.user)
  notifications: Notification[];
}