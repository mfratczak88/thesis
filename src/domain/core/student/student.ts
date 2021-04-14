import { Name } from '../name';
import { TelephoneNumber } from '../telephone-number';
import { Email } from '../email';
import { ID } from '../id';
import { StudiedCourse } from './studied-course';

export class Student {

  readonly id: ID;

  readonly name: Name;

  readonly phoneNumber: TelephoneNumber;

  readonly email: Email;

  readonly studiedCourses: StudiedCourse[];

  readonly userId: ID;


  constructor(id: ID, name: Name, phoneNumber: TelephoneNumber, email: Email, studiedCourses: StudiedCourse[], userId: ID) {
    this.id = id;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.userId = userId;

    if (studiedCourses.length === 0)
      throw new Error('Student has to be enrolled on at least one course');
    this.studiedCourses = [];

    studiedCourses.forEach(course => this.enrollOnCourse(course));
  }

  enrollOnCourse(course: StudiedCourse) {
    if (this.studiedCourses.some(c => c.courseId === c.courseId)) {
      throw new Error('Student is already enrolled on this course');
    }
    this.studiedCourses.push(course);
  }


}