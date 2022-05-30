import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  name!: string;
  year!: number;
  section!: string;
  features!: string[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, year: number, section: string, features: string[]}) {
    this.name = data.name;
    this.year = data.year;
    this.section = data.section;
    this.features = data.features;
   }

  ngOnInit(): void {
  }

}
