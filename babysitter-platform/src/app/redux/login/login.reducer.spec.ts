var deepFreeze = require('deep-freeze');
import { LoginReducer } from './login.reducer';
import * as types from './login.actions';
import { LoginState } from './../store';

 describe('Login reducer', () => {

  it('should return the initial state', () => {
    expect(LoginReducer(undefined, {})).toEqual({ 'isAuthenticated' : false, 'userId': '', 'expirationDate': '', 'role': ''})
  })

  it('should successfully log in', () => {
    let state = LoginState.getEmptyState()
    deepFreeze(state);
    let today = new Date();
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate()+1);
    let userdata = { 'isAuthenticated' : true, 'userId': '5c0936ac04894fd045295028', 'expirationDate': nextDay, 'role': 'sitter'}
    expect(LoginReducer(state, {type: types.LoginActions.LOGIN, payload: userdata})).toEqual(userdata)
  })

  it('should log out', () => {
    let state = { 'isAuthenticated' : true, 'userId': '5c0936ac04894fd045295028', 'expirationDate': '2018-04-12', 'role': 'sitter'}
    deepFreeze(state);
    expect(LoginReducer(state, {type: types.LoginActions.LOGOUT})).toEqual(LoginState.getEmptyState())
  })
  

})