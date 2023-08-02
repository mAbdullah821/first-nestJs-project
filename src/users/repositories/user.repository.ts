import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, User } from '../models/user.entity';
import { BaseRepository } from './base.repository';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) protected readonly model: Model<UserDocument>,
  ) {
    super(model);
  }
}
