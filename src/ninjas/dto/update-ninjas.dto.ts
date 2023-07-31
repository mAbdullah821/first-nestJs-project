import { PartialType } from '@nestjs/mapped-types';
import { NinjasDto } from './ninjas.dto';

export class UpdateNinjasDto extends PartialType(NinjasDto) {}
