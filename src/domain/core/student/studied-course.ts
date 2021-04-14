import { ID } from '../id';
import { Semester } from '../course/semester';

export class StudiedCourse {
  id?:ID;
  courseId:ID;
  yearOfStart:number
  semesterOfStart:Semester

}