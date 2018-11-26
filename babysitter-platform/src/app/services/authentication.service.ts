import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Userdata } from '../entities/userdata';
import { Router } from "@angular/router";


// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/operator/catch';



@Injectable()
export class AuthenticationService {
  public userData: Userdata = new Userdata;

  constructor( 
    private http:HttpClient,
    private router: Router
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

  public authenticate(username, password, successCallback, errorCallback){
    let body = new HttpParams({fromString:'grant_type=password&username='+username+'&password='+password});
    
    return this.http.post("/api/oauth/token", body )
      .subscribe(data => {
          this.userData.isAuthenticated = true;
          this.userData.userId = data['.userId'];
          this.userData.expirationDate = new Date(data['.expires']);
          this.userData.role = data['role'];
          this.saveData();
          if (typeof successCallback === 'function') {
            successCallback();
          }
        },
        err => {
          if (typeof errorCallback === 'function') {
            if (err.error.error_description) {
              errorCallback(err.error.error_description);
            } else {
              errorCallback('Unable to contact server; please, try again later.');
            }
          }
        }
      );
  }

  public removeAuthentication () {
    this.clearUserData();
    this.removeCookie();
  };

  public setCookie() {
    let date = this.userData.expirationDate;
    let dateString = date.toUTCString();
    document.cookie = "auth_data ="+ this.userData+"; expires=" + dateString + "; path=/";
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

