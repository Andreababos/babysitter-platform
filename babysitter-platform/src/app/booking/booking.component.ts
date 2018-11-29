import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../entities/service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  @Input() service: Service;
  @Input() type: string;

  constructor() { }

  ngOnInit() {
  }

}
