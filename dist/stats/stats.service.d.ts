import { Repository } from 'typeorm';
import { Stats } from './entities/stats.entity';
import { UpdateStatsDto } from './dto/update-stats.dto';
export declare class StatsService {
    private readonly statsRepository;
    constructor(statsRepository: Repository<Stats>);
    getPublicStats(userId: string): Promise<Stats>;
    updateStats(userId: string, dto: UpdateStatsDto): Promise<Stats>;
    getLeaderboard(): Promise<Stats[]>;
}
