import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classroom } from '../classes/classroom';
import { Feature } from '../classes/feature';
import { ClassroomService } from '../services/classroom/classroom.service';
import { FeatureService } from '../services/feature/feature.service';

@Component({
  selector: 'app-edit-classroom',
  templateUrl: './edit-classroom.component.html',
  styleUrls: ['./edit-classroom.component.scss']
})
export class EditClassroomComponent implements OnInit {

  public editClassroomId: number | undefined;
  
  public editClassroom: Classroom | undefined;
    
  public features: Feature[] | undefined; 
  
  public selectedFeatures: string[] | undefined; 

  constructor(
    private formBuilder: FormBuilder,
    private classroomService: ClassroomService,
    private featureService: FeatureService,
    private router: Router) { }


  preselectedFeaturesForm!: FormControl;

  public editClassroomForm = this.formBuilder.group({
    name:[],
    location:[],
    capacity:[, [Validators.required, Validators.pattern("^[0-9]*$")]],
    features:[]
    });

  public getEditClassroomId(): void{
    this.classroomService.getEditClassroomId().subscribe(
      classroomId => this.editClassroomId = classroomId
    );
  }

  public getEditClassroom(): void{
    if(this.editClassroomId !== undefined){
      this.classroomService.getClassroomById(this.editClassroomId).subscribe(
        (response: Classroom) => {
          console.log(response);
          this.editClassroom = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public updateClassroom(editClassroomForm: FormGroup): void{
    if (this.editClassroom !== undefined && this.editClassroomId !== undefined){
      this.classroomService.updateClassroom(editClassroomForm.value, this.editClassroomId).subscribe(
        (response: Classroom) => {
          console.log(response);
          this.router.navigateByUrl('classrooms');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public getFeatures(): void{
    this.featureService.getFeatures().subscribe(
      (response: Feature[]) => {
        this.features = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getEditClassroomFeatures(): void{
    if (this.editClassroomId !== undefined){
      this.classroomService.getClassroomFeatures(this.editClassroomId).subscribe(
        (response: string[]) => {
          this.selectedFeatures = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getEditClassroomId();
    this.getEditClassroom();
    this.getEditClassroomFeatures();
    this.getFeatures();
  }

}
