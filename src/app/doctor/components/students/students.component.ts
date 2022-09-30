import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  displayedColumns :any ;
  dataSource :any ;
  datatable:any
  constructor() {
    this.displayedColumns =["position", "name" ,"subjectName" , "degree"];
    
   }

  ngOnInit(): void {
  }

}
