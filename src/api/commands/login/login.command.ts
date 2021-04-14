import { IsNotEmpty } from 'class-validator';

export class LoginCommand {
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}