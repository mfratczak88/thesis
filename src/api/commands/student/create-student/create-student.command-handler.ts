import { Injectable } from '@nestjs/common';
import { CreateStudentCommand } from './create-student.command';

import { AuthService } from '../../../auth/auth.service';
import { StudentService } from '../../../../domain/core/student/ports/student.service';
import { Role } from '../../../auth/authorization/roles/role.enum';
import { Email } from '../../../../domain/core/email';
import { TelephoneNumber } from '../../../../domain/core/telephone-number';
import { Name } from '../../../../domain/core/name';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateStudentCommand)
export class CreateStudentCommandHandler implements ICommandHandler<CreateStudentCommand> {
  constructor(
    private readonly studentService: StudentService,
    private readonly authService: AuthService,
  ) {
  }

  async execute(command: CreateStudentCommand): Promise<any> {
    const { email, firstName, lastName, phoneNumber, studiedCourses } = command;
    const userId = await this.authService.createUser(email, Role.Student);

    return this.studentService.createStudent(
      new Name(firstName, lastName),
      new TelephoneNumber(phoneNumber),
      new Email(email),
      studiedCourses,
      userId,
    );
  }

}