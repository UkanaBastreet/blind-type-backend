import { textModeEnum, languageEnum } from '../types/text.type';
export declare class GetTextDto {
    language: languageEnum;
    mode: textModeEnum;
    time?: number;
    length?: number;
    punctuation?: boolean;
    numbers?: boolean;
}
