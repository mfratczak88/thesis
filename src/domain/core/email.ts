import { IsEmail } from 'class-validator';

export class Email {

  private readonly address: string;

  constructor(address: string) {
    this.address = address;
  }

  toString() {
    return this.address;
  }
}