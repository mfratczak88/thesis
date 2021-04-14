import { ID } from '../../../domain/core/id';
import { Role } from '../authorization/roles/role.enum';

export class Invitation {
  id: ID;
  email:string;
  role: Role;
  token: string;
  expires: Date;
}