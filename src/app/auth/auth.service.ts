import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) {}

  // تسجيل مستخدم جديد
  register(email: string, password: string): Observable<any> {
    const user = { email, password };
    return this.http.post(this.apiUrl, user);
  }

  // يمكنك إضافة وظائف إضافية مثل تسجيل الدخول هنا
}
