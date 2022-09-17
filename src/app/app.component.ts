import { Component, OnInit } from '@angular/core';
import { AuthService } from './authModule/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mcqProject';
  constructor(private _AuthService:AuthService){

  }
  ngOnInit(): void{
  this.getUserData();
  }

  getUserData(){
    this._AuthService.getCurentuser().subscribe((res)=>{
    this._AuthService.user.next(res);
    })
  }
}
