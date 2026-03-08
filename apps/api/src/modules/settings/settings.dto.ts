import { IsString, IsOptional, IsInt, IsIn, Min, Max } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional() @IsString() @IsIn(['en', 'he']) language?: string;
  @IsOptional() @IsString() childName?: string;
  @IsOptional() @IsInt() @Min(0) @Max(240) childAgeMonths?: number;
  @IsOptional() @IsString() householdName?: string;
}
