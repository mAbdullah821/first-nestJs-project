import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<Tmp>;

@Schema()
export class Tmp {
  @Prop({ type: String, required: true })
  name: string;
}

export const TmpSchema = SchemaFactory.createForClass(Tmp);
