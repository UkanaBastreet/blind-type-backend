import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { AddGameDto } from './dto/add-game.dto';
import { GetTextDto } from './dto/get-text.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
  ) {}

  async getRandomText(params: GetTextDto) {
    return 'Random text for the game' + params.language;
  }

  async addGameResults(userId: string, dto: AddGameDto) {
    const gameResult = this.gameRepository.create({ ...dto, userId });
    return this.gameRepository.save(gameResult);
  }

  async getHistoryById(userId: string): Promise<Game[]> {
    const games = await this.gameRepository.find({
      where: { userId },
    });
    return games;
  }
}
