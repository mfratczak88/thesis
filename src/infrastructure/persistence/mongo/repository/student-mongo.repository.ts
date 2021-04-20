import StudentRepository from '../../../../domain/core/student/ports/student.repository';
import { ID } from '../../../../domain/core/id';
import { Student } from '../../../../domain/core/student/student';
import { Injectable } from '@nestjs/common';
import {  Db, MongoClient } from 'mongodb';
import { BaseMongoRepository } from './base-mongo.repository';
import { TelephoneNumber } from '../../../../domain/core/telephone-number';
import { Name } from '../../../../domain/core/name';
import { Email } from '../../../../domain/core/email';

@Injectable()
export class StudentMongoRepository extends BaseMongoRepository<Student> implements StudentRepository {

constructor(db: Db) {
    super('students', db);
  }

  async exists(studentID: ID): Promise<boolean> {
    const student = await this.findById(studentID);
    return !!student;
  }

  async findAll(): Promise<Student[]> {
    return await this.collection.find().toArray();
  }

  async findByEmail(email: Email): Promise<Student|undefined> {
    return await this.collection.findOne({ email: email });
  }

  async findById(studentID: ID): Promise<Student> {
    return await this.collection.findOne({ _id: studentID.toString() });
  }

  fromMongo(mongoDoc): Student {
    const { _id: id, firstName, lastName, phoneNumber, email, studies, userId } = mongoDoc;
    return new Student(
      new ID(id),
      new Name(firstName, lastName),
      new TelephoneNumber(phoneNumber),
      new Email(email),
      studies,
      userId,
    );
  }

  protected toMongo(student: Student): any {
    const { id, name, email, phoneNumber, userId, studiedCourses } = student;
    return {
      _id: id.toString(),
      firstName: name.firstName,
      lastName: name.lastName,
      phoneNumber: phoneNumber.toString(),
      email: email.toString(),
      studiedCourses,
      userId: userId.toString(),
    };
  }

}