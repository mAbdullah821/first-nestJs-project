import { PartialType } from '@nestjs/mapped-types';
import { NinjasDto } from './ninjas.dto';

export class CreateNinjasDto extends PartialType(NinjasDto) {}
