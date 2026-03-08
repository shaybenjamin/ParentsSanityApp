import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsInt,
  IsArray,
  Min,
  Max,
} from 'class-validator';
import { ActivityCategory, EnergyLevel } from '@prisma/client';

export class CreateActivityDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() descriptionHe?: string;
  @IsEnum(ActivityCategory) category: ActivityCategory;
  @IsInt() @Min(1) durationMin: number;
  @IsEnum(EnergyLevel) energyLevel: EnergyLevel;
  @IsBoolean() isIndoor: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) materials?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) materialsHe?: string[];
  @IsOptional() @IsBoolean() needsSupervision?: boolean;
  @IsOptional() @IsInt() @Min(0) ageMinMonths?: number;
  @IsOptional() @IsInt() @Min(0) @Max(120) ageMaxMonths?: number;
}

export class UpdateActivityDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() titleHe?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() descriptionHe?: string;
  @IsOptional() @IsEnum(ActivityCategory) category?: ActivityCategory;
  @IsOptional() @IsInt() @Min(1) durationMin?: number;
  @IsOptional() @IsEnum(EnergyLevel) energyLevel?: EnergyLevel;
  @IsOptional() @IsBoolean() isIndoor?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) materials?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) materialsHe?: string[];
  @IsOptional() @IsBoolean() needsSupervision?: boolean;
  @IsOptional() @IsBoolean() isFavorite?: boolean;
}
