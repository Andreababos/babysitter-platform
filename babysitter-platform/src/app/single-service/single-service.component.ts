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
    this.service = {
      "id" : "123",
      "date" : new Date, 
      "price": 100,
      "sitter": {
        "id": "123",
        "role": "sitter",
        "email": "anna@a.as",
        "firstName": "Anna",
        "lastName": "Hansen",
        "gender": "female",
        "birthDate": new Date,
        "education": "High School degree",
        "picture": "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      "parent": {
        "id": "123",
        "role": "parent",
        "email": "alisa@a.as",
        "firstName": "Alisa",
        "lastName": "Mortensen",
        "gender": "female",
        "birthDate": new Date
      },
      "baby": {
        "id": "123134124",
        "name": "Hannah",
        "birthDate": new Date,
        "gender": "female",
        "picture": "https://images.pexels.com/photos/1296145/pexels-photo-1296145.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      "details": "I love children",
      "location": "Hellerup",
      "completed": false
    }
  }

}
