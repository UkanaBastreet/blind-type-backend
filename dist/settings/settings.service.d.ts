import { UpdateSettingsDto } from './dto/update-settings.dto';
import { Settings } from './entities/settings.entity';
import { Repository } from 'typeorm';
export declare class SettingsService {
    private readonly settingsRepository;
    constructor(settingsRepository: Repository<Settings>);
    getUserSettings(userId: string): Promise<Settings>;
    updateSettings(userId: string, dto: UpdateSettingsDto): Promise<Settings>;
}
