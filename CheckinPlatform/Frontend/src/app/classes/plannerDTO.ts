import { ClassroomDTO } from "./classroomDTO";
import { CourseDTO } from "./courseDTO";

export class PlannerDTO{
    public id: number;
    public startTime: string;
    public course: CourseDTO;
    public classroom: ClassroomDTO;
    public remainingPlaces: number;
    public dayOfWeek: number;
    public enrolledStudents: number[];

    public constructor(id: number, startTime: string, course: CourseDTO, 
        classroom: ClassroomDTO, remainingPlaces: number, dayOfWeek: number, enrolledStudents: number[]){
        this.id = id;
        this.startTime = startTime;
        this.course = course;
        this.classroom = classroom;
        this.remainingPlaces = remainingPlaces;
        this.dayOfWeek = dayOfWeek;
        this.enrolledStudents = enrolledStudents;
    }
    
}
