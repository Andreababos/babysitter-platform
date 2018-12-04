import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoggedIn: boolean = true;

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(){
    //this.isLoggedIn = this.authService.isAuthenticated();
  }
  
}
