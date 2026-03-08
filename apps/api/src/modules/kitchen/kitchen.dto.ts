import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsInt,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Difficulty, MealType } from '@prisma/client';

export class CreateRecipeStepDto {
  @IsInt() @Min(1) order: number;
  @IsString() instruction: string;
  @IsString() instructionHe: string;
  @IsOptional() @IsInt() @Min(1) durationMin?: number;
}

export class CreateRecipeDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() descriptionHe?: string;
  @IsEnum(MealType) mealType: MealType;
  @IsEnum(Difficulty) difficulty: Difficulty;
  @IsInt() @Min(0) prepMinutes: number;
  @IsOptional() @IsBoolean() toddlerFriendly?: boolean;
  @IsArray() @IsString({ each: true }) ingredients: string[];
  @IsArray() @IsString({ each: true }) ingredientsHe: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateRecipeStepDto)
  steps?: CreateRecipeStepDto[];
}

export class UpdateRecipeDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() titleHe?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() descriptionHe?: string;
  @IsOptional() @IsEnum(MealType) mealType?: MealType;
  @IsOptional() @IsEnum(Difficulty) difficulty?: Difficulty;
  @IsOptional() @IsInt() @Min(0) prepMinutes?: number;
  @IsOptional() @IsBoolean() toddlerFriendly?: boolean;
  @IsOptional() @IsArray() @IsString({ each: true }) ingredients?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) ingredientsHe?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
  @IsOptional() @IsBoolean() isFavorite?: boolean;
}
