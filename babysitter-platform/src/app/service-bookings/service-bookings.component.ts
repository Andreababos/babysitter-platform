import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { Booking } from '../entities/booking';
import { BookingActions } from '../redux/booking/booking.actions';

@Component({
  selector: 'app-service-bookings',
  templateUrl: './service-bookings.component.html',
  styleUrls: ['./service-bookings.component.scss']
})
export class ServiceBookingsComponent implements OnInit {

  public bookings: Booking[];
  public role :string;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private bookingActions: BookingActions
  ) { }

  ngOnInit() {
    this.bookingActions.getBookings();
    this.ngRedux.select(res => res.userData).subscribe((userData) => {
      this.role = userData.role;
      if(this.role == 'parent'){
        this.ngRedux.select(res => res.bookings).subscribe((data) => {
          this.bookings = data.bookings.filter(booking => booking.parentId === userData.userId);
          this.ngRedux.select(res => res.users).subscribe((data) => {
            this.bookings.forEach(booking => {
              booking.sitter = data.users.filter(user => user._id == booking.sitterId)[0];
            })
          })
        })
      } else if(this.role == 'sitter'){
        this.ngRedux.select(res => res.bookings).subscribe((data) => {
          this.bookings = data.bookings.filter(booking => booking.sitterId === userData.userId);
          this.ngRedux.select(res => res.users).subscribe((data) => {
            this.bookings.forEach(booking => {
              booking.parent = data.users.filter(user => user._id == booking.parentId)[0];
            })
          })
        })
      }
    })
  }

}
