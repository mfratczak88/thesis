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
    if (mongoDoc) {
      const { _id, name, level, mode, facultyId } = mongoDoc;
      return {
        id: new ID(_id),
        name,
        level,
        mode,
        facultyId: new ID(facultyId),
      };
    }
  }

  protected toMongo(course: Course): any {
    const { id, name, facultyId, level, mode } = course;
    return {
      _id: id.toString(),
      name,
      level,
      mode,
      facultyId: facultyId.toString(),
    };
  }

  async findAllByIds(ids: ID[]): Promise<Course[]> {
    const courses = await this.collection.find({
      _id: {
        $in: [...(ids.map(id => id.toString()))],
      },
    }).toArray();
    return courses.map(course => this.fromMongo(course));
  }

  findAllPossibleSemesters(): Promise<Semester | undefined> {
    return Promise.resolve(undefined);
  }

  async findById(id: ID): Promise<Course | undefined> {
    return this.fromMongo(
      await this.collection.find({
        _id: id.toString()
      })
    );
  }
}