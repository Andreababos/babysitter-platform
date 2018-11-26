import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './store';
import { User } from '../entities/user';


@Injectable({
    providedIn: 'root'
})

export class UsersActions {

constructor (
  private ngRedux: NgRedux<IAppState>,
) {} 
  
    static GET_USERS: string = 'GET_USERS'; 
    static CREATE_USER: string = 'CREATE_USER'; 
    static CREATE_USER_SUCCESS: string = 'CREATE_USER_SUCCESS';
    static CREATE_USER_FAILURE: string = 'CREATE_USER_FAILURE';
    static UPDATE_USER: string = 'UPDATE_USER'; 
    static DELETE_USER: string = 'DELETE_USER'; 


    getSitters(){
        this.ngRedux.dispatch({

            type: UsersActions.GET_USERS,
            payload: []
        })
    }

    createUser(user: User):void {
        this.ngRedux.dispatch({

            type: UsersActions.CREATE_USER,
            payload: user
        })
    }

    updateUser(user:User): void{
        this.ngRedux.dispatch({
            type: UsersActions.UPDATE_USER,
            payload: user
        })
    }

    deleteUser(userId:string): void{
        this.ngRedux.dispatch({
            type: UsersActions.DELETE_USER,
            payload: userId
        })
    }
}
