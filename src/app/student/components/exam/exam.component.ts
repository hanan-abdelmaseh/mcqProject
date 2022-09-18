import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/authModule/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
id:any ;
userInfo :any ;
mainSubject :any =[] ;
total :number = 0 ;
show:boolean = false ;
  constructor(private route :ActivatedRoute ,
     private _doctorService:DoctorService  , 
     private toaster:ToastrService ,
     private _authService :AuthService) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get("id");
    this.getSubject();
    console.log(this.id);
    this.getUserInfo();
  }
  getSubject(){
    this._doctorService.getSubject(this.id).subscribe((res:any)=>{
  this.mainSubject = res ;
    })
  }
  getUserInfo(){
    this._authService.getCurentuser().subscribe((res:any)=>{
       this.userInfo =res ;
    });  
  }
  delete(index:number){
    //we remove question from view then we create another model with new data 
this.mainSubject.questions.splice(index , 1);
const model={
  name:this.mainSubject.name ,
  questions : this.mainSubject.questions
}
// update service with new data 
this._doctorService.updateSubject(this.id, model).subscribe((res)=>{
  this.toaster.success("question has been deleted");
});
  }
  //to get correct answer from radio buttons 
  getCorrectAnswer(event:any){
   let value  = event.value;
   let questionIndex = event.source.name;
  this.mainSubject.questions[questionIndex].studentAnswer = value ;   
   console.log(questionIndex);
   console.log(this.mainSubject.questions);
  }
  getResult(){
    this.total =0 ;
    for(let i in this.mainSubject.questions)
    {
      if(this.mainSubject.questions[i].correctAnswer ==  this.mainSubject.questions[i].studentAnswer){
        this.total++ ;
      }
    }
    this.show = true;

  }
}
