import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../classes/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planner } from 'src/app/classes/planner';
import { PlannerDTO } from 'src/app/classes/plannerDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiBaseUrl;

  /*
  Change the userId to the desired user
  userId: 1 --> GUEST
  userId: 2 --> STUDENT
  userId: 3 --> TEACHER
  userId: 4 --> ADMIN
  */
  private userId: number = 2;

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  public getUserById(userId: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  public getCurrentUser(): Observable<User>{
    return this.getUserById(this.userId);
  }

  public checkIfUserIsAdmin(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/users/admin/${this.userId}`);
  }

  public checkIfUserIsTeacher(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/users/teacher/${this.userId}`);
  }

  public checkIfUserIsStudent(): Observable<boolean>{
    return this.http.get<boolean>(`${this.apiUrl}/users/student/${this.userId}`);
  }

  public getStudentPlanners(): Observable<PlannerDTO[]>{
    return this.http.get<PlannerDTO[]>(`${this.apiUrl}/users/${this.userId}/planners`);
  }

}
