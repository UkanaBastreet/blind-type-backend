import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class AddGameDto {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string;
}
