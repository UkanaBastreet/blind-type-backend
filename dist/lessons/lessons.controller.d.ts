import { LessonsService } from './lessons.service';
export declare class LessonsController {
    private readonly lessonsService;
    constructor(lessonsService: LessonsService);
    getAllLessons(): Promise<import("./entities/lesson.entity").Lesson[]>;
    getLessonById(id: string): Promise<import("./entities/lesson.entity").Lesson>;
}
