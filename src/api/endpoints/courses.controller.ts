import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllCoursesQuery } from '../queries/course/get-all-courses.query';

@Controller("course")
export class CoursesController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get()
  async getAllCourses() {
    return this.queryBus.execute(new GetAllCoursesQuery());
  }
}