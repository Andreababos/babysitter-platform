import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginActions } from '../redux/login/login.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

@Injectable()
export class AuthGuard implements CanActivate {

    public isAuthenticated: boolean;

  constructor(
      private loginActions: LoginActions, 
      private router: Router,
      private ngRedux: NgRedux<IAppState>
      ) {
        this.ngRedux.select(res => res.userData).subscribe((data) => {
            this.isAuthenticated = data.isAuthenticated
          })
      }

  canActivate(): boolean {
        if(this.isAuthenticated){
            return true
        } else {
          this.router.navigate(['/home/login'])
          return false
        }
    }

}