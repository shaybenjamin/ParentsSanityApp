import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  Matches,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Segment } from '@prisma/client';

export class CreateRoutineItemDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsString() @Matches(/^\d{2}:\d{2}$/) startTime: string;
  @IsString() @Matches(/^\d{2}:\d{2}$/) endTime: string;
  @IsEnum(Segment) segment: Segment;
  @IsOptional() @IsString() icon?: string;
  @IsInt() @Min(0) order: number;
}

export class CreateRoutineTemplateDto {
  @IsString() name: string;
  @IsString() nameHe: string;
  @IsOptional() @IsBoolean() isDefault?: boolean;
  @IsArray() @ValidateNested({ each: true }) @Type(() => CreateRoutineItemDto)
  items: CreateRoutineItemDto[];
}

export class UpdateRoutineTemplateDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() nameHe?: string;
  @IsOptional() @IsBoolean() isDefault?: boolean;
}

export class CreateDailyItemDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsString() @Matches(/^\d{2}:\d{2}$/) startTime: string;
  @IsString() @Matches(/^\d{2}:\d{2}$/) endTime: string;
  @IsEnum(Segment) segment: Segment;
  @IsOptional() @IsString() icon?: string;
  @IsInt() @Min(0) order: number;
}

export class UpdateDailyItemDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() titleHe?: string;
  @IsOptional() @IsString() startTime?: string;
  @IsOptional() @IsString() endTime?: string;
  @IsOptional() @IsBoolean() isCompleted?: boolean;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class ApplyTemplateDto {
  @IsString() templateId: string;
}
