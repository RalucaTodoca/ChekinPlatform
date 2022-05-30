import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feature } from 'src/app/classes/feature';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {

  private apiUrl: string = environment.apiBaseUrl;
  private editFeatureId = new BehaviorSubject(0);
  private currentEditFeatureId = this.editFeatureId.asObservable(); 

  constructor(private http: HttpClient) { }

  public addFeature(feature: Feature): Observable<Feature>{
    return this.http.post<Feature>(`${this.apiUrl}/feature`, feature);
  }

  public getFeatures(): Observable<Feature[]>{
    return this.http.get<Feature[]>(`${this.apiUrl}/feature/all`);
  }

  public deleteFeature(featureId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/feature/${featureId}`);
  }

  public getFeatueById(featureId: number): Observable<Feature>{
    return this.http.get<Feature>(`${this.apiUrl}/feature/${featureId}`);
  }

  public updateFeature(feature: Feature, featureId: number): Observable<Feature>{
    return this.http.put<Feature>(`${this.apiUrl}/feature/${featureId}`, feature);
  }

  public setEditFeatureId(featureId: number){
      this.editFeatureId.next(featureId);
  }

  public getEditFeatureId(): Observable<number>{
    return this.currentEditFeatureId;
  }
}
