import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../core/models/users';
import { ApiFunctions } from './api-functions';




@Injectable({
  providedIn: 'root'
})

export class UserService extends ApiFunctions<Users> {

  constructor(protected override http: HttpClient) {
    super('http://localhost:3001/users', http);
  }

}
