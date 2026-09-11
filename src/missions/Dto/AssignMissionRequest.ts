import { IsNotEmpty, IsString } from 'class-validator';

export class AssignMissionRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
