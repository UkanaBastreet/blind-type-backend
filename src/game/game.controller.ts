import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { AddGameDto } from './dto/add-game.dto';
import { getTextDto } from './dto/get-text.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/practice')
  getRandomText(
    @Query('language') language: string,
    @Query('mode') mode: string,
    @Query('time') time?: number,
    @Query('length') length?: number,
    @Query('punctuation') punctuation?: boolean,
    @Query('numbers') numbers?: boolean,
  ) {
    const params: getTextDto = {
      language: language || 'en',
      time: time,
      length: length,
      punctuation: punctuation,
      numbers: numbers,
      mode: mode as 'time' | 'words' | 'lesson',
    };
    return this.gameService.getRandomText(params);
  }

  @Post('/results/:userId')
  addGameResults(@Param('userId') userId: string, @Body() dto: AddGameDto) {
    return this.gameService.addGameResults(userId, dto);
  }

  @Get('/history/:userId')
  getGamesHistory(@Param('userId') userId: string) {
    return this.gameService.getHistoryById(userId);
  }
}
