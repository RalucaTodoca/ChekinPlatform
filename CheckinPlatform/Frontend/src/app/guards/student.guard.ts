import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      this.userService.checkIfUserIsStudent().subscribe(
        (response: boolean) => {
          if (response === false){
            this.router.navigateByUrl('');
          }
        }
      );
  
    return this.userService.checkIfUserIsStudent()
  }
  
}
