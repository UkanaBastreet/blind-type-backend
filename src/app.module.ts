import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from './.config/typeorm.config';
import { GameModule } from './game/game.module';
import { StatsModule } from './stats/stats.module';
import { LessonsModule } from './lessons/lessons.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    JwtModule.register({}),
    AuthModule,
    GameModule,
    StatsModule,
    LessonsModule,
    SettingsModule,
  ],
})
export class AppModule {}
