import { Injectable, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Injectable()
export class UsersService {


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
    user.filter = 'andrea';
    return this.http.post(this.baseUrl, user, {responseType: 'text'});
  }

  public updateUser(user){
    return this.http.put(this.baseUrl + user._id, user, {responseType: 'text'});
  }

  public deleteUser(userId: string){
    return this.http.delete(this.baseUrl + userId);
  }
}
