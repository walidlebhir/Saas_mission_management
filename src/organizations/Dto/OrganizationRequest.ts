import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Plan } from '../Entity/enum/Plan.js';

export class OrganizationRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must be lowercase, digits or dashes (e.g. acme-corp)',
  })
  slug: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  @IsEnum(Plan)
  plan: Plan;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10000)
  maxEmploye?: number;

  @IsOptional()
  @IsObject()
  setting?: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}