import IdGenerator from '../../../domain/core/id-generator';
import { ID } from '../../../domain/core/id';
import { Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';

@Injectable()
export class IdMongoGenerator implements IdGenerator {
  generate(): ID {
    return new ID(new ObjectID().toHexString());
  }

}