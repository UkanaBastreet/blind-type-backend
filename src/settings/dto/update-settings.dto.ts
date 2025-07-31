import { IsOptional, IsString } from 'class-validator';
import { LanguageEnum, ThemeEnum } from '../types/settings.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  theme?: ThemeEnum;
  @ApiProperty()
  @IsString()
  @IsOptional()
  language?: LanguageEnum;
}
