import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.ngRedux.select(res => res.users).subscribe((data) => {
      console.log(data)
      if(data.userData.isAuthenticated){
        this.userId = data.userData.userId
        this.getUser();
      } else {
        this.router.navigate(['/login'])
      }
    })

  }

  public getUser() {
    this.usersService.getUsers().subscribe( (data: any) => {
      this.user = data.filter(user => user._id === this.userId)[0];
      console.log('getuser', this.user)
      this.initForm();
  });
  }

  public initForm(){
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.updateForm = this.fb.group({
      firstName:[this.user.firstName, Validators.required],
      // lastName:[this.user.lastName, Validators.required],
      // email :[this.user.email, [Validators.required, Validators.pattern(emailRegex)]],
      // birthDate: [this.user.birthDate, Validators.required],
      // gender: [this.user.gender, Validators.required],
      // bio: [this.user.bio],
      // education: [this.user.educaton],
      // picture: [this.user.picture],
      // location: [this.user.location],
      // phone: [this.user.phone],
      // schedule: [this.user.schedule]
    });
  }

  public onSubmitUpdate(){

  }
}
