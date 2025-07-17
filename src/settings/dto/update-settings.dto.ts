import { IsOptional, IsString } from 'class-validator';
import { LanguageEnum, ThemeEnum } from '../types/settings.type';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  theme?: ThemeEnum;
  @IsString()
  @IsOptional()
  language?: LanguageEnum;
}
