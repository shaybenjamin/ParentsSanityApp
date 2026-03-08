import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Difficulty, MealType } from '@prisma/client';
import { CreateRecipeDto, UpdateRecipeDto } from './kitchen.dto';

interface RecipeFilters {
  mealType?: MealType;
  difficulty?: Difficulty;
  toddlerFriendly?: boolean;
  maxPrepMinutes?: number;
  favoritesOnly?: boolean;
}

@Injectable()
export class KitchenService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filters: RecipeFilters = {}) {
    return this.prisma.recipe.findMany({
      where: {
        ...(filters.mealType && { mealType: filters.mealType }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.toddlerFriendly !== undefined && {
          toddlerFriendly: filters.toddlerFriendly,
        }),
        ...(filters.maxPrepMinutes && {
          prepMinutes: { lte: filters.maxPrepMinutes },
        }),
        ...(filters.favoritesOnly && { isFavorite: true }),
      },
      include: { steps: { orderBy: { order: 'asc' } } },
      orderBy: [{ isFavorite: 'desc' }, { prepMinutes: 'asc' }],
    });
  }

  async findById(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
    if (!recipe) throw new NotFoundException(`Recipe ${id} not found`);
    return recipe;
  }

  async create(dto: CreateRecipeDto) {
    const { steps, ...rest } = dto;
    return this.prisma.recipe.create({
      data: {
        ...rest,
        toddlerFriendly: rest.toddlerFriendly ?? true,
        tags: rest.tags ?? [],
        ...(steps && { steps: { create: steps } }),
      },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async update(id: string, dto: UpdateRecipeDto) {
    await this.findById(id);
    return this.prisma.recipe.update({
      where: { id },
      data: dto,
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async toggleFavorite(id: string) {
    const recipe = await this.findById(id);
    return this.prisma.recipe.update({
      where: { id },
      data: { isFavorite: !recipe.isFavorite },
      include: { steps: { orderBy: { order: 'asc' } } },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.recipe.delete({ where: { id } });
  }

  /** Quick snack suggestions — easy recipes under 10 minutes */
  quickSnacks() {
    return this.findAll({
      mealType: 'SNACK',
      difficulty: 'EASY',
      maxPrepMinutes: 10,
    });
  }
}
