import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Classroom } from 'src/app/classes/classroom';
import { Feature } from 'src/app/classes/feature';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private apiUrl = environment.apiBaseUrl;
  private editClassroomId = new BehaviorSubject(0);
  private currentEditClassroomId = this.editClassroomId.asObservable();

  constructor(private http: HttpClient) { }

  public addClassroom(classroom: Classroom): Observable<Classroom>{
    return this.http.post<Classroom>(`${this.apiUrl}/classroom`, classroom);
  }

  public getClassrooms(): Observable<Classroom[]>{
    return this.http.get<Classroom[]>(`${this.apiUrl}/classroom/all`);
  }

  public assignFeatureToClassroom(classroomId: number, feature: Feature): Observable<Classroom>{
    return this.http.patch<Classroom>(`${this.apiUrl}/classroom/${classroomId}`, feature);
  }

  public deleteClassroom(classroomId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/classroom/${classroomId}`);
  }

  public getClassroomById(classroomId: number): Observable<Classroom>{
    return this.http.get<Classroom>(`${this.apiUrl}/classroom/${classroomId}`);
  }

  public updateClassroom(classroom: Classroom, classroomId: number): Observable<Classroom>{
    return this.http.put<Classroom>(`${this.apiUrl}/classroom/${classroomId}`, classroom);
  }

  public getClassroomFeatures(classroomId: number): Observable<string[]>{
    return this.http.get<string[]>(`${this.apiUrl}/classroom/${classroomId}/features`);
  }

  public setEditClassroomId(classroomId: number){
    this.editClassroomId.next(classroomId);
}
  public getEditClassroomId(): Observable<number>{
    return this.currentEditClassroomId;
  }
}
