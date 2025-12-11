import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../core/models/users';




@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  //----------------------------------------------------------------------------------

  // get data
  get(): Observable<Users> {
    return this.http.get<Users>(this.usersUrl);
  }

  //----------------------------------------------------------------------------------

  post(objForm: Users): Observable<Users> {
    return this.http.post<Users>(this.usersUrl, objForm);
  }


}
