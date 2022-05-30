import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CourseDTO } from 'src/app/classes/courseDTO';
import { environment } from 'src/environments/environment';
import { Course } from '../../classes/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = environment.apiBaseUrl;
  private editCourseId = new BehaviorSubject(0);
  private currentEditCourseId = this.editCourseId.asObservable();

  constructor(private http: HttpClient) { }

  public addCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${this.apiUrl}/course`, course);
  }

  public getCourses(): Observable<Course[]>{
    return this.http.get<Course[]>(`${this.apiUrl}/course/all`);
  }

  public deleteCourse(courseId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/course/${courseId}`);
  }

  public getCourseById(courseId: number): Observable<Course>{
    return this.http.get<Course>(`${this.apiUrl}/course/${courseId}`);
  }

  public updateCourse(course: Course, courseId: number): Observable<Course>{
    return this.http.put<Course>(`${this.apiUrl}/course/${courseId}`, course);
  }

  public setEditCourseId(courseId: number){
    this.editCourseId.next(courseId);
  }

  public getEditCourseId(): Observable<number>{
    return this.currentEditCourseId;
  }

}
