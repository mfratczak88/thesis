import { Name } from "../name";
import { IsDefined } from "class-validator";
import { ID } from "../id";

export class Professor {

  @IsDefined()
  readonly id: ID;

  @IsDefined()
  readonly name: Name;

}