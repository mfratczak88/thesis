import { ID } from '../../../domain/core/id';
import { Role } from '../authorization/roles/role.enum';
import { Email } from '../../../domain/core/email';

export class User {
  readonly id: ID;
  readonly email: Email;
  readonly password?: string;
  readonly roles: Role[];
  readonly draft:boolean
}