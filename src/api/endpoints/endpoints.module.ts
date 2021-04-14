import { Module } from '@nestjs/common';
import { CommandsModule } from '../commands/commands.module';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './auth.controller';
import StudentController from './student.controller';
import { QueryModule } from '../queries/query.module';
import { CoursesController } from './courses.controller';
import { InfrastructureModule } from '../../infrastructure/infrastructure.module';

@Module({
  imports:[CommandsModule, QueryModule, AuthModule, InfrastructureModule],
  controllers:[
    AuthController,
    StudentController,
    CoursesController
  ]
})
export class EndpointsModule {

}