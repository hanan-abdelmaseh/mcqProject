import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private _httpClient:HttpClient) { }
  createSubject(model :any){
    return this._httpClient.post(`${environment.baseApi}subjects`,model);
  }
  updateSubject(id:any , model :any){
    return this._httpClient.put(`${environment.baseApi}subjects/${id}`,model);
  }
  getsubjects(){
    return this._httpClient.get(`${environment.baseApi}subjects`);
  }
  deleteSubject(id:number){
    return this._httpClient.delete(`${environment.baseApi}subjects/${id}`)
  }
}
