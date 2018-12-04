import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { User } from '../entities/user';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class UsersActions {

constructor (
  private ngRedux: NgRedux<IAppState>,
  private usersService: UsersService,
  private router: Router
) {} 
  
    static GET_USERS: string = 'GET_USERS'; 
    static START_SPINNER: string = 'START_SPINNER'; 
    static FAILURE: string = 'FAILURE';
    static CREATE_USER: string = 'CREATE_USER';
    static UPDATE_USER: string = 'UPDATE_USER';
    static DELETE_USER: string = 'DELETE_USER';
    static LOGIN: string = 'LOGIN';
    static LOGOUT: string = 'LOGOUT';


    getUsers(){
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )

        this.usersService.getUsers().subscribe( result =>{
            this.ngRedux.dispatch({
                type: UsersActions.GET_USERS,
                payload: result
            } as any )
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
        })
    }

    createUser(user: User):void {
        //start the spinner
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )

        this.usersService.addUser(user).subscribe( result =>{
            this.ngRedux.dispatch({
                type: UsersActions.CREATE_USER,
                payload: user
            } as any )
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
        })
        
    }

    updateUser(user:User): void{
        //start the spinner
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )

        this.usersService.updateUser(user).subscribe( result =>{
            this.ngRedux.dispatch({
                type: UsersActions.UPDATE_USER,
                payload: user
            } as any)
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
        })
    }

    deleteUser(userId:string): void{
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )
        this.usersService.deleteUser(userId).subscribe( result =>{
            this.ngRedux.dispatch({
                type: UsersActions.DELETE_USER,
                payload: userId
            } as any )
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
        })
    }


    login(email:string, password:string){
        console.log('result')
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )
        this.usersService.authenticate(email, password).subscribe( result =>{
            console.log(result)
            this.ngRedux.dispatch({
                type: UsersActions.LOGIN,
                payload: result
            } as any )
            this.router.navigateByUrl('/');
        }, error =>{
            this.ngRedux.dispatch({
                type: UsersActions.FAILURE,
                payload: error
            } as any )
        })
    }
}
