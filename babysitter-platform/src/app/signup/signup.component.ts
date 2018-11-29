import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { UsersActions } from '../redux/users.actions';
import { User } from '../entities/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private fb: FormBuilder,
    private usersActions: UsersActions,
  ) { }

  ngOnInit() {

    this.ngRedux.select(response =>response.users).subscribe( (data) =>{
      this.loading = data.loading
    })

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.registerForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email :['', [Validators.required, Validators.pattern(emailRegex)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required]
    });

  }


  public onSubmitRegister(){
    if(this.registerForm.valid){
      let user = this.registerForm.value as User;
      this.usersActions.createUser(user);
    }
  }

}
