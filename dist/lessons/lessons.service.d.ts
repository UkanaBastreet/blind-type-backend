import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
export declare class LessonsService {
    private readonly lessonRepository;
    constructor(lessonRepository: Repository<Lesson>);
    getAllLessons(): Promise<Lesson[]>;
    getLessonById(id: string): Promise<Lesson>;
}
