import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassroomDTO } from '../classes/classroomDTO';
import { CourseDTO } from '../classes/courseDTO';
import { PlannerDTO } from '../classes/plannerDTO';
import { ClassroomService } from '../services/classroom/classroom.service';
import { CourseService } from '../services/course/course.service';
import { PlannerService } from '../services/planner/planner.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {



  courses: CourseDTO[] | undefined;
  classrooms: ClassroomDTO[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private classroomService: ClassroomService,
    private plannerService: PlannerService,
    private router: Router) { }

  eventForm = this.formBuilder.group({
    course:['',Validators.required],
    classroom:['',Validators.required],
    startTime:['', Validators.required]
    })

  public getClassrooms(): void{
    this.classroomService.getClassrooms().subscribe(
      (response: ClassroomDTO[]) => {
        this.classrooms = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getCourses(): void{
    this.courseService.getCourses().subscribe(
      (response: CourseDTO[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public addEvent(eventForm: FormGroup): void{
    let classroomId: number = this.eventForm.get('classroom')?.value;
    let courseId: number = this.eventForm.get('course')?.value;
    let startTime: string = this.eventForm.get('startTime')?.value;

    this.plannerService.addPlanner(classroomId, courseId, startTime).subscribe(
      (response: PlannerDTO) => {
        console.log(response);
        this.router.navigateByUrl('');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

  }

  ngOnInit(): void {
     this.getClassrooms();
     this.getCourses();

  }

}
