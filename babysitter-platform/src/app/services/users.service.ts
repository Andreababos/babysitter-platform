import { Injectable, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Injectable()
export class UsersService {


  constructor(private http:HttpClient){
  }

  private baseUrl = 'http://angular2api2.azurewebsites.net/api/internships/'

  public getSitters(){
    return this.http.get(this.baseUrl);
  }

  public addSitter(sitter:any){
    sitter.filter = 'andrea';
    return this.http.post(this.baseUrl, sitter, {responseType: 'text'});
  }

  public updateSitter(sitter){
    return this.http.put(this.baseUrl + sitter._id, sitter, {responseType: 'text'});
  }

  public deleteSitter(sitterId: string){
    return this.http.delete(this.baseUrl + sitterId);
  }
}
