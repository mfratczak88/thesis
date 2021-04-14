import { BaseMongoRepository } from './base-mongo.repository';
import { Course } from '../../../../domain/core/course/course';
import { CourseRepository } from '../../../../domain/core/course/ports/course.repository';
import { Db } from 'mongodb';
import { ID } from '../../../../domain/core/id';
import { Semester } from '../../../../domain/core/course/semester';

export class CourseMongoRepository extends BaseMongoRepository<Course> implements CourseRepository {

  constructor(db: Db) {
    super('courses', db);
  }

  protected fromMongo(mongoDoc): Course | undefined {
    return undefined;
  }

  findAllByIds(id: ID[]): Promise<Course[]> {
    return Promise.resolve([]);
  }

  findAllPossibleSemesters(): Promise<Semester | undefined> {
    return Promise.resolve(undefined);
  }

  findById(id: ID): Promise<Course | undefined> {
    return Promise.resolve(undefined);
  }

}