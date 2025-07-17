import { Injectable } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Settings } from './entities/settings.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async getUserSettings(userId: string) {
    return this.settingsRepository.findOne({ where: { userId } });
  }

  async updateSettings(userId: string, dto: UpdateSettingsDto) {
    await this.settingsRepository.update(userId, dto);
    return this.settingsRepository.findOne({ where: { userId } });
  }
}
