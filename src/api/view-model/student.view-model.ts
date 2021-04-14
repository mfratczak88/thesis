import { CourseViewModel } from './course.view-model';

export class StudentViewModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
  studiedCourses: {
    id: string,
    yearOfStart: number,
    semesterOfStart: string,
    course: CourseViewModel
  }[];
}