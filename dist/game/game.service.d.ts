import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { AddGameDto } from './dto/add-game.dto';
import { getTextDto } from './dto/get-text.dto';
export declare class GameService {
    private gameRepository;
    constructor(gameRepository: Repository<Game>);
    getRandomText(params: getTextDto): Promise<string>;
    addGameResults(userId: string, dto: AddGameDto): Promise<Game>;
    getHistoryById(userId: string): Promise<Game[]>;
}
