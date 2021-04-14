import { User } from './user.model';
import { ID } from '../../../domain/core/id';

export interface UserRepository {
  findById(userID: ID): Promise<User | undefined>

  findByUsername(username: string): Promise<User | undefined>

  findByEmail(email: string): Promise<User | undefined>

  save(user: User): Promise<ID>;
}