import { Course } from './course';
import { Classroom } from 'src/app/classes/classroom';

export class Event{
  public id: number;
  public course: Course;
  public classroom: Classroom;
  public day: string;
  public remainingPlaces: number;

  public constructor(id: number, course: Course, classroom: Classroom, day: string, remainingPlaces: number){
      this.id = id;
      this.course = course;
      this.classroom = classroom;
      this.day = day;
      this.remainingPlaces = remainingPlaces;
  }
}
