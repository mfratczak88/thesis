import { ID } from '../../id';
import { Course } from '../course';
import { Semester } from '../semester';

export interface CourseRepository {
  findById(id: ID): Promise<Course | undefined>

  findAllByIds(ids: ID[]): Promise<Course[]>

  findAllPossibleSemesters(): Promise<Semester | undefined>
}