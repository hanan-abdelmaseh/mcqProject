import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MatrialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatrialModule,
    HttpClientModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
   

  ],
  exports:[
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule,
    MatrialModule,
    CommonModule,
    NavBarComponent  ]
})
export class SharedModule { }
