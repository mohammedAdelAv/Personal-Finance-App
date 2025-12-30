import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiFunctions } from './api-functions';
import { balance } from '../core/models/balance';


@Injectable({
  providedIn: 'root'
})

export class balanceService extends ApiFunctions<balance> {

  constructor(protected override http: HttpClient) {
    super('http://localhost:3000/balance', http);
  }

}
