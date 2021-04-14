import { UserRepository } from '../../../../api/auth/user/user.repository';
import { User } from '../../../../api/auth/user/user.model';
import { Db } from 'mongodb';
import { ID } from '../../../../domain/core/id';
import { BaseMongoRepository } from './base-mongo.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserMongoRepository extends BaseMongoRepository<User> implements UserRepository{


  constructor(db: Db) {
    super('users', db);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.fromMongo(
      await this.collection.findOne({ username }),
    );
  }

  async findById(id: ID): Promise<User | undefined> {
    return this.fromMongo(
      await this.collection.findOne({ id }),
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.fromMongo(
      await this.collection.findOne({ email }),
    );
  }

  fromMongo(mongoDoc): User {
    if (mongoDoc) {
      const { _id: id, ...user } = mongoDoc;
      return {
        id: new ID(id),
        ...user,
      };
    }
  }

}