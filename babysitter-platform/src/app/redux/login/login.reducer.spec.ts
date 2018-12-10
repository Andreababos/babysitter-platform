var deepFreeze = require('deep-freeze');
import { LoginReducer } from './login.reducer';
import * as types from './login.actions';
import { LoginState } from './../store';
import { UsersService } from 'src/app/services/users.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';
import { User } from 'src/app/entities/user';

 describe('Login reducer', () => {

  it('should return the initial state', () => {
    expect(LoginReducer(undefined, {})).toEqual({ 'isAuthenticated' : false, 'userId': '', 'expirationDate': '', 'role': ''})
  })

  it('should successfully log in', () => {
    let state = LoginState.getEmptyState();
    let today = new Date();
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate()+1);
    let userdata = { 'isAuthenticated' : true, 'userId': '5c0936ac04894fd045295028', 'expirationDate': nextDay, 'role': 'sitter'}
    expect(LoginReducer(state, {type: types.LoginActions.LOGIN, payload: userdata})).toEqual(userdata)
  })

  it('should log out', () => {
    let state = LoginState.getEmptyState();
    expect(LoginReducer(state, {type: types.LoginActions.LOGOUT})).toEqual(LoginState.getEmptyState())
  })
  

})