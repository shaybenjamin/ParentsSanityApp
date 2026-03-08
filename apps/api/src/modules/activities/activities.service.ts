import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ActivityCategory, EnergyLevel } from '@prisma/client';
import { CreateActivityDto, UpdateActivityDto } from './activities.dto';

interface ActivityFilters {
  category?: ActivityCategory;
  energyLevel?: EnergyLevel;
  isIndoor?: boolean;
  maxDuration?: number;
  favoritesOnly?: boolean;
}

@Injectable()
export class ActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(filters: ActivityFilters = {}) {
    return this.prisma.activity.findMany({
      where: {
        ...(filters.category && { category: filters.category }),
        ...(filters.energyLevel && { energyLevel: filters.energyLevel }),
        ...(filters.isIndoor !== undefined && { isIndoor: filters.isIndoor }),
        ...(filters.maxDuration && { durationMin: { lte: filters.maxDuration } }),
        ...(filters.favoritesOnly && { isFavorite: true }),
      },
      orderBy: [{ isFavorite: 'desc' }, { title: 'asc' }],
    });
  }

  async findById(id: string) {
    const activity = await this.prisma.activity.findUnique({ where: { id } });
    if (!activity) throw new NotFoundException(`Activity ${id} not found`);
    return activity;
  }

  create(dto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: {
        ...dto,
        materials: dto.materials ?? [],
        materialsHe: dto.materialsHe ?? [],
        needsSupervision: dto.needsSupervision ?? true,
        ageMinMonths: dto.ageMinMonths ?? 0,
        ageMaxMonths: dto.ageMaxMonths ?? 60,
      },
    });
  }

  async update(id: string, dto: UpdateActivityDto) {
    await this.findById(id);
    return this.prisma.activity.update({ where: { id }, data: dto });
  }

  async toggleFavorite(id: string) {
    const activity = await this.findById(id);
    return this.prisma.activity.update({
      where: { id },
      data: { isFavorite: !activity.isFavorite },
    });
  }

  async delete(id: string) {
    await this.findById(id);
    return this.prisma.activity.delete({ where: { id } });
  }

  /** Returns one random activity matching filters — useful for "suggest something now" */
  async suggest(filters: ActivityFilters = {}) {
    const all = await this.findAll(filters);
    if (all.length === 0) return null;
    return all[Math.floor(Math.random() * all.length)];
  }
}
