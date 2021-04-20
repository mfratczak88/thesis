import { ClientSession, Db, MongoClient } from 'mongodb';
import { ID } from '../../../../domain/core/id';
import { MongoUnitOfWork } from '../unit-of-work/mongo-unit-of-work';

export abstract class BaseMongoRepository<DomainObject extends { id: ID }> {
  protected collection;

  protected constructor(protected readonly collectionName, protected readonly db: Db) {
    this.collection = this.db.collection(this.collectionName);
  }

  protected abstract fromMongo(mongoDoc): DomainObject | undefined;

  protected toMongo(domainObject: DomainObject) {

    const { id, ...rest } = domainObject;
    return {
      _id: id.toString(),
      ...rest,
    };
  }

  async save(domainObject: DomainObject): Promise<ID> {
    const session = MongoUnitOfWork.getSession(); // todo: fix this dirty hack !
    const { id } = domainObject;
    await this.collection.replaceOne(
      { _id: id.toString() },
      this.toMongo(domainObject),
      { upsert: true, session }
    );
    return id;
  }
}

