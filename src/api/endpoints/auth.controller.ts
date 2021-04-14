import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guard/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { RegisterUserDto } from '../auth/register/register-user.dto';

import { CreateInvitationDto } from '../auth/invitation/create-invitation.dto';
import { InvitationService } from '../auth/invitation/invitation.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../auth/authorization/roles/roles.decorator';
import { Role } from '../auth/authorization/roles/role.enum';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly invitationService: InvitationService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.OfficeClerk)
  @Post('invitation')
  async invite(@Body() createInvitationDto: CreateInvitationDto) {
    const { email, role } = createInvitationDto;
    const { id, token } = await this.invitationService.createInvitation(email, role);
    return {
      id: id.toString(),
      token,
    };
  }
}