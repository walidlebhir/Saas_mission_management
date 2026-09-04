import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Organization } from '../../organizations/Entity/organization.entity.js';
import { User } from '../../users/Entity/user.entity.js';

@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id', type: 'uuid' })
  organizationId: string;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'organization_id' })
  organization: Organization;

  @Column({ name: 'user_id', type: 'uuid', nullable: true })
  userId: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 200 })
  action: string;

  @Column({ name: 'entity_type', type: 'varchar', length: 100 })
  entityType: string;

  @Column({ name: 'entity_id', type: 'uuid', nullable: true })
  entityId: string;

  @Column({ name: 'old_data', type: 'jsonb', nullable: true })
  oldData: Record<string, unknown>;

  @Column({ name: 'new_data', type: 'jsonb', nullable: true })
  newData: Record<string, unknown>;

  @Column({ name: 'ip_address', type: 'varchar', length: 50, nullable: true })
  ipAddress: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}