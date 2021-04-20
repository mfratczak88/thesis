import {
  ArrayNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';


export class CreateStudentCommand {

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsMobilePhone('pl-PL')
  readonly phoneNumber: string;

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => StudiedCourse)
  readonly studiedCourses: StudiedCourse[];
}

class StudiedCourse {
  @IsNotEmpty()
  courseId: string;
  @IsNotEmpty()
  yearOfStart: number;
  @IsNotEmpty()
  semesterOfStart: string;
}