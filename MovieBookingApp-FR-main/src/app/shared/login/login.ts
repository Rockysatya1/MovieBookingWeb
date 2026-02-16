import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder,private loginService: LoginService,
    private router: Router) {
    this.loginForm = this.fb.group({
      loginId: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  ngOnInit() {

    console.log('Login component initialized');
    
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Prepare the data to match LoginRequest model
      const loginData = {
        loginid: this.loginForm.value.loginId,
        password: this.loginForm.value.password
      };

      this.loginService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login Successful', response);
          
          // 1. Store the token (assuming the response has a 'token' property)
          if (response.result.data.token) {
            localStorage.setItem('token', response.result.data.token);
            //localStorage.setItem('userName', response.result.data.firstName + ' ' + response.result.data.lastName);
            localStorage.setItem('userId', String(response.result.data.userId));
            localStorage.setItem('userRole', String(response.result.data.userType==1?'Admin':'Customer'));
            localStorage.setItem('userName', String(response.result.data.loginID));
            this.loginService.setLoginStatus(true); // Update the signal
            this.loginService.userName.set(response.result.data.loginID);
            this.loginService.userRole.set(response.result.data.userType==1?'Admin':'Customer');
          }

          // 2. Redirect to the movies page
          this.router.navigate(['/']);
          
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Login Failed', err);
          this.isSubmitting = false;
          
          // 3. Handle specific error messages from backend
          this.errorMessage = err.error?.message || 'Invalid Login ID or Password. Please try again.';
        }
      });
    }
  }

}
