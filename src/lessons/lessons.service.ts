import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}
  async getAllLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }
  async getLessonById(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }
}
