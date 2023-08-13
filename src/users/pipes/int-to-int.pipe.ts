import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class IntToInt implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(metadata);
    console.log(value);
    return value;
  }
}
