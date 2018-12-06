import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { UsersActions } from '../redux/users/users.actions';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId: string;
  user: any;
  updateForm: FormGroup;

  constructor(
    private router: Router,
    private usersService: UsersService,
    private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    private usersActions: UsersActions
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.userData).subscribe((data) => {
        this.userId = data.userId
        this.getUser();
    })

  }

  public getUser() {
    this.usersService.getUsers().subscribe( (data: any) => {
      this.user = data.filter(user => user._id === this.userId)[0];
      this.initForm();
  });
  }

  public initForm(){
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.updateForm = this.fb.group({
      firstName:[this.user.firstName, Validators.required],
      lastName:[this.user.lastName, Validators.required],
      email :[this.user.email, [Validators.required, Validators.pattern(emailRegex)]],
      birthDate: [this.user.birthDate, Validators.required],
      gender: [this.user.gender, Validators.required],
      bio: [this.user.bio],
      education: [this.user.educaton],
      picture: [this.user.picture],
      location: [this.user.location],
      phone: [this.user.phone],
      schedule: [this.user.schedule],
      price: [this.user.price]
    });
  }

  public onSubmitUpdate(){
    if(this.updateForm.valid){
      let user = Object.assign(this.user, this.updateForm.value);
      this.usersActions.updateUser(user);
    }
  }

  public deleteMe(){
    this.usersActions.deleteUser(this.userId);
  }
}
