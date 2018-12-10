var deepFreeze = require('deep-freeze');
import { BookingReducer } from './booking.reducer';
import * as types from './booking.actions';
import { BookingState } from './../store';
import { UsersService } from 'src/app/services/users.service';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from  '@angular/common/http/testing';


beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [
        HttpClientTestingModule
      ],
    })
  })

 describe('Bookings reducer', () => {

  it('should return the initial state', () => {
    expect(BookingReducer(undefined, {})).toEqual({'bookings': []})
  })

  it('should get all bookings', () => {
    inject( [HttpTestingController, UsersService], (  httpMock: HttpTestingController, service: UsersService) => {
    let state = BookingState.getEmptyState()
    service.getBookings().subscribe( (result: any) =>{
        let afterState = BookingReducer(state, {type: types.BookingActions.GET_BOOKINGS, payload: result})
        let expectedState = {'bookings': result}
        expect(afterState).toEqual(expectedState)
    })
    })
  })

  it('should add new booking', () => {
    let state = BookingState.getEmptyState()
    let newBooking =  {
        "filter": "andrea",
        "type": "booking",
        "startDate": "2018-12-16T23:00:00.000Z",
        "endDate": "2018-12-18T23:00:00.000Z",
        "sitterId": "5c0936ac04894fd045295028",
        "parentId": "5c0841332ae71b3049c62108",
        "payout": 6240
    }
    deepFreeze(state)
    var newArray = [...state.bookings, newBooking]
    expect(BookingReducer(state, {type: types.BookingActions.CREATE_BOOKING, payload: newBooking})).toEqual({'bookings': newArray})
  })

})