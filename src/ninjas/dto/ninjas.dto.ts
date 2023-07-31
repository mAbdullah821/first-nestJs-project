import {
  IsString,
  IsInt,
  IsBoolean,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';

enum Names {
  Nice = 'nice',
  Hello = 'hello',
  World = 'world',
  Good = 'good',
  Bad = 'bad',
}

export class NinjasDto {
  id: number;

  @IsString()
  @IsEnum(Names)
  @MinLength(4)
  @MaxLength(8)
  name: string;

  @IsInt()
  @Min(13)
  @Max(32)
  age: number;

  @IsBoolean()
  isAdult: boolean;
}
