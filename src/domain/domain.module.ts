import { Module } from '@nestjs/common';
import { StudentService } from './core/student/ports/student.service';

@Module({
  providers:[StudentService],
  exports:[StudentService]
})
export class DomainModule {

}