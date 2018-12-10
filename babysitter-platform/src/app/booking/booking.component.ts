import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../entities/booking';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { BookingActions } from '../redux/bookings/booking.actions';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @Input('book') user: any;
  @Input() type: string;
  public bookingForm: FormGroup;
  public total: number = 0;
  public parentId: string;
  public minDate = new Date();
  public maxDate = new Date(2020, 0, 1);
  public schedulerFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  constructor(
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private bookingActions: BookingActions
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.userData).subscribe((data) => {
      this.parentId = data.userId
  })
    this.bookingForm = this.fb.group({
      'startDate': ['', Validators.required],
      'endDate': ['', Validators.required],
    })
    this.onChanges()
  }

  onChanges(): void {
    this.bookingForm.valueChanges.subscribe(val => {
      if(this.bookingForm && this.bookingForm.valid){
        if(this.bookingForm.value.startDate < this.bookingForm.value.endDate){
          this.total = this.daysBetween( this.bookingForm.value.startDate, this.bookingForm.value.endDate ) * this.user.price
        }
      }
    });
  }

  daysBetween( date1, date2 ) {
    //Get 1 hour in milliseconds
    var one_hour=1000*60*60;
  
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()
  
    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms
      
    // Convert back to days and return
    return Math.round(difference_ms/one_hour)
  }

  public book(){
    if(this.bookingForm.valid){
      if(this.bookingForm.value.startDate < this.bookingForm.value.endDate){
        let booking = Object.assign(new Booking(), this.bookingForm.value);
        booking.sitterId = this.user._id;
        booking.parentId = this.parentId;
        booking.payout = this.total;
        this.bookingActions.createBooking(booking);
      }
    }
  }

}
