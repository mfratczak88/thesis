import { ArrayNotEmpty, IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { StudiedCourse } from '../../../../domain/core/student/studied-course';

export class CreateStudentCommand {

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsMobilePhone('pl-PL')
  readonly phoneNumber: string;

  @ArrayNotEmpty()
  readonly studiedCourses: StudiedCourse[]

}