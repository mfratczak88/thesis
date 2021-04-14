import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import IdGenerator from '../../../domain/core/id-generator';
import { Role } from '../authorization/roles/role.enum';
import { ID } from '../../../domain/core/id';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('IdGenerator') private readonly idGenerator: IdGenerator,
  ) {
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findByEmail(email);
  }

  async createUserDraft(email, roles: Role[]): Promise<ID> {
    if (await this.exists(email))
      throw new Error('User already exist');
    const id = this.idGenerator.generate();
    await this.userRepository.save(
      {
        id,
        email,
        roles,
        draft: true,
      },
    );
    return id;
  }

  async transformFromDraft(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user)
      throw new Error('User doesnt exist');

    const { password: oldPass, draft, ...rest } = user;
    return this.userRepository.save({
      ...rest,
      password,
      draft: false
    });
  }

  private async exists(email: string) {
    return !!await this.userRepository.findByEmail(email);
  }

}