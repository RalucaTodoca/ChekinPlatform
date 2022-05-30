import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDays } from 'date-fns';
import Swal from 'sweetalert2';
import { PlannerDTO } from '../classes/plannerDTO';
import { User } from '../classes/user';
import { PlannerService } from '../services/planner/planner.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-student-enrollments',
  templateUrl: './student-enrollments.component.html',
  styleUrls: ['./student-enrollments.component.scss']
})
export class StudentEnrollmentsComponent implements OnInit {

  public planners: PlannerDTO[] | undefined;
  public user: User | undefined;

  constructor(
    private plannerService: PlannerService,
    private userService: UserService,
    private router: Router) { }

  public getPlanners(): void{
    this.userService.getStudentPlanners().subscribe(
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
       })
    }


    ngOnInit(): void {
      this.getPlanners();
      this.getUser();
    }

  
}
