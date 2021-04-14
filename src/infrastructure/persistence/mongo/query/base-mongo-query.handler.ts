import { Db } from 'mongodb';

export class BaseMongoQueryHandler {
  constructor(
    protected readonly db: Db,
  ) {
  }

}