import { IsMobilePhone } from 'class-validator';

export class TelephoneNumber {

  private readonly telephoneNumber: string;

  constructor(telephoneNumber: string) {
    this.telephoneNumber = telephoneNumber;
  }

  toString() {
    return this.telephoneNumber;
  }
}