import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../entities/service';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.scss']
})
export class SingleServiceComponent implements OnInit {

  @Input() service: Service;
  
  constructor() { }

  ngOnInit() {
  }

}
