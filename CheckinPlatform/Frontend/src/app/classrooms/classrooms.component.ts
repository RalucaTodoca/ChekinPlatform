import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Classroom } from '../classes/classroom';
import { ClassroomDTO } from '../classes/classroomDTO';
import { Feature } from '../classes/feature';
import { ClassroomDetailsComponent } from '../classroom-details/classroom-details.component';
import { FeaturesComponent } from '../features/features.component';
import { ClassroomService } from '../services/classroom/classroom.service';


@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  classrooms: Classroom[] | undefined;

  constructor(
    private classroomService: ClassroomService,
    private detailsModal: MatDialog,
    private router: Router) { }

  public getClassrooms(): void{
    this.classroomService.getClassrooms().subscribe(
      (response: Classroom[]) => {
        this.classrooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteClassroom(classroomId: number): void{
    this.classroomService.deleteClassroom(classroomId).subscribe(
      (response: void) => {
        console.log(response);
        this.getClassrooms();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditClassroom(classroomId: number): void{
    this.classroomService.setEditClassroomId(classroomId);
    this.router.navigateByUrl('edit-classroom');
  }

  public goToAddClassroom(){
    this.router.navigateByUrl('add-classroom');
  }

  public onDetailsClassroom(name: string, location: string, capacity: number, features: Feature[]): void{
    var featureNames: string = "";
    if (features.length > 0){
      for (let i = 0; i < features.length-1; i++){
        featureNames = featureNames + features[i].name + ", ";
      }
      featureNames = featureNames + features[features.length-1].name;
    } else{
      featureNames = "none"
    }
    this.detailsModal.open(ClassroomDetailsComponent, {
      data: {
        name: name,
        location: location,
        capacity: capacity,
        features: featureNames
      }
    })
  }

  public openConfirmationDialog(classroomId: number, classroomName: string): void{
    Swal.fire({
      title: 'Are you sure?',
      text: 'associated events will be removed',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onDeleteClassroom(classroomId);
        Swal.fire(
          'Deleted!',
          classroomName + ' has been removed',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getClassrooms();
  }

}
