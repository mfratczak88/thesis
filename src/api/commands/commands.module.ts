import { Module } from '@nestjs/common';
import { CreateStudentCommandHandler } from './student/create-student/create-student.command-handler';
import { DomainModule } from '../../domain/domain.module';
import { AuthModule } from '../auth/auth.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports:[DomainModule, AuthModule, CqrsModule],
  providers: [CreateStudentCommandHandler],
  exports:[CreateStudentCommandHandler,CqrsModule]
})
export class CommandsModule {

}