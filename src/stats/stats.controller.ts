import { Controller, Get, Param, Patch } from '@nestjs/common';
import { StatsService } from './stats.service';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Controller('stat')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('/:userId')
  getPublicStats(@Param('userId') userId: string) {
    return this.statsService.getPublicStats(userId);
  }

  @Patch('/:userId')
  updateStats(@Param('userId') userId: string, dto: UpdateStatsDto) {
    this.statsService.updateStats(userId, dto);
  }
  @Get('/leaderboard')
  getLeaderboard() {
    return this.statsService.getLeaderboard();
  }
}
