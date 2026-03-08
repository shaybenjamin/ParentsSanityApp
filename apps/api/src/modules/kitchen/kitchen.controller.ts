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
import { KitchenService } from './kitchen.service';
import { CreateRecipeDto, UpdateRecipeDto } from './kitchen.dto';
import { Difficulty, MealType } from '@prisma/client';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get('recipes')
  findAll(
    @Query('mealType') mealType?: MealType,
    @Query('difficulty') difficulty?: Difficulty,
    @Query('toddlerFriendly') toddlerFriendly?: string,
    @Query('maxPrepMinutes') maxPrepMinutes?: string,
    @Query('favoritesOnly') favoritesOnly?: string,
  ) {
    return this.kitchenService.findAll({
      mealType,
      difficulty,
      toddlerFriendly:
        toddlerFriendly !== undefined ? toddlerFriendly === 'true' : undefined,
      maxPrepMinutes: maxPrepMinutes ? parseInt(maxPrepMinutes) : undefined,
      favoritesOnly: favoritesOnly === 'true',
    });
  }

  @Get('recipes/quick-snacks')
  quickSnacks() {
    return this.kitchenService.quickSnacks();
  }

  @Get('recipes/:id')
  findById(@Param('id') id: string) {
    return this.kitchenService.findById(id);
  }

  @Post('recipes')
  create(@Body() dto: CreateRecipeDto) {
    return this.kitchenService.create(dto);
  }

  @Patch('recipes/:id')
  update(@Param('id') id: string, @Body() dto: UpdateRecipeDto) {
    return this.kitchenService.update(id, dto);
  }

  @Patch('recipes/:id/favorite')
  toggleFavorite(@Param('id') id: string) {
    return this.kitchenService.toggleFavorite(id);
  }

  @Delete('recipes/:id')
  delete(@Param('id') id: string) {
    return this.kitchenService.delete(id);
  }
}
