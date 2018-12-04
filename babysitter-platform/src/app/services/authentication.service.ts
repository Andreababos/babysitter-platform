import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Userdata } from '../entities/userdata';
import { Router } from "@angular/router";
import { UsersService } from './users.service';
import { error } from '@angular/compiler/src/util';


// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/catch';



@Injectable()
export class AuthenticationService {
  public userData: Userdata = new Userdata;
  public success: boolean = false;

  constructor( 
    private http:HttpClient,
    private router: Router,
    private usersService: UsersService
    ) { }

  public clearUserData() {
    this.userData = new Userdata;
  }

  public saveData() {
    this.removeCookie();
    this.setCookie();
  }

  public getUserData() {
    return this.userData;
  }

  public authenticate(email, password): Userdata{

     this.usersService.getUsers().subscribe( (data: any) => {
        let users = data.filter(user => user.filter == "andrea");
        let today = new Date();
        let nextDay = new Date(today);
        nextDay.setDate(today.getDate()+1);

        users.forEach(user => {
            if(user.email == email && user.password == password){
                this.userData.isAuthenticated = true;
                this.userData.userId = data['_id'];
                this.userData.expirationDate = nextDay;
                this.userData.role = data['role'];
                return this.userData
            }
        })
     })
     return this.userData;
  }

  public removeAuthentication () {
    this.clearUserData();
    this.removeCookie();
  };

  public setCookie() {
    let date = this.userData.expirationDate;
    document.cookie = "auth_data ="+ this.userData+"; expires=" + date + "; path=/";
  }

  public removeCookie() {
    document.cookie = 'auth_data=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  public retrieveSavedData(name) {
    if (document.cookie.indexOf('auth_data=') !== -1) {
      var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
      if (match) return match[1];
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  public isAuthenticated() {
    let date = new Date();
    if (this.userData.isAuthenticated && date < this.userData.expirationDate) {
      return true;
    } else {
      try {
        this.retrieveSavedData('auth_data');
        return true;
      } catch (e) {
        console.log('Authentication not found');
        return false;
      }
    }
  };
}

