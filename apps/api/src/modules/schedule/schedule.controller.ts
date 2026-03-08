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
import { ScheduleService } from './schedule.service';
import {
  CreateRoutineTemplateDto,
  UpdateRoutineTemplateDto,
  CreateDailyItemDto,
  UpdateDailyItemDto,
  ApplyTemplateDto,
} from './schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  // ─── Templates ───────────────────────────────────────────────────────────

  @Get('templates')
  findAllTemplates() {
    return this.scheduleService.findAllTemplates();
  }

  @Get('templates/:id')
  findTemplateById(@Param('id') id: string) {
    return this.scheduleService.findTemplateById(id);
  }

  @Post('templates')
  createTemplate(@Body() dto: CreateRoutineTemplateDto) {
    return this.scheduleService.createTemplate(dto);
  }

  @Patch('templates/:id')
  updateTemplate(
    @Param('id') id: string,
    @Body() dto: UpdateRoutineTemplateDto,
  ) {
    return this.scheduleService.updateTemplate(id, dto);
  }

  @Delete('templates/:id')
  deleteTemplate(@Param('id') id: string) {
    return this.scheduleService.deleteTemplate(id);
  }

  // ─── Daily Schedule ────────────────────────────────────────────────────────

  @Get('today')
  getTodaySchedule() {
    return this.scheduleService.getTodaySchedule();
  }

  @Get('day')
  getScheduleForDate(@Query('date') dateStr: string) {
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.scheduleService.getScheduleForDate(date);
  }

  @Post('day/apply-template')
  applyTemplate(
    @Query('date') dateStr: string,
    @Body() dto: ApplyTemplateDto,
  ) {
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.scheduleService.applyTemplate(date, dto);
  }

  @Post('day/items')
  addDailyItem(
    @Query('date') dateStr: string,
    @Body() dto: CreateDailyItemDto,
  ) {
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.scheduleService.addDailyItem(date, dto);
  }

  @Patch('day/items/:id')
  updateDailyItem(@Param('id') id: string, @Body() dto: UpdateDailyItemDto) {
    return this.scheduleService.updateDailyItem(id, dto);
  }

  @Delete('day/items/:id')
  deleteDailyItem(@Param('id') id: string) {
    return this.scheduleService.deleteDailyItem(id);
  }

  @Post('day/reset')
  resetDay(@Query('date') dateStr: string) {
    const date = dateStr ? new Date(dateStr) : new Date();
    return this.scheduleService.resetDay(date);
  }
}
