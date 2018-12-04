import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../redux/store';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public loading: boolean = false;

  constructor(
    private ngRedux: NgRedux<IAppState>,
  ) { }


  ngOnInit() {
    this.ngRedux.select(response =>response.users).subscribe( (data) =>{
      this.loading = data.loading;
    })
  }

}
