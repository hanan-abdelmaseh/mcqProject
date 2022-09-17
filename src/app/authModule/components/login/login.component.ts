import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  users:any[] =[] ;
  type:string ='students';
  constructor(private fb:FormBuilder , private _authService:AuthService ,
              private _router:Router , private _toastr:ToastrService) { }

              ngOnInit(): void {
                this.createForm();
                this.getAllUsers();
              }
              //to create the form 
              createForm(){
                this.loginForm = this.fb.group({
                  type :[this.type],
                  email:   ["",[Validators.required , Validators.email]],
                  password:["", [Validators.required ]],
                  
                });
              }
              //get all students
              getAllUsers(){
                this._authService.getUsers(this.type).subscribe((res:any)=>{
                  this.users = res ;
                })
              }
              //to get role 
              getRole(event:any){
                this.type= event.value;
                this.getAllUsers();
              }
              //submit form
              submit(){
                
              let index = this.users.findIndex(item=>item.email == this.loginForm.value.email && item.password == this.loginForm.value.password);
              if(index == -1){
                this._toastr.error("email or password not exist try again" ,"" ,{
                
                  disableTimeOut:false ,
                  titleClass: "toastr_title" ,
                  messageClass:"toastr_message",
                  timeOut:5000,
                  closeButton:true
                })
                             }
              else{
                const model= {
                  username : this.users[index].username ,
                  role:this.type
                }
                this._authService.login(model).subscribe((res)=>{
                  this._authService.user.next(res);
                  this._toastr.success("logged in" ,"" ,{
                    disableTimeOut:false ,
                    titleClass: "toastr_title" ,
                    messageClass:"tostr_message",
                    timeOut:5000,
                    closeButton:true
                  })
                  this._router.navigate(['/subjects']);
                 });
                  }
              }
}
