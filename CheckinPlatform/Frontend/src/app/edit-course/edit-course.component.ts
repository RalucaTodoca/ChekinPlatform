import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../classes/course';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  public editCourseId: number | undefined;
  public editCourse: Course | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router) { }

  public editCourseForm = this.formBuilder.group({
    name:[],
    year:[],
    section:[]
    // teacher:[''],
  })

  public getEditCourseId(): void{
    this.courseService.getEditCourseId().subscribe(
      courseId => this.editCourseId = courseId
    );
  }

  public getEditCourse(): void{
    if (this.editCourseId !== undefined){
      this.courseService.getCourseById(this.editCourseId).subscribe(
        (response: Course) => {
          console.log(response);
          this.editCourse = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public updateCourse(editCourseForm: FormGroup): void{
    if(this.editCourse !== undefined && this.editCourseId !== undefined){
      this.courseService.updateCourse(editCourseForm.value, this.editCourseId).subscribe(
        (response: Course) => {
          console.log(response);
          this.router.navigateByUrl('courses');
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }


  ngOnInit(): void {
    this.getEditCourseId();
    this.getEditCourse();
  }

}
