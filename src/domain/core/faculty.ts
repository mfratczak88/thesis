import { IsDefined, IsNotEmpty } from "class-validator";
import { Address } from "./address";
import { ID } from "./id";

export class Faculty {

  @IsDefined()
  readonly id: ID;

  @IsNotEmpty()
  readonly name: string;

  @IsDefined()
  readonly address: Address;

  constructor(id: ID, name: string, address: Address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }
}