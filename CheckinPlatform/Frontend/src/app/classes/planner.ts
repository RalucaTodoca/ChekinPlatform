import { User } from "./user";

export class Planner{
    public id: number;
    public startTime: string;
    public courseId: number;
    public classroomId: number;
    public remainingPlaces: number;
    public enrolledStudents: User[];

    public constructor(id: number, startTime: string, courseId: number, classroomId: number, 
        remainingPlaces: number, enrolledStudents: User[]){
        this.id = id;
        this.startTime = startTime;
        this.courseId = courseId;
        this.classroomId = classroomId;
        this.remainingPlaces = remainingPlaces;
        this.enrolledStudents = enrolledStudents;
    }
}