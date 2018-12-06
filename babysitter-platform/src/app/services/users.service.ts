import { Injectable, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Userdata } from '../entities/userdata';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../entities/user';
import { Booking } from '../entities/booking';


@Injectable()
export class UsersService {

  public userData: Userdata = new Userdata();


  constructor(private http:HttpClient){
  }

  private baseUrl = 'http://angular2api2.azurewebsites.net/api/internships/'

  public getUsers(){
    return this.http.get(this.baseUrl);
  }

  public getUser(userId: string){
    return this.http.get(this.baseUrl + userId);
  }

  public addUser(user:any){
    return this.http.post(this.baseUrl, user, {responseType: 'text'});
  }

  public updateUser(user){
    return this.http.put(this.baseUrl + user._id, user, {responseType: 'text'});
  }

  public deleteUser(userId: string){
    return this.http.delete(this.baseUrl + userId);
  }


  public authenticate(email, password){ 
    return this.http.get(this.baseUrl)
        .pipe(map((data: User[]) => {
            let users = data.filter(user => user.filter == "andrea");
            let today = new Date();
            let nextDay = new Date(today);
            nextDay.setDate(today.getDate()+1);
            users.forEach(user => {
                if(user.email == email && user.password == password){
                    this.userData['isAuthenticated'] = true;
                    this.userData['userId'] = user._id;
                    this.userData['expirationDate'] = nextDay;
                    this.userData['role'] = user.role;
                }
            })
            if(this.userData.isAuthenticated){
                return this.userData;
            } else{
                return Observable.throw('Incorrect email or password');
            }
        }));
    }

    public addBooking(booking:Booking){
        return this.http.post(this.baseUrl, booking, {responseType: 'text'});
    }

    public getBookings(){
        return this.http.get(this.baseUrl);
    }
}
