import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { Sitter } from '../entities/user';
import { UsersActions } from '../redux/users/users.actions';

@Component({
  selector: 'app-find-service',
  templateUrl: './find-service.component.html',
  styleUrls: ['./find-service.component.scss']
})
export class FindServiceComponent implements OnInit {

  public lookingFor: string;
  public sitters: Sitter[];

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.users).subscribe((data) => {
      this.sitters = data.users.filter(user => user.role === 'sitter');
    })
    this.ngRedux.select(res => res.userData).subscribe((data) => {
      if(data.role == 'parent'){
        this.lookingFor = 'sitter';
        this.getSitters();
      } else if(data.role == 'sitter'){
        this.lookingFor = 'job';
        this.getBabies();
      }
    })
  }

  public getSitters(){
    this.usersActions.getUsers();
  }

  public getBabies(){
    console.log('get babies')
  }
}
