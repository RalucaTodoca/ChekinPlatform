import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      this.userService.checkIfUserIsTeacher().subscribe(
        (resonse: boolean) => {
          if (resonse === false){
            this.router.navigateByUrl('');
          }
        }
      );
  
    return this.userService.checkIfUserIsTeacher()
  }
  
}
