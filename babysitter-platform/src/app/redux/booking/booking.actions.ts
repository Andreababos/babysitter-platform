import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { UsersActions } from '../users/users.actions';
import { Booking } from 'src/app/entities/booking';


@Injectable({
    providedIn: 'root'
})

export class BookingActions {

constructor (
  private ngRedux: NgRedux<IAppState>,
  private usersService: UsersService,
  private router: Router
) {} 

    static CREATE_BOOKING: string = 'CREATE_BOOKING';
    static GET_BOOKINGS: string = 'GET_BOOKINGS';


    createBooking(booking: Booking){
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )
        this.usersService.addBooking(booking).subscribe( data =>{
            this.ngRedux.dispatch({
                type: BookingActions.CREATE_BOOKING,
                payload: data
            } as any )
            this.ngRedux.dispatch({
                type: UsersActions.STOP_SPINNER
            } as any )
            this.router.navigateByUrl('/my-bookings');
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

    getBookings(){
        this.ngRedux.dispatch({
            type: UsersActions.START_SPINNER
        } as any )
        this.usersService.getBookings().subscribe( (data: any) =>{
            var bookings: Booking[] = data.filter(booking => booking.filter == 'andrea').filter(booking => booking.type == 'booking');
            this.ngRedux.dispatch({
                type: BookingActions.GET_BOOKINGS,
                payload: bookings
            } as any )
            this.ngRedux.dispatch({
                type: UsersActions.STOP_SPINNER
            } as any )
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

}
