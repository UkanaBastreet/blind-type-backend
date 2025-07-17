import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LanguageEnum, ThemeEnum } from '../types/settings.type';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ThemeEnum })
  theme: ThemeEnum;

  @Column({ type: 'enum', enum: LanguageEnum })
  language: LanguageEnum;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.settings)
  userId: string; // Assuming this is a foreign key to User
}
