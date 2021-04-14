import { Invitation } from './invitation.model';
import { ID } from '../../../domain/core/id';

export interface InvitationRepository {
  findByToken(token:string): Promise<Invitation | undefined>;

  findByEmail(email:string): Promise<Invitation | undefined>;

  save(invitation: Invitation): Promise<ID>;
}