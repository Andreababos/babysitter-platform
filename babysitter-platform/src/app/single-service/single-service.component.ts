import { Component, OnInit, Input } from '@angular/core';
import { Service } from '../entities/service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.scss']
})
export class SingleServiceComponent implements OnInit {

  serviceId: string;
  service: Service;
  type: string = 'sitter';

  constructor(
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.serviceId = (params['id']);
      this.loadService();
    })
  }

  public loadService(){
    
  }

}
