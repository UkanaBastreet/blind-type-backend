import { practiceTextMode } from '../types/text.type';

export interface getTextDto {
  language: string;
  time?: number;
  length?: number;
  punctuation?: boolean;
  numbers: boolean;
  mode: practiceTextMode;
}
