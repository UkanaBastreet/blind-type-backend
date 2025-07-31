import { Game } from 'src/game/entities/game.entity';
import { Settings } from 'src/settings/entities/settings.entity';
import { Stats } from 'src/stats/entities/stats.entity';
import { RoleEnum } from '../types/role-enum.type';
export declare class User {
    id: string;
    username?: string;
    email: string;
    password: string;
    createdAt: Date;
    role: RoleEnum;
    games: Game[];
    stats: Stats;
    settings: Settings;
}
