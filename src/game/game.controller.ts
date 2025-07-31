import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { AddGameDto } from './dto/add-game.dto';
import { GetTextDto } from './dto/get-text.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('/practice')
  getRandomText(@Query('language') params: GetTextDto) {
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
