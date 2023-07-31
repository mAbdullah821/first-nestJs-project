import { IsString, IsBoolean, IsInt } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsBoolean()
  isAdult: boolean;
}
