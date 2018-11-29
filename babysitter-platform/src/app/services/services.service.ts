import { Injectable, Input } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';



@Injectable()
export class ServicesService {


  constructor(private http:HttpClient){
  }

  private baseUrl = 'http://angular2api2.azurewebsites.net/api/internships/'

  public getServices(){
    return this.http.get(this.baseUrl);
  }

  public addService(service:any){
    service.filter = 'andrea';
    service.type = 'service';
    return this.http.post(this.baseUrl, service, {responseType: 'text'});
  }

  public updateService(service){
    return this.http.put(this.baseUrl + service._id, service, {responseType: 'text'});
  }

  public deleteService(serviceId: string){
    return this.http.delete(this.baseUrl + serviceId);
  }
}
