import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authModule/services/auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  CurrentUser: any = null
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.user.subscribe((res:any) => {
      if(res.role){
        this.CurrentUser = res;
        console.log(this.CurrentUser)
      }
     
    })
   

  }
  logOut(){
     const model ={}
     this._authService.login(model).subscribe((res)=>{
      this.CurrentUser = null
      this._authService.user.next(res);
     });
  }



}


