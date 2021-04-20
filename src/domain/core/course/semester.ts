import { IsNotEmpty } from 'class-validator';
import { Validate } from '../validation/validate';

@Validate
export class Semester {
  @IsNotEmpty()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
