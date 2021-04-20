export interface UnitOfWork {
  beginTransaction():Promise<void>;

  commit(): Promise<void>;

  rollback(): Promise<void>;
}