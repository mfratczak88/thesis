import { BaseMongoRepository } from './base-mongo.repository';
import { Invitation } from '../../../../api/auth/invitation/invitation.model';
import { InvitationRepository } from '../../../../api/auth/invitation/invitation.repository';
import { ID } from '../../../../domain/core/id';
import { Db } from 'mongodb';

export class InvitationMongoRepository extends BaseMongoRepository<Invitation> implements InvitationRepository {

  constructor(db: Db) {
    super('invitations', db);
  }

  protected fromMongo(mongoDoc) {
    if (mongoDoc) {
      const { _id, ...invitation } = mongoDoc;
      return {
        id: new ID(mongoDoc._id),
        ...invitation,
      };
    }
  }

  async findByEmail(email: string): Promise<Invitation | undefined> {
    return this.fromMongo(
      await this.collection.findOne({ email }),
    );
  }

  async findByToken(token: string): Promise<Invitation | undefined> {
    return this.fromMongo(
      await this.collection.findOne({ token }),
    );
  }
}