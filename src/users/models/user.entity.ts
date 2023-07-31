import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: Boolean })
  isAdult?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
