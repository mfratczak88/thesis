import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user/user.model';
import { RegisterUserDto } from './register/register-user.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { InvitationService } from './invitation/invitation.service';
import { Role } from './authorization/roles/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly  configService: ConfigService,
    private readonly invitationService: InvitationService,
  ) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.id.toString(),
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto) {
    const { password, token } = registerUserDto;

    const invitation = await this.invitationService.findByToken(token);
    if (!this.invitationService.validInvitation(invitation))
      throw new Error('Invalid invitation');

    const { email } = invitation;
    const hash = await bcrypt.hash(
      password,
      +this.configService.get('BCRYPT_ROUNDS'),
    );
    return await this.usersService.transformFromDraft(email, hash);

  }

  async createUser(email: string, role: Role) {
    await this.invitationService.createInvitation(email, role);
    return this.usersService.createUserDraft(email, [role]);
  }

  async createInvitation(email: string, role: Role) {
    return this.invitationService.createInvitation(email, role);
  }
}