import { IsString } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.games, { onDelete: 'CASCADE' })
  @JoinColumn()
  userId: string;

  @IsString()
  originalText: string;
}

// wpm: number;
// raw: number;
// accuracy: number;
// consistency: number;
// chars: {
//   total: number;
//   correct: number;
//   incorrect: number;
//   missed: number;
// };
// mode: 'time' | 'text' | 'lesson' | 'custom';
// date: Date;
