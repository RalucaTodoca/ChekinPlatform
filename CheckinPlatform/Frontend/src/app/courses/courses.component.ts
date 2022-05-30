import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../classes/course';
import { CourseDTO } from '../classes/courseDTO';
import { CourseDetailsComponent } from '../course-details/course-details.component';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] | undefined;

  constructor(
    private courseService: CourseService,
    private detailsModal: MatDialog,
    private router: Router) { }

  public getCourses(): void{
    this.courseService.getCourses().subscribe(
      (response: Course[]) => {
        this.courses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public goToAddCourse(){
    this.router.navigateByUrl('add-course');
  }

  public onDeleteCourse(courseId: number): void{
    this.courseService.deleteCourse(courseId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCourses();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditCourse(courseId: number): void{
    this.courseService.setEditCourseId(courseId);
    this.router.navigateByUrl('edit-course');
  }

  public onDetailsCourse(name: string, year: number, section: string): void{
    this.detailsModal.open(CourseDetailsComponent, {
      data: {
        name: name,
        year: year,
        section: section
      }
    })
  }

  public openConfirmationDialog(courseId: number, courseName: string): void{
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
        this.onDeleteCourse(courseId);
        Swal.fire(
          'Deleted!',
          courseName + ' has been removed',
          'success'
        )
      }
    })
  }

  ngOnInit(): void {
    this.getCourses();
  }

}
