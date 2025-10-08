import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private jsonUrl = './assets/db/data.json';

  constructor(private http: HttpClient) { }

  // ترجع Observable بالبيانات الكاملة
  getAll(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getBalance(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getPots(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl);
  }
}
