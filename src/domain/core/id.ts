import { IsNotEmpty } from 'class-validator';
import { Validate } from './validation/validate';

@Validate
export class ID {
  @IsNotEmpty()
  private readonly id: string;

  constructor(value: string) {
    this.id = value;
  }

  toString() {
    return this.id;
  }
}