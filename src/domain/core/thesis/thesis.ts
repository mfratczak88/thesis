import { ID } from '../id';
import { Exam } from './exam';

export class Thesis {
  private readonly authors: ID[] = [];
  private readonly keywordsIds: ID[] = [];
  private readonly exams: Exam[] = [];

  constructor(
    private id: ID,
    private readonly title: string,
    private readonly leadingProfessorId: ID,
    private readonly submissionDate: Date,
    authors: Set<ID>,
  ) {
    authors.forEach(author => this.authors.push(author));
  }

}