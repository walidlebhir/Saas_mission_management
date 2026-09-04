import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Mission } from './mission.entity.js';
import { User } from '../../users/Entity/user.entity.js';

@Entity('mission_assignments')
@Unique('uq_mission_assignment', ['missionId', 'userId'])
export class MissionAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'mission_id', type: 'uuid' })
  missionId: string;

  @ManyToOne(() => Mission, (mission) => mission.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'mission_id' })
  mission: Mission;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, (user) => user.missionAssignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'assigned_by', type: 'uuid' })
  assignedBy: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'assigned_by' })
  assigner: User;

  @CreateDateColumn({ name: 'assigned_at' })
  assignedAt: Date;
}