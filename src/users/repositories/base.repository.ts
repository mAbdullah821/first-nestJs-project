import { Injectable } from '@nestjs/common';
import { Document, Model, FilterQuery, Types } from 'mongoose';

@Injectable()
export class BaseRepository<T extends Document> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async save(data: T): Promise<T> {
    const createdModel = new this.model(data);
    return createdModel.save() as any;
  }

  async find(
    filterQuery: FilterQuery<T>,
    projection: any = null,
    sort: any = { _id: -1 },
  ): Promise<T[]> {
    return this.model.find(filterQuery, projection, sort);
  }

  async updateOne(id: string | Types.ObjectId, data: object): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteOne(id: string | Types.ObjectId): Promise<T> {
    return this.model.findByIdAndRemove(id);
  }
}
