import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginActions } from '../redux/login/login.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public lookingFor:string;
  public isLoggedIn: boolean;
  
  constructor(
    private loginActions: LoginActions,
    private ngRedux: NgRedux<IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.userData).subscribe((data) => {
      this.isLoggedIn = data.isAuthenticated;
      if(data.role == 'parent'){
        this.lookingFor = 'sitter';
      } else if(data.role == 'sitter'){
        this.lookingFor = 'job';
      }
    })
  }

  public logout(){
    this.loginActions.logout();
    this.router.navigate(['login']);
  }

}
