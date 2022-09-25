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
  id: any;
  userInfo: any;
  studentInfo: any;
  studentSubjects: any = [];
  mainSubject: any = [];
  total: number = 0;
  validExam: boolean = true;
  show: boolean = false;
  constructor(private route: ActivatedRoute,
    private _doctorService: DoctorService,
    private toaster: ToastrService,
    private _authService: AuthService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getSubject();
    console.log(this.id);
    this.getUserInfo();
  }
  getSubject() {
    this._doctorService.getSubject(this.id).subscribe((res: any) => {
      this.mainSubject = res;
    })
  }
  getUserInfo() {
    this._authService.getCurentuser().subscribe((res: any) => {
      this.userInfo = res;
      this.getUserData();
    });
  }
  getUserData() {
    this._authService.getStudent(this.userInfo.userId).subscribe((res: any) => {
      this.studentInfo = res
      console.log(this.studentInfo);
      this.studentSubjects = res?.subjects ? res?.subjects : [];
      this.checkValid();
    })
  }
  //checck if the exam is valid to take 
  checkValid() {
    for (let x in this.studentSubjects) {
      if (this.studentSubjects[x].id == this.id) {
        this.total = this.studentSubjects[x].degree
        this.validExam = false;
      }
    }
    console.log(this.validExam);
  }
  delete(index: number) {
    //we remove question from view then we create another model with new data 
    this.mainSubject.questions.splice(index, 1);
    const model = {
      name: this.mainSubject.name,
      questions: this.mainSubject.questions
    }
    // update service with new data 
    this._doctorService.updateSubject(this.id, model).subscribe((res) => {
      this.toaster.success("question has been deleted");
    });
  }
  //to get correct answer from radio buttons 
  getCorrectAnswer(event: any) {
    let value = event.value;
    let questionIndex = event.source.name;
    this.mainSubject.questions[questionIndex].studentAnswer = value;
    console.log(questionIndex);
    console.log(this.mainSubject.questions);
  }
  getResult() {
    this.total = 0;
    for (let i in this.mainSubject.questions) {
      if (this.mainSubject.questions[i].correctAnswer == this.mainSubject.questions[i].studentAnswer) {
        this.total++;
      }
    }
    this.show = true;
    this.studentSubjects.push({
      name: this.mainSubject.name,
      id: this.id,
      degree: this.total
    })
    const model = {
      username: this.studentInfo.username,
      email: this.studentInfo.email,
      password: this.studentInfo.password,
      subjects: this.studentSubjects

    }
    this._authService.updateStudent(this.userInfo.userId, model).subscribe((res: any) => {

    })

  }
}
