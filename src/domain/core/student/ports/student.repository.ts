import { ID } from '../../id';
import { Student } from '../student';
import { Email } from '../../email';


export default interface StudentRepository {

  exists(studentID: ID): Promise<boolean>;

  findById(studentID: ID): Promise<Student | undefined>;

  findByEmail(email: Email): Promise<Student | undefined>;

  findAll(): Promise<Student[]>

  save(student: Student): Promise<ID>;

}