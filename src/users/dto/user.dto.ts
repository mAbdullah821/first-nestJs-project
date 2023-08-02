import {
  IsString,
  IsBoolean,
  IsInt,
  IsEnum,
  Min,
  Max,
  IsArray,
  Allow,
} from 'class-validator';
import { Tmp } from '../models/tmp.schema';

enum Names {
  Nice = 'nice',
  Hello = 'hello',
  World = 'world',
  Good = 'good',
  Bad = 'bad',
}

export class UserDto {
  @IsString()
  @IsEnum(Names)
  name: string;

  @IsInt()
  @Min(13)
  @Max(32)
  age: number;

  @IsBoolean()
  isAdult: boolean;

  @Allow()
  tmps: Tmp[];
}
