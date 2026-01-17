import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiFunctions<Type> {


  constructor(@Inject(String) protected Base_url: string, protected http: HttpClient) { }

  //----------------------------------------------------------------------------------

  // get data
  get(): Observable<Type> {
    return this.http.get<Type>(this.Base_url);
  }

  //----------------------------------------------------------------------------------

  // add data
  post(objForm: Type): Observable<Type> {
    return this.http.post<Type>(this.Base_url, objForm);
  }

  //----------------------------------------------------------------------------------

  // get data by id
  getById(id: any): Observable<Type> {
    return this.http.get<Type>(this.Base_url + `/${id}`);
  }

  //----------------------------------------------------------------------------------

  // delete data by id
  delete(id: any): Observable<Type> {
    return this.http.delete<Type>(this.Base_url + `/${id}`);
  }

  //----------------------------------------------------------------------------------

  // update data by id
  put(objForm: Type, id: any): Observable<Type> {
    return this.http.put<Type>(this.Base_url + `/${id}`, objForm);
  }

  //----------------------------------------------------------------------------------

  // update data by id
  putWithoutId(objForm: Type): Observable<Type> {
    return this.http.put<Type>(this.Base_url, objForm);
  }

  //----------------------------------------------------------------------------------

  auth(){
    if(!localStorage.getItem("admin")){
      location.replace("http://localhost:4200/admins/login");
    }
  }

}
