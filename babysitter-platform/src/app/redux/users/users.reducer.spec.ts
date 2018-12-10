var deepFreeze = require('deep-freeze');
import { UsersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersState } from './../store';
import { UsersService } from 'src/app/services/users.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { User } from 'src/app/entities/user';


beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [
        HttpClientTestingModule
      ],
    })
  })

 describe('Users reducer', () => {

  it('should return the initial state', () => {
    expect(UsersReducer(undefined, {})).toEqual({users: [], errorMessage: '', loading: false})
  })

  it('should start the spinner', () => {
    let state = UsersState.getEmptyState();
    deepFreeze(state);
    expect(UsersReducer(state, {type: types.UsersActions.START_SPINNER})).toEqual({users: [], errorMessage: '', loading: true})
  })

  it('should stop the spinner', () => {
    let state = {users: [], errorMessage: '', loading: true}
    deepFreeze(state);
    expect(UsersReducer(state, {type: types.UsersActions.STOP_SPINNER})).toEqual({users: [], errorMessage: '', loading: false})
  })
  
  it('should return an error message', () => {
    let state = UsersState.getEmptyState();
    deepFreeze(state);
    expect(UsersReducer(state, {type: types.UsersActions.FAILURE, payload:'Error'})).toEqual({users: [], errorMessage: 'Error', loading: false})
  })

  it('should get all users', () => {
    inject( [HttpTestingController, UsersService], (  httpMock: HttpTestingController, service: UsersService) => {
    let state = UsersState.getEmptyState()
    deepFreeze(state);
    service.getUsers().subscribe( (result: any) =>{
        let afterState = UsersReducer(state, {type: types.UsersActions.GET_USERS, payload: result})
        let expectedState = {users: result, errorMessage: '', loading: false}
        expect(afterState).toEqual(expectedState)
    })
    })
  })

  it('should add new user', () => {
    let state = UsersState.getEmptyState()
    let newUser = {
        "bio": "I love children!",
        "picture": "https://images.pexels.com/photos/853408/pexels-photo-853408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "location": "Copenhagen",
        "phone": "51888426",
        "schedule": "",
        "filter": "andrea",
        "firstName": "Mark",
        "lastName": "Jacobsen",
        "email": "sitter@mail.com",
        "password": "password",
        "birthDate": "1990-04-13",
        "gender": "male",
        "role": "sitter"
    }
    deepFreeze(state)
    var newArray = [...state.users, newUser]
    expect(UsersReducer(state, {type: types.UsersActions.CREATE_USER, payload: newUser})).toEqual({users: newArray, errorMessage: '', loading: false})
  })

  it('should update user', () => {
    let user :User = {
        "_id": "5c0936ac04894fd045295028",
        "bio": "I really love children!",
        "picture": "https://images.pexels.com/photos/853408/pexels-photo-853408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "location": "Copenhagen",
        "phone": "51888426",
        "schedule": "",
        "filter": "andrea",
        "firstName": "Mark",
        "lastName": "Jacobsen",
        "email": "sitter@mail.com",
        "password": "password",
        "birthDate": "1990-04-13",
        "gender": "male",
        "role": "sitter"
    }
    let newUser: User = {
        "_id": "5c0936ac04894fd045295028",
        "bio": "I love children!",
        "picture": "https://images.pexels.com/photos/853408/pexels-photo-853408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "location": "Copenhagen",
        "phone": "51888426",
        "schedule": "",
        "filter": "andrea",
        "firstName": "Mark",
        "lastName": "Jacobsen",
        "email": "sitter@mail.com",
        "password": "password",
        "birthDate": "1990-04-13",
        "gender": "male",
        "role": "sitter"
    }
    let state = {users: [user], errorMessage: '', loading: false}
    deepFreeze(state);
    expect(UsersReducer(state, {type: types.UsersActions.UPDATE_USER, payload: newUser})).toEqual({users: [newUser], errorMessage: '', loading: false})
  })

  it('should delete user', () => {
    let user :User = {
        "_id": "5c0936ac04894fd045295028",
        "bio": "I really love children!",
        "picture": "https://images.pexels.com/photos/853408/pexels-photo-853408.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        "location": "Copenhagen",
        "phone": "51888426",
        "schedule": "",
        "filter": "andrea",
        "firstName": "Mark",
        "lastName": "Jacobsen",
        "email": "sitter@mail.com",
        "password": "password",
        "birthDate": "1990-04-13",
        "gender": "male",
        "role": "sitter"
    }
    let state = {users: [user], errorMessage: '', loading: false}
    deepFreeze(state);
    expect(UsersReducer(state, {type: types.UsersActions.DELETE_USER, payload: '5c0936ac04894fd045295028'})).toEqual({users: [], errorMessage: '', loading: false})
  })

})