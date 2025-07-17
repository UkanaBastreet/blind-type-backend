import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class AddGameDto {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
