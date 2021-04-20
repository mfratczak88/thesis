import { Inject } from '@nestjs/common';
import { CreateStudentCommand } from './create-student.command';
import { AuthService } from '../../../auth/auth.service';
import { StudentService } from '../../../../domain/core/student/ports/student.service';
import { Role } from '../../../auth/authorization/roles/role.enum';
import { Email } from '../../../../domain/core/email';
import { TelephoneNumber } from '../../../../domain/core/telephone-number';
import { Name } from '../../../../domain/core/name';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../unit-of-work.provider';
import { ID } from '../../../../domain/core/id';
import { Semester } from '../../../../domain/core/course/semester';

@CommandHandler(CreateStudentCommand)
export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
    @Inject('UnitOfWork') private readonly unitOfWork: UnitOfWork,
  ) {
  }

  async execute(command: CreateStudentCommand): Promise<ID> {
    try {
      await this.unitOfWork.beginTransaction();
      const { email, firstName, lastName, phoneNumber, studiedCourses } = command;
      const userId = await this.authService.createUser(email, Role.Student);
      const courses = studiedCourses.map(course => {
        const { courseId, semesterOfStart, yearOfStart } = course;
        return {
          courseId: new ID(courseId),
          semesterOfStart: { name: semesterOfStart },
          yearOfStart,
        };
      });
      const studentId = await this.studentService.createStudent(
        new Name(firstName, lastName),
        new TelephoneNumber(phoneNumber),
        new Email(email),
        courses,
        userId,
      );
      await this.unitOfWork.commit();
      return studentId;
    } catch (err) {
      await this.unitOfWork.rollback();
      throw err;
    }
  }
}