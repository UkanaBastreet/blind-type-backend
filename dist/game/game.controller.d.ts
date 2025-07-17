import { GameService } from './game.service';
import { AddGameDto } from './dto/add-game.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getRandomText(language: string, mode: string, time?: number, length?: number, punctuation?: boolean, numbers?: boolean): Promise<string>;
    addGameResults(userId: string, dto: AddGameDto): Promise<import("./entities/game.entity").Game>;
    getGamesHistory(userId: string): Promise<import("./entities/game.entity").Game[]>;
}
