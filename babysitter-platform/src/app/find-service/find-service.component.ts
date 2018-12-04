import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Service } from '../entities/service';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { Sitter } from '../entities/user';
import { UsersActions } from '../redux/users.actions';

@Component({
  selector: 'app-find-service',
  templateUrl: './find-service.component.html',
  styleUrls: ['./find-service.component.scss']
})
export class FindServiceComponent implements OnInit {

  public lookingFor: string;
  public sitters: Sitter[];

  constructor(
    private authService: AuthenticationService,
    private ngRedux: NgRedux<IAppState>,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.users).subscribe((data) => {
      this.sitters = data.users.filter(user => user.filter === 'andrea').filter(user => user.role === 'sitter');
    })
    if(this.authService.getUserData().role == 'parent'){
      this.lookingFor = 'sitter';
      this.getSitters();
    } else if (this.authService.getUserData().role == 'sitter'){
      this.lookingFor = 'job';
      this.getBabies();
    }
  }

  public getSitters(){
    this.usersActions.getUsers();
  }

  public getBabies(){
    console.log('get babies')
  }
}
