import { ID } from '../id';
import { StudyLevel } from './study-level';
import { StudyMode } from './study-mode';

export class Course {
  id: ID;
  name: string;
  level: StudyLevel;
  mode: StudyMode;
  facultyId: ID;
}