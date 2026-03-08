import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';
import { ActivityCategory, EnergyLevel } from '@prisma/client';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  findAll(
    @Query('category') category?: ActivityCategory,
    @Query('energyLevel') energyLevel?: EnergyLevel,
    @Query('isIndoor') isIndoor?: string,
    @Query('maxDuration') maxDuration?: string,
    @Query('favoritesOnly') favoritesOnly?: string,
  ) {
    return this.activitiesService.findAll({
      category,
      energyLevel,
      isIndoor: isIndoor !== undefined ? isIndoor === 'true' : undefined,
      maxDuration: maxDuration ? parseInt(maxDuration) : undefined,
      favoritesOnly: favoritesOnly === 'true',
    });
  }

  @Get('suggest')
  suggest(
    @Query('category') category?: ActivityCategory,
    @Query('energyLevel') energyLevel?: EnergyLevel,
    @Query('isIndoor') isIndoor?: string,
    @Query('maxDuration') maxDuration?: string,
  ) {
    return this.activitiesService.suggest({
      category,
      energyLevel,
      isIndoor: isIndoor !== undefined ? isIndoor === 'true' : undefined,
      maxDuration: maxDuration ? parseInt(maxDuration) : undefined,
    });
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.activitiesService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateActivityDto) {
    return this.activitiesService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateActivityDto) {
    return this.activitiesService.update(id, dto);
  }

  @Patch(':id/favorite')
  toggleFavorite(@Param('id') id: string) {
    return this.activitiesService.toggleFavorite(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.activitiesService.delete(id);
  }
}
