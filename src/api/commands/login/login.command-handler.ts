import { JwtService } from '@nestjs/jwt';

export class LoginCommandHandler {
  constructor(private readonly jwtService: JwtService) {
  }

  async handle() {

  }
}