import { MissionStatus } from '../Entity/enum/MissionStatus.js';

export interface MissionResponse {
  id: string;
  organizationId: string;
  createdBy: string;
  name: string;
  description: string | null;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  currency: string;
  status: MissionStatus;
  advanceAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
