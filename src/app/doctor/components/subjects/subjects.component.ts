import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/authModule/services/auth.service';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
  subjects :any =[] ;
  userInfo:any={};
  constructor(private _doctorService:DoctorService ,private toaster:ToastrService ,private _authService:AuthService) { }

  ngOnInit(): void {
  this.getAllsubjects();
  this.getUserInfo();
  }
  getAllsubjects(){
    this._doctorService.getsubjects().subscribe((res)=>{
   this.subjects = res ;
   console.log(this.subjects);
    })
  }
  getUserInfo(){
    this._authService.getCurentuser().subscribe((res:any)=>{
       this.userInfo =res ;
    });  
  }
  delete(index:number){
    
    let id = this.subjects[index].id;
    this.subjects.splice(index ,1);
    this._doctorService.deleteSubject(id).subscribe((res :any)=>{
      this.toaster.success("subject has been deleted");
    });


  }

}
