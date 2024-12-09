import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.POSTGRES_DATABASE,
      host: process.env.POSTGRES_HOST,
      password: process.env.POSTGRES_PASSWORD,
      url: process.env.POSTGRES_URL,
      username: process.env.POSTGRES_USER,
      synchronize: true,
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
