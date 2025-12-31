import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { map } from 'rxjs';

export interface Balance {
  id?: number;
  current?: number;
  income?: number;
  expenses?: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private jsonUrl = './assets/db/data.json';
  private apiUrl = 'http://localhost:3000';
  private tranApiUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  // ترجع Observable بالبيانات الكاملة
  getAll(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getPots(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any>(this.jsonUrl);
  }

  // Update specific transaction (for Paid button)
  updateTransaction(id: number, updatedData: any): Observable<any> {
    return this.http.patch(`${this.tranApiUrl}/${id}`, updatedData);
  }

  // إضافة pot جديد
  addPot(pot: any) {
    return this.http.post(`${this.apiUrl}/pots`, pot);
  }

  // delete pot
  deletePot(id: string) {
    return this.http.delete(`http://localhost:3000/pots/${id}`);
  }

  // update pot
  updatePot(id: string, updatedPot: any) {
    return this.http.patch(`http://localhost:3000/pots/${id}`, updatedPot);
  }

  // ---------------------------------------
  getBalance(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/balance/1`);
  }
  // تحديث الـ balance (نعتبر balance مورد واحد)
  updateBalance(updatedBalance: Partial<Balance>): Observable<any> {
    // لو عندك endpoint /balance (object) يمكن PATCH عليه:
    return this.http.patch<any>(`${this.apiUrl}/balance/1`, updatedBalance);
    // ملاحظة: مع json-server قد تحتاج PATCH على /balance/1 أو PUT حسب شكل الـ DB لديك.
  }

}
