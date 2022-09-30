import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authModule/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns :any ;
  dataSource :any ;
  datatable:any
  constructor(private _AuthService:AuthService) {
    this.displayedColumns =["position", "name" ,"subjectName" , "degree"];
    
   }

  ngOnInit(): void {
    this.getAllStudents();
  }
  getAllStudents(){
    return this._AuthService.getUsers('students').subscribe((res:any)=>{
      this.dataSource = res?.map((student:any)=>{
        if(student?.subjects){
          return  student?.subjects.map((subject:any)=>{
            return {
              name : student.username ,
              subjectName:subject.name ,
              degree :subject.degree 
            }
           })
        }
        else{
          return [{
            name : student.username ,
            subjectName: " _" ,
            degree :"Not Finished Yet " 
          }]
        }
           
      });
      this.datatable =[] ;
      this.dataSource.forEach((element :any) => {
        element.forEach((subElement:any)=>{
         this.datatable.push({
               name : subElement.name ,
              subjectName:subElement.subjectName ,
              degree :subElement.degree 
         });

        })
        console.log(this.datatable)
        
      });

      console.log(this.dataSource);
    });
  }

}
