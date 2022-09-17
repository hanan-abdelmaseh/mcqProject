import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm!:FormGroup;
  students:any[] =[] ;
  constructor(private fb:FormBuilder , private _authService:AuthService ,
              private _router:Router , private _toastr:ToastrService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllStudents();
  }
  //to create the form 
  createForm(){
    this.userForm = this.fb.group({
      userName:["", [Validators.required]],
      email:   ["",[Validators.required , Validators.email]],
      password:["", [Validators.required ]],
      confirmPassword:["",[Validators.required]]
    });
  }
  //get all students
  getAllStudents(){
    this._authService.getUsers('students').subscribe((res:any)=>{
      this.students = res ;
    })
  }
  //submit form
  submit(){
    const model= {
      username : this.userForm.value.userName,
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
  let index = this.students.findIndex(item=>item.email == this.userForm.value.email);
  if(index !== -1){
    this._toastr.error("this eamil is already exists" ,"" ,{
    
      disableTimeOut:false ,
      titleClass: "toastr_title" ,
      messageClass:"toastr_message",
      timeOut:5000,
      closeButton:true
    })
                 }
  else{
    this._authService.createUser(model).subscribe((res)=>{
      this._toastr.success("Sucess" ,"" ,{
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
