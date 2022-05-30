import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder, 
    private userService: UserService,
    private router: Router){}

  userProfileForm = this.formBuilder.group({
    firstName:[''],
    lastName:[''],
    year:[undefined],
    department:[undefined],
    section:[undefined],
    role:['']
  })

  public addUser(userProfileForm: FormGroup): void{
    this.userService.addUser(userProfileForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.router.navigateByUrl('');
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  ngOnInit(): void {
  }


}
