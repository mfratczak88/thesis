import StudentRepository from './student.repository';
import { Name } from '../../name';
import { Email } from '../../email';
import { ID } from '../../id';
import { TelephoneNumber } from '../../telephone-number';
import IdGenerator from '../../id-generator';
import { Student } from '../student';
import { Inject, Injectable } from '@nestjs/common';
import { Semester } from '../../course/semester';
import { CourseRepository } from '../../course/ports/course.repository';
import { StudiedCourse } from '../studied-course';

@Injectable()
export class StudentService {
  constructor(
    @Inject('StudentRepository') private readonly studentRepo: StudentRepository,
    @Inject('CourseRepository') private readonly courseRepo: CourseRepository,
    @Inject('IdGenerator') private readonly idGenerator: IdGenerator,
  ) {
  }

  async createStudent(
    name: Name,
    phoneNumber: TelephoneNumber,
    email: Email,
    studiedCourses: StudiedCourse[],
    userId: ID,
  ) {
    await this.validateCoursesExistence(studiedCourses);
    await this.validateStudentIsNotCreatedAlready(email);
    const id = this.idGenerator.generate();

    return await this.studentRepo.save(
      new Student(
        id,
        name,
        phoneNumber,
        email,
        studiedCourses,
        userId,
      ),
    );
  }

  async validateCoursesExistence(studiedCourses: StudiedCourse[]) {
    const existingCoursesIds = (
      await this.courseRepo.findAllByIds(
        studiedCourses.map(course => course.courseId)
      )
    ).map(course => course.id.toString());

    const difference = studiedCourses.map(course=>course.courseId.toString()).filter(id => !existingCoursesIds.includes(id));
    if (difference.length) {
      throw new Error(`Courses with ids: ${difference.join(',')} does not exist`);
    }
  }

  async validateStudentIsNotCreatedAlready(email: Email) {
    const student = await this.studentRepo.findByEmail(email);
    if (student)
      throw new Error(`Student already exist with id ${student.id.toString()}`);
  }
}