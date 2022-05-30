import { FeatureService } from './../services/feature/feature.service';
import { Feature } from 'src/app/classes/feature';
import { Course } from './../classes/course';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../services/course/course.service';
import { Classroom } from '../classes/classroom';
import { ClassroomService } from '../services/classroom/classroom.service';

import {addDays} from 'date-fns';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { PlannerService } from '../services/planner/planner.service';
import { PlannerDTO } from '../classes/plannerDTO';
import { User } from '../classes/user';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  public planners: PlannerDTO[] | undefined;
  public user: User | undefined;

  constructor(
    private plannerService: PlannerService,
    private userService: UserService,
    private router: Router) { }

  public getPlanners(): void{
    this.plannerService.getPlanners().subscribe(
      (response: PlannerDTO[]) => {
        this.planners = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUser(): void{
    this.userService.getCurrentUser().subscribe(
      (response: User) => {
        this.user = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePlanner(plannerId: number): void{
    this.plannerService.deletePlanner(plannerId).subscribe(
      (response: void) => {
        console.log(response);
        this.getPlanners();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public assignStudentToPlanner(plannerId: number, userId: number): void{
    this.plannerService.assignStudentToPlanner(plannerId, userId).subscribe(
      (response: PlannerDTO) => {
        console.log(response);
        this.getPlanners();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goToAddEvent(){
    this.router.navigateByUrl('add-event');
  }

  public goToCourses(){
    this.router.navigateByUrl('courses');
  }

  date: Date= new Date();
  firstDayOfWeek= this.date.getDate()-this.date.getDay();
  currentWeek=this.getDaysOfWeek();

  getDaysOfWeek(){
    return [
      new Date(this.date.setDate(this.firstDayOfWeek)),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 1),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 2),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 3),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 4),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 5),
      addDays(new Date(this.date.setDate(this.firstDayOfWeek)), 6),
     ]
   }
   
  public showDetails(planner : PlannerDTO) : void {
    if (this.user?.role === 'STUDENT'){
     Swal.fire({
       showCancelButton: true,
       showConfirmButton: true,
       confirmButtonText: 'Enroll',
       confirmButtonColor: '#3085d6',
       html:
       '<h1><b>' + "Course details" + '</b></h1>' +
       'Name: '  + planner.course.name + '<br> <br>'+
       'Year: '  + planner.course.year + '<br> <br>'+
       'Section: '  + planner.course.section + '<br> <br> <br>' +
       '<h1><b>Classroom details</b></h1>' +
       'Name: '  + planner.classroom.name + '<br> <br>' +
       'Location: '  + planner.classroom.location + '<br> <br>' +
       'Available spots: ' + planner.remainingPlaces + ' / '+ planner.classroom.capacity + '<br> <br>'
      }).then((result) => {
        if (result.isConfirmed && this.user?.id !== undefined ) {
          if (planner.enrolledStudents.includes(this.user.id) === false){
            this.assignStudentToPlanner(planner.id, this.user?.id);
            Swal.fire(
              'Success!',
              '',
              'success'
            )
          }
          else if (planner.enrolledStudents.includes(this.user.id) === true){
            Swal.fire(
              'You are already enrolled to this event',
              '',
              'info'
            )
          }
        }
        })}
    else if(this.user?.role === 'TEACHER'){
      Swal.fire({
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: '#d33',
        html:
        '<h1><b>' + "Course details" + '</b></h1>' +
        'Name: '  + planner.course.name + '<br> <br>'+
        'Year: '  + planner.course.year + '<br> <br>'+
        'Section: '  + planner.course.section + '<br> <br> <br>' +
        '<h1><b>Classroom details</b></h1>' +
        'Name: '  + planner.classroom.name + '<br> <br>' +
        'Location: '  + planner.classroom.location + '<br> <br>' +
        'Available spots: ' + planner.remainingPlaces + ' / '+ planner.classroom.capacity + '<br> <br>'
       }).then((result) => {
        if (result.isConfirmed) {
          this.onDeletePlanner(planner.id)
          Swal.fire(
            'Deleted!',
            'event has been removed',
            'success'
          )
        }
      })}
    else if(this.user?.role === 'GUEST' || this.user?.role === 'ADMIN'){
      Swal.fire({
        showCancelButton: false,
        showConfirmButton: false,
        html:
        '<h1><b>' + "Course details" + '</b></h1>' +
        'Name: '  + planner.course.name + '<br> <br>'+
        'Year: '  + planner.course.year + '<br> <br>'+
        'Section: '  + planner.course.section + '<br> <br> <br>' +
        '<h1><b>Classroom details</b></h1>' +
        'Name: '  + planner.classroom.name + '<br> <br>' +
        'Location: '  + planner.classroom.location + '<br> <br>' +
        'Available spots: ' + planner.remainingPlaces + ' / '+ planner.classroom.capacity + '<br> <br>'
       })}
    }


    ngOnInit(): void {
      this.getPlanners();
      this.getUser();
    }

}
