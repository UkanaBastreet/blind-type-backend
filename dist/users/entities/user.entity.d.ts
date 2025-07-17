import { Game } from 'src/game/entities/game.entity';
import { Settings } from 'src/settings/entities/settings.entity';
import { Stats } from 'src/stats/entities/stats.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    role: string;
    games: Game[];
    stats: Stats;
    settings: Settings;
}
