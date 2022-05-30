import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-classroom-details',
  templateUrl: './classroom-details.component.html',
  styleUrls: ['./classroom-details.component.scss']
})
export class ClassroomDetailsComponent implements OnInit {

  name!: string;
  location!: string;
  capacity!: number;
  features!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, location: string, capacity: number, features: string}) {
    this.name = data.name;
    this.location = data.location;
    this.capacity = data.capacity;
    this.features = data.features;
   }

  ngOnInit(): void {
  }

}
