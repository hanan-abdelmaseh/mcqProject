import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.css']
})
export class NewExamComponent implements OnInit {
  name = new FormControl();
  questions: any[] = [];
  questionForm!: FormGroup;
  correctId: any;
  startAdd: boolean = false;
  preview:boolean = false;
  SubjectName:string ="";
  stepperIndex =0 ;
  //to get id of current question
  id:any;
  constructor(private fb: FormBuilder, private toaster: ToastrService , private _docotrService:DoctorService) { }

  ngOnInit(): void {
    this.createForm();
  }
  //at first we create form we use reactive forms 
  createForm() {
    this.questionForm = this.fb.group({
      question: ["", Validators.required],
      answer1: ["", Validators.required],
      answer2: ["", Validators.required],
      answer3: ["", Validators.required],
      answer4: ["", Validators.required],
    })

  }
  //on button save we create question  and add it to question array 
  createQuestion() {
    if (this.correctId) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctId]
      }
      this.questions.push(model);
      this.questionForm.reset();
      console.log(this.questions)
    }
    else {
      this.toaster.error("you have to add correct answer")
    }
  }
  // here we try t get correct answer
  getCorrectAnswer(event: any) {
    this.correctId = event.value;
    console.log(this.correctId);
  }
  //handle start button
  start() {
    if (this.name.value == "") {
      this.toaster.error("you have to add subject name ")
    }
    else {
      this.startAdd = true;
   
      this.SubjectName = this.name.value;
    }
    if(this.startAdd){
      this.stepperIndex =1 ;
    }
  }
 
  // to cancel
  cancel() { 
   this.questionForm.reset();
   this.questions =[];
   this.SubjectName ="" ;
   this.stepperIndex =0    
  }
  //to clear form
  deleteQuestion() {
    this.questionForm.reset();
   }
 //to submit form or finish it 
 submit() {
  //model will be sent to db
  const model={
    name:this.SubjectName ,
    questions : this.questions
  }
   if(this.preview){
    this.stepperIndex =2 
   }
   else{
    this._docotrService.createSubject(model).subscribe((res:any)=>{
      this.preview = true ;
      this.id = res.id ;
});
   }

  }
  delete(index:any){
    //we remove question from view then we create another model with new data 
this.questions.splice(index , 1);
const model={
  name:this.SubjectName ,
  questions : this.questions
}
// update service with new data 
this._docotrService.updateSubject(this.id, model).subscribe((res)=>{
  this.toaster.success("question has been deleted");
});
  }
}
