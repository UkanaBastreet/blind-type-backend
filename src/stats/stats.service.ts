import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Stats } from './entities/stats.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStatsDto } from './dto/update-stats.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private readonly statsRepository: Repository<Stats>,
  ) {}

  async getPublicStats(userId: string): Promise<Stats> {
    return this.statsRepository.findOne({ where: { userId } });
  }
  async updateStats(userId: string, dto: UpdateStatsDto): Promise<Stats> {
    await this.statsRepository.update({ userId }, dto);
    return await this.statsRepository.findOne({ where: { userId } });
  }
  async getLeaderboard(): Promise<Stats[]> {
    return this.statsRepository.find({ take: 10 });
  }
}
