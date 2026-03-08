import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsInt,
  IsUrl,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MediaType, PlaylistMood } from '@prisma/client';

export class CreateMediaItemDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsOptional() @IsUrl() url?: string;
  @IsOptional() @IsUrl() thumbnailUrl?: string;
  @IsOptional() @IsInt() @Min(0) durationSec?: number;
  @IsInt() @Min(0) order: number;
}

export class UpdateMediaItemDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() titleHe?: string;
  @IsOptional() @IsUrl() url?: string;
  @IsOptional() @IsUrl() thumbnailUrl?: string;
  @IsOptional() @IsInt() @Min(0) durationSec?: number;
  @IsOptional() @IsInt() @Min(0) order?: number;
}

export class CreatePlaylistDto {
  @IsString() title: string;
  @IsString() titleHe: string;
  @IsEnum(MediaType) type: MediaType;
  @IsEnum(PlaylistMood) mood: PlaylistMood;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaItemDto)
  items?: CreateMediaItemDto[];
}

export class UpdatePlaylistDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() titleHe?: string;
  @IsOptional() @IsEnum(MediaType) type?: MediaType;
  @IsOptional() @IsEnum(PlaylistMood) mood?: PlaylistMood;
  @IsOptional() @IsBoolean() isFavorite?: boolean;
}
