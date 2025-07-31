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
import { RoleEnum } from '../types/role-enum.type';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: true })
  username?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @OneToMany(() => Game, (game) => game.userId)
  games: Game[];

  @OneToOne(() => Stats, (stat) => stat.userId)
  stats: Stats;

  @OneToOne(() => Settings, (settings) => settings.userId)
  settings: Settings;
}
