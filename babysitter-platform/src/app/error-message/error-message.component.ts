import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  public errorMessage: any;


  constructor(
    private ngRedux: NgRedux<IAppState>,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.ngRedux.select(response =>response.users).subscribe( (data) =>{
      this.errorMessage = data.errorMessage
    })
  }

}
