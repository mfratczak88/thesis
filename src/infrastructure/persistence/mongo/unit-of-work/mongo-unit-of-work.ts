import { UnitOfWork } from '../../../../api/commands/unit-of-work.provider';
import { ClientSession, MongoClient } from 'mongodb';


export class MongoUnitOfWork implements UnitOfWork {
  private static session: ClientSession;

  constructor(
    private readonly client: MongoClient,
  ) {
  }

  async beginTransaction(): Promise<void> {
    MongoUnitOfWork.session = this.client.startSession();
    MongoUnitOfWork.session.startTransaction();
  }

  async commit(): Promise<void> {
    await MongoUnitOfWork.session.commitTransaction();
    MongoUnitOfWork.disposeSession();
  }

  async rollback(): Promise<void> {
    await MongoUnitOfWork.session.abortTransaction();
    MongoUnitOfWork.disposeSession();
  }

  private static disposeSession() {
    MongoUnitOfWork.session.endSession();
  }

  static getSession() {
    return MongoUnitOfWork.session;
  }

}