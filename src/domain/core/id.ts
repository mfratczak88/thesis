import { IsNotEmpty } from 'class-validator';

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