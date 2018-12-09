var deepFreeze = require('deep-freeze');
import { UsersReducer } from './users.reducer';
import * as types from './users.actions';
import { UsersState } from './../store';
import { UsersService } from 'src/app/services/users.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from  '@angular/common/http/testing';


beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [
        HttpClientTestingModule
      ],
    });
  });

 describe('Users reducer', () => {

  it('should return the initial state', () => {
    expect(UsersReducer(undefined, {})).toEqual({users: [], errorMessage: '', loading: false});
  });
  
  it('should get all users', () => {
    inject([UsersService], (service: UsersService) => {
    let state = UsersState.getEmptyState();
    service.getUsers().subscribe( (result: any) =>{
        let afterState = UsersReducer(state, {type: types.UsersActions.GET_USERS, payload: result})
        let expectedState = {users: [1,2,3], errorMessage: '', loading: false}
        expect(afterState).toEqual(expectedState);
    })
    });
  });


  it('should add new user', () => {
    expect(UsersReducer(undefined, {})).toEqual({users: [], errorMessage: '', loading: false});
  });

  it('should update user', () => {
    expect(UsersReducer(undefined, {})).toEqual({users: [], errorMessage: '', loading: false});
  });

  it('should delete user', () => {
    expect(UsersReducer(undefined, {})).toEqual({users: [], errorMessage: '', loading: false});
  });

  // it('Delete sitter', () => {
  //   //var TempDataService = new TempDataService();
  //   let state = UsersState.getEmptyState();
  //   state.sitters = TempDataService.getSitters();
  //   deepFreeze(state);
  //   var afterState = {isBaby: undefined, sitters: TempDataService.getSitters()};
  //   afterState.sitters.splice(1, 1);

  //   var newState = SittersReducer(state, {type: types.SittersActions.DELETE_SITTER, payload: 2});
  //   expect(newState).toEqual(afterState);
  // });

  // it('Update sitter', () => {
  //   //var TempDataService = new TempDataService();
  //   let state = UsersState.getEmptyState();
  //   state.sitters = TempDataService.getSitters();
  //   deepFreeze(state);
  //   var afterState = {isBaby: undefined, sitters: TempDataService.getSitters()};
  //   var updatedSitter = {
  //       sitterId: '1',
  //       email: 'sitter@sitter.dk',
  //       birthDate: new Date(1998, 0, 4),
  //       gender: 'female',
  //       firstname: 'Anna',
  //       lastname: 'Larsson',
  //       education: 'none',
  //       picture: 'https://images.pexels.com/photos/324658/pexels-photo-324658.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //       description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  //       location: 'Copenhagen',
  //       rating: [
  //         {
  //           rating: 5,
  //           description: 'nice',
  //           parentId: '4'
  //         }
  //       ],
  //       phone: '409203809',
  //       schedule: 'Mon - Thursday 12.00 - 18.00'
  //   }

  //   afterState.sitters[0] = updatedSitter;
  //   var newState = SittersReducer(state, {type: types.SittersActions.UPDATE_SITTER, payload: updatedSitter});
  //   expect(newState).toEqual(afterState);
  // })
});