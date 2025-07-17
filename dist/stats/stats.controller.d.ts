import { StatsService } from './stats.service';
import { UpdateStatsDto } from './dto/update-stats.dto';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getPublicStats(userId: string): Promise<import("./entities/stats.entity").Stats>;
    updateStats(userId: string, dto: UpdateStatsDto): void;
    getLeaderboard(): Promise<import("./entities/stats.entity").Stats[]>;
}
