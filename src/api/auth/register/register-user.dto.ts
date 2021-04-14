import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {

  @IsNotEmpty()
  @MinLength(10)
  password: string;

  @IsNotEmpty()
  token: string;

}