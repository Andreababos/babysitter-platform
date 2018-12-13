import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { UsersActions } from '../users/users.actions';


@Injectable({
    providedIn: 'root'
})

export class LoginActions {

constructor (
  private ngRedux: NgRedux<IAppState>,
  private usersService: UsersService,
  private router: Router
) {} 
  
    static LOGIN: string = 'LOGIN';
    static LOGOUT: string = 'LOGOUT';


    login(email:string, password:string){
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )
        this.usersService.authenticate(email, password).subscribe( data =>{
            this.ngRedux.dispatch({
                type: LoginActions.LOGIN,
                payload: data
            } as any )
            this.ngRedux.dispatch({
                type: UsersActions.STOP_SPINNER
            } as any )
            this.router.navigateByUrl('/portal');
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
            this.ngRedux.dispatch({
                type: UsersActions.STOP_SPINNER
            } as any )
        })
    }

    logout(){  
        this.ngRedux.dispatch({
            type: LoginActions.LOGOUT,
        } as any )
        this.router.navigateByUrl('/home/login');
        
    }
}
