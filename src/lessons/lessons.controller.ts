import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}
  @Get('/')
  getAllLessons() {
    return this.lessonsService.getAllLessons();
  }
  @Get(':id')
  getLessonById(@Param('id') id: string) {
    return this.lessonsService.getLessonById(id);
  }
}
