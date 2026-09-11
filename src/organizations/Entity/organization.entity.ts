import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Plan } from './enum/Plan.js';
import type { User } from '../../users/Entity/user.entity.js';
import type { Mission } from '../../missions/Entity/mission.entity.js';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  domain: string;

  @Column({ name: 'logo_url', type: 'text', nullable: true })
  logoUrl: string;

  @Column({ type: 'enum', enum: Plan })
  plan: Plan;

  @Column({ name: 'max_employees', type: 'int', default: 10 })
  maxEmployees: number;

  @Column({ type: 'varchar', length: 3, default: 'MAD' })
  currency: string;

  @Column({ type: 'jsonb', nullable: true })
  settings: Record<string, unknown>;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany('users', (user: any) => user.organization)
  users: User[];

  @OneToMany('missions', (mission: any) => mission.organization)
  missions: Mission[];
}
