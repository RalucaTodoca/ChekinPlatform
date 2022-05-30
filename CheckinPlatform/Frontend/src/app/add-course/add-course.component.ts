import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from '../classes/course';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private courseService: CourseService,
    private router: Router){}

  courseForm = this.formBuilder.group({
    
    name:['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    year:['', [Validators.required]],
    section:['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)]],
    // teacher:[''],
  })

  public addCourse(courseForm: FormGroup): void{
    this.courseService.addCourse(courseForm.value).subscribe(
      (response: Course) => {
        console.log(response);
        this.router.navigateByUrl('courses');
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {  }

}
