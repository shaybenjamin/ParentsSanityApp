import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { MediaModule } from './modules/media/media.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { SettingsModule } from './modules/settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ScheduleModule,
    ActivitiesModule,
    MediaModule,
    KitchenModule,
    SettingsModule,
  ],
})
export class AppModule {}
