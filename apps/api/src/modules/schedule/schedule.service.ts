import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateRoutineTemplateDto,
  UpdateRoutineTemplateDto,
  CreateDailyItemDto,
  UpdateDailyItemDto,
  ApplyTemplateDto,
} from './schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  // ─── Templates ───────────────────────────────────────────────────────────

  findAllTemplates() {
    return this.prisma.routineTemplate.findMany({
      include: { items: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findTemplateById(id: string) {
    const template = await this.prisma.routineTemplate.findUnique({
      where: { id },
      include: { items: { orderBy: { order: 'asc' } } },
    });
    if (!template) throw new NotFoundException(`Template ${id} not found`);
    return template;
  }

  async createTemplate(dto: CreateRoutineTemplateDto) {
    const { items, ...rest } = dto;
    return this.prisma.routineTemplate.create({
      data: {
        ...rest,
        items: { create: items },
      },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async updateTemplate(id: string, dto: UpdateRoutineTemplateDto) {
    await this.findTemplateById(id);
    return this.prisma.routineTemplate.update({
      where: { id },
      data: dto,
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async deleteTemplate(id: string) {
    await this.findTemplateById(id);
    return this.prisma.routineTemplate.delete({ where: { id } });
  }

  // ─── Daily Schedule ────────────────────────────────────────────────────────

  async getTodaySchedule() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.getScheduleForDate(today);
  }

  async getScheduleForDate(date: Date) {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);

    let schedule = await this.prisma.dailySchedule.findUnique({
      where: { date: normalized },
      include: { items: { orderBy: { order: 'asc' } } },
    });

    if (!schedule) {
      schedule = await this.prisma.dailySchedule.create({
        data: { date: normalized },
        include: { items: { orderBy: { order: 'asc' } } },
      });
    }

    return schedule;
  }

  async applyTemplate(date: Date, dto: ApplyTemplateDto) {
    const template = await this.findTemplateById(dto.templateId);
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);

    // Upsert the daily schedule and replace items
    const existing = await this.prisma.dailySchedule.findUnique({
      where: { date: normalized },
    });

    if (existing) {
      await this.prisma.dailyItem.deleteMany({
        where: { scheduleId: existing.id },
      });
      return this.prisma.dailySchedule.update({
        where: { id: existing.id },
        data: {
          items: {
            create: template.items.map((item) => ({
              title: item.title,
              titleHe: item.titleHe,
              startTime: item.startTime,
              endTime: item.endTime,
              segment: item.segment,
              icon: item.icon,
              order: item.order,
            })),
          },
        },
        include: { items: { orderBy: { order: 'asc' } } },
      });
    }

    return this.prisma.dailySchedule.create({
      data: {
        date: normalized,
        items: {
          create: template.items.map((item) => ({
            title: item.title,
            titleHe: item.titleHe,
            startTime: item.startTime,
            endTime: item.endTime,
            segment: item.segment,
            icon: item.icon,
            order: item.order,
          })),
        },
      },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }

  async addDailyItem(date: Date, dto: CreateDailyItemDto) {
    const schedule = await this.getScheduleForDate(date);
    return this.prisma.dailyItem.create({
      data: { ...dto, scheduleId: schedule.id },
    });
  }

  async updateDailyItem(itemId: string, dto: UpdateDailyItemDto) {
    const item = await this.prisma.dailyItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException(`Item ${itemId} not found`);
    return this.prisma.dailyItem.update({ where: { id: itemId }, data: dto });
  }

  async deleteDailyItem(itemId: string) {
    const item = await this.prisma.dailyItem.findUnique({
      where: { id: itemId },
    });
    if (!item) throw new NotFoundException(`Item ${itemId} not found`);
    return this.prisma.dailyItem.delete({ where: { id: itemId } });
  }

  async resetDay(date: Date) {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    const schedule = await this.prisma.dailySchedule.findUnique({
      where: { date: normalized },
    });
    if (!schedule) return { message: 'No schedule to reset' };

    await this.prisma.dailyItem.updateMany({
      where: { scheduleId: schedule.id },
      data: { isCompleted: false },
    });

    return this.prisma.dailySchedule.findUnique({
      where: { id: schedule.id },
      include: { items: { orderBy: { order: 'asc' } } },
    });
  }
}
