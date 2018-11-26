import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Service } from '../entities/service';

@Component({
  selector: 'app-find-service',
  templateUrl: './find-service.component.html',
  styleUrls: ['./find-service.component.scss']
})
export class FindServiceComponent implements OnInit {

  public lookingFor: string;
  public services: Service[];

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    if(this.authService.getUserData().role == 'parent'){
      this.lookingFor = 'sitter';
    } else if (this.authService.getUserData().role == 'sitter'){
      this.lookingFor = 'parent';
    }

    this.getServices();

  }

  public getServices(){
    //Dispatch a redux call to get all the services the user is looking for

    this.services = [
      {
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
        "details": "I love children",
        "location": "Hellerup",
        "completed": false
      },
      {
        "id" : "123",
        "date" : new Date, 
        "price": 100,
        "sitter": {
          "id": "123",
          "role": "sitter",
          "email": "markus@a.as",
          "firstName": "Markus",
          "lastName": "Hansen",
          "gender": "male",
          "birthDate": new Date,
          "education": "Web development at KEA",
          "picture": "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        // "parent": {
        //   "id": "123",
        //   "role": "parent",
        //   "email": "alisa@a.as",
        //   "firstName": "Alisa",
        //   "lastName": "Mortensen",
        //   "gender": "female",
        //   "birthDate": new Date
        // },
        // "baby": {
        //   "id": "123134124",
        //   "name": "Ubbe",
        //   "birthDate": new Date,
        //   "gender": "male"
        // },
        "details": "asd",
        "location": "Copenhagen",
        "completed": false
      }
    ]
  }

}
