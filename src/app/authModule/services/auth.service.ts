import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

user = new Subject();
  constructor(private _httpClient:HttpClient) { }
  createUser(model:any){
    return this._httpClient.post(`${environment.baseApi}students`,model);
  }
  getUsers(type:string){
    return this._httpClient.get(`${environment.baseApi}${type}`);
  }
  login(model:any){
    return this._httpClient.put(`${environment.baseApi}login/1`,model);

  }
  getCurentuser(){
    return this._httpClient.get(`${environment.baseApi}login/1`);
  }
}
