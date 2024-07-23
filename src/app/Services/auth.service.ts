import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8880/api/auth/log-in';
  private signupUrl = 'http://localhost:8880/api/auth/sign-up';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, password });
  }

  signup(email: string, password: string): Observable<any> {
    return this.http.post(this.signupUrl, { email, password });
  }
}
