import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllStudentsQuery } from '../../../../api/queries/student/get-all-students.query';
import { BaseMongoQueryHandler } from './base-mongo-query.handler';
import { StudentViewModel } from '../../../../api/view-model/student.view-model';
import { GetAllCoursesQuery } from '../../../../api/queries/course/get-all-courses.query';
import { CourseViewModel } from '../../../../api/view-model/course.view-model';


@QueryHandler(
  GetAllStudentsQuery,
)
export class MongoGetAllStudentsQueryHandler extends BaseMongoQueryHandler implements IQueryHandler<GetAllStudentsQuery> {
  async execute(query: GetAllStudentsQuery): Promise<StudentViewModel[]> {
    const students: StudentViewModel[] = await this.db.collection('students').aggregate([]).toArray();
    return [];
  }

}

@QueryHandler(
  GetAllCoursesQuery,
)
export class MongoGetAllCoursesQueryHandler extends BaseMongoQueryHandler implements IQueryHandler<GetAllCoursesQuery> {

  async execute(query: GetAllCoursesQuery): Promise<CourseViewModel[]> {
    const coursesWithFaculties = await this.db.collection('courses').aggregate([{
      $lookup: {
        from: 'faculties',
        localField: 'facultyId',
        foreignField: '_id',
        as: 'faculty',
      },
    },
    ]).toArray();
    return coursesWithFaculties.map(course => {
      const { _id: id, name, level: { levelName: studyLevel }, mode: { modeName: studyMode }, faculty } = course;
      return {
        id,
        name,
        faculty: faculty.map(f => {
          const { _id: id, name, address } = f;
          return {
            id,
            name,
            address,
          };
        })[0],
        studyLevel,
        studyMode,
      };
    });

  }
}
