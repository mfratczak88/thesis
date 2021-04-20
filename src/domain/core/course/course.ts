import { ID } from '../id';
import { StudyLevel } from './study-level';
import { StudyMode } from './study-mode';
import { IsDefined, IsNotEmpty } from 'class-validator';
import { Validate } from '../validation/validate';

@Validate
export class Course {

  @IsDefined()
  id: ID;

  @IsNotEmpty()
  name: string;

  @IsDefined()
  level: StudyLevel;

  @IsDefined()
  mode: StudyMode;

  @IsDefined()
  facultyId: ID;

  constructor(id: ID, name: string, level: StudyLevel, mode: StudyMode, facultyId: ID) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.mode = mode;
    this.facultyId = facultyId;
  }
}