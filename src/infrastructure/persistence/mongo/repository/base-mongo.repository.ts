import { Db } from 'mongodb';
import { ID } from '../../../../domain/core/id';

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
    const { id } = domainObject;
    await this.collection.replaceOne(
      { _id: id.toString() },
      this.toMongo(domainObject),
      { upsert: true },
    );
    return id;
  }
}

