import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class StringToInt implements PipeTransform {
  transform(value: string): number {
    if (parseInt(value).toString() !== value)
      throw new BadRequestException(`${value} <-- is not a valid number`);

    return +value;
  }
}
