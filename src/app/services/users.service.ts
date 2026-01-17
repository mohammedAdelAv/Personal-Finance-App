import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../core/models/users';




@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private usersUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------

  // get data
  get(): Observable<Users> {
    return this.http.get<Users>(this.usersUrl);
  }

  //----------------------------------------------------------------------------------

  // add data
  post(objForm: Users): Observable<Users> {
    return this.http.post<Users>(this.usersUrl, objForm);
  }

  //----------------------------------------------------------------------------------

  // get data by id
  getById(id: any): Observable<Users> {
    return this.http.get<Users>(this.usersUrl + `/${id}`);
  }

  //----------------------------------------------------------------------------------

  // get data by id
  delete(id: any): Observable<Users> {
    return this.http.delete<Users>(this.usersUrl + `/${id}`);
  }

  //----------------------------------------------------------------------------------

  // update data by id
  put(objForm: Users, id: any): Observable<Users> {
    return this.http.put<Users>(this.usersUrl + `/${id}`, objForm);
  }

  //----------------------------------------------------------------------------------

  auth() {
    if (!localStorage.getItem('admin')) {
      location.replace("http://localhost:4200/admins/login");
    }
  }
}
