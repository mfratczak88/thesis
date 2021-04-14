import { Role } from '../authorization/roles/role.enum';
import { IsDefined, IsEmail, IsNotEmpty, IsDate } from 'class-validator';

export class CreateInvitationDto {

  @IsEmail()
  email: string;

  @IsDefined()
  role: Role;

}