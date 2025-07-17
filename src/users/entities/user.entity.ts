import { Game } from 'src/game/entities/game.entity';
import { Settings } from 'src/settings/entities/settings.entity';
import { Stats } from 'src/stats/entities/stats.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: ['admin', 'user', 'guest'], default: 'user' })
  role: string;

  @OneToMany(() => Game, (game) => game.userId)
  games: Game[]; // Assuming a one-to-many relationship with Game

  @OneToOne(() => Stats, (stat) => stat.userId)
  stats: Stats; // Assuming a one-to-one relationship with Stat

  @OneToOne(() => Settings, (settings) => settings.userId)
  settings: Settings;
}
