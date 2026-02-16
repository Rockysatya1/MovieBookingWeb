import { Injectable, signal, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../shared/login/login.model'; 
//import { environment } from '../../../environments/environment.prod';
// import { EnvService } from './env.service';

@Injectable({ providedIn: 'root' })
export class LoginService implements OnInit {
  //private backendUrl = environment.apiUrl;
  private apiUrl = `https://localhost:44337/api/v1.0/moviebooking/Auth`;
  loginStatus = signal<boolean>(!!localStorage.getItem('token'));
  userName = signal<string | null>(localStorage.getItem('userName'));
  userRole = signal<string | null>(localStorage.getItem('userRole'));


  constructor(private http: HttpClient) { }
  // Call this during login
  setLoginStatus(status: boolean) {
    this.loginStatus.set(status);
  }
  

  ngOnInit() {
    //console.log(this.env.apiUrl);
  }

  /**
   * Sends login request to backend
   */
  login(data: LoginRequest): Observable<LoginResponse> {
    console.log(this.apiUrl);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  /**
   * Checks if user is logged in
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Logs out the user
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  /**
   * Gets the stored token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): number | null {
    return localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null;
  }
}