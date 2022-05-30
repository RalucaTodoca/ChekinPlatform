
import { AddEventComponent } from './add-event/add-event.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { MainContentComponent } from './main-content/main-content.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component'
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { FeaturesComponent } from './features/features.component';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { AdminGuard } from './guards/admin.guard';
import { TeacherGuard } from './guards/teacher.guard';
import { StudentEnrollmentsComponent } from './student-enrollments/student-enrollments.component';
import { StudentGuard } from './guards/student.guard';

const routes: Routes = [

  {
    path: 'user',
    component: AddUserComponent

  },
  {path: 'enrollments', component: StudentEnrollmentsComponent, canActivate: [StudentGuard]},
  {
    path: 'courses', component: CoursesComponent, canActivate: [AdminGuard]
  },
  {
    path: 'add-course', component: AddCourseComponent, canActivate: [AdminGuard]
  },
  {
    path: 'edit-course', component: EditCourseComponent, canActivate: [AdminGuard]
  },
  {
    path: '', component: MainContentComponent, 
  },
  {
    path: 'add-event', component: AddEventComponent, canActivate: [TeacherGuard]
  },
  {
    path: 'classrooms', component: ClassroomsComponent, canActivate: [AdminGuard]
  },
  {
    path: 'add-classroom', component: AddClassroomComponent, canActivate: [AdminGuard]
  },
  {
    path: 'edit-classroom', component: EditClassroomComponent, canActivate: [AdminGuard]
  },
  {
    path: 'features', component: FeaturesComponent, canActivate: [AdminGuard]
  },
  {
    path: 'add-feature', component: AddFeatureComponent, canActivate: [AdminGuard]
  },
  {
    path: 'edit-feature', component: EditFeatureComponent, canActivate: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
