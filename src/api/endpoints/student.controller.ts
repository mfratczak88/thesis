import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { Role } from '../auth/authorization/roles/role.enum';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { Roles } from '../auth/authorization/roles/roles.decorator';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateStudentCommand } from '../commands/student/create-student/create-student.command';


@Controller('student')
export default class StudentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin, Role.OfficeClerk)
  async createNewStudent(
    @Body()
      command: CreateStudentCommand
  ) {
    const id = await this.commandBus.execute(command);
    return { id: id.toString() };
  }

}