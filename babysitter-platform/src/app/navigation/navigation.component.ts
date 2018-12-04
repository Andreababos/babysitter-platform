import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public lookingFor:string;
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.authService.getUserData().role == 'parent'){
      this.lookingFor = 'sitter';
    } else if (this.authService.getUserData().role == 'sitter'){
      this.lookingFor = 'job';
    }
  }

  public logout(){
    this.authService.removeAuthentication();
    this.router.navigate(['login']);
  }

}
