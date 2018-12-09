import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Sitter, Parent } from '../entities/user';
import { Baby } from '../entities/baby';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.scss']
})
export class SingleServiceComponent implements OnInit {

  id: string;
  sitter: Sitter;
  parent: Parent;
  baby: Baby;
  user: any;
  type: string = 'sitter';

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = (params['id']);
      this.loadUser();
    })
  }


  /* 
  TODO:
  Do this with redux
  */
  public loadUser(){
    this.usersService.getUsers().subscribe( (data: any) => {
        this.user = data.filter(user => user._id === this.id)[0]
  });
  }

}
