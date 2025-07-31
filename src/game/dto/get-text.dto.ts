import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { textModeEnum, languageEnum } from '../types/text.type';
import { IsBoolean, IsEnum, IsNumber, IsOptional } from 'class-validator';

export class GetTextDto {
  @IsEnum(languageEnum)
  @ApiProperty({ description: '111', example: languageEnum.en })
  language: languageEnum;

  @IsEnum(textModeEnum)
  @ApiProperty()
  mode: textModeEnum;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  time?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  length?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ required: false })
  punctuation?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional()
  numbers?: boolean;
}
