import { Inject, Injectable } from '@nestjs/common';
import { InvitationRepository } from './invitation.repository';
import { Role } from '../authorization/roles/role.enum';
import * as crypto from 'crypto';
import IdGenerator from '../../../domain/core/id-generator';
import { Invitation } from './invitation.model';

@Injectable()
export class InvitationService {

  constructor(
    @Inject('InvitationRepository')
    private readonly invitationRepository: InvitationRepository,
    @Inject('IdGenerator')
    private readonly idGenerator: IdGenerator,
  ) {
  }

  async createInvitation(email: string, role: Role):Promise<Invitation> {
    let invitation = await this.invitationRepository.findByEmail(email);

    if (this.validInvitation(invitation))
      throw new Error('Invitation aleady exists for this email');

    const token = crypto.randomBytes(16).toString('hex');
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);
    invitation = {
      id: this.idGenerator.generate(),
      email,
      role,
      token,
      expires,
    }
    await this.invitationRepository.save(invitation);
    return invitation;
  }

  async findByToken(token: string) {
    return await this.invitationRepository.findByToken(token);
  }

  validInvitation(invitation: Invitation) {
    return invitation && invitation.expires > new Date();
  }
}