import { GameService } from './game.service';
import { AddGameDto } from './dto/add-game.dto';
import { GetTextDto } from './dto/get-text.dto';
export declare class GameController {
    private readonly gameService;
    constructor(gameService: GameService);
    getRandomText(params: GetTextDto): Promise<string>;
    addGameResults(userId: string, dto: AddGameDto): Promise<import("./entities/game.entity").Game>;
    getGamesHistory(userId: string): Promise<import("./entities/game.entity").Game[]>;
}
