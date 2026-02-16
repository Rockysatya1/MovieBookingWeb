import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest,RegisterResponse } from '../../shared/register/register.model';


// import { environment } from '../../../environments/environment.prod';

// export interface RegisterResponse {
//   msg: string;
//   userId: number;
//   otp: number;
// }

@Injectable({ providedIn: 'root' })
export class RegisterService {
//   private backendUrl = environment.apiUrl;
  private apiUrl = `https://localhost:44337/api/v1.0/moviebooking/Auth`;

  constructor(private http: HttpClient) {}

  registerCustomer(data: RegisterRequest): Observable<RegisterResponse> {
    // console.log('Backend URL:', this.apiUrl);
    // console.log('API URL:', this.apiUrl);
    
    
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, data); 
  }
}