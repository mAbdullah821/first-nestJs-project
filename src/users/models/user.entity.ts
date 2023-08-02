import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Tmp, TmpSchema } from './tmp.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: Boolean })
  isAdult?: boolean;

  @Prop({ type: [TmpSchema] })
  tmps?: Tmp[];
}

const _UserSchema = SchemaFactory.createForClass(User);

_UserSchema.pre('save', function () {
  console.log('Hello From pre:save_1');
});

export const UserSchema = _UserSchema;
