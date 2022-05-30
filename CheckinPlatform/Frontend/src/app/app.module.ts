import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddUserComponent } from './add-user/add-user.component';


import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MainContentComponent } from './main-content/main-content.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddCourseComponent } from './add-course/add-course.component';


import { AddEventComponent } from './add-event/add-event.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClassroomComponent } from './add-classroom/add-classroom.component';
import { AddFeatureComponent } from './add-feature/add-feature.component';
import { CoursesComponent } from './courses/courses.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { FeaturesComponent } from './features/features.component';
import { EditFeatureComponent } from './edit-feature/edit-feature.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditClassroomComponent } from './edit-classroom/edit-classroom.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { ClassroomDetailsComponent } from './classroom-details/classroom-details.component';
import { StudentEnrollmentsComponent } from './student-enrollments/student-enrollments.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddUserComponent,
    MainContentComponent,
    AddCourseComponent,
    AddEventComponent,
    AddClassroomComponent,
    AddFeatureComponent,
    CoursesComponent,
    ClassroomsComponent,
    FeaturesComponent,
    EditFeatureComponent,
    EditCourseComponent,
    EditClassroomComponent,
    CourseDetailsComponent,
    ClassroomDetailsComponent,
    StudentEnrollmentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    HttpClientModule,
    MatDialogModule,

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
