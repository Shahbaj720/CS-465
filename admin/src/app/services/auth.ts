import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: {name: string, email: string, password: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/register`, user);
  }

  login(credentials: {email: string, password: string}): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('travlr-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  logout(): void {
    localStorage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
