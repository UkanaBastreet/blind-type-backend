import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getUserSettings(userId: string): Promise<import("./entities/settings.entity").Settings>;
    updateSettings(userId: string, dto: UpdateSettingsDto): Promise<import("./entities/settings.entity").Settings>;
}
