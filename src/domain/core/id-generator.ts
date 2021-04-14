import { ID } from "./id";

export default interface IdGenerator {
  generate(): ID;
}