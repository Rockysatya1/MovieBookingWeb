import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RegisterService } from '../../core/services/register.service'; // Adjust path
import { Router } from '@angular/router'; // For navigation
import { RegisterRequest } from '../../shared/register/register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  regForm: FormGroup;

  statusMessage: string = '';
  statusType: 'success' | 'error' | 'none' = 'none';
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.regForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      loginId: ['', [Validators.required, Validators.minLength(4)]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(8), // This version allows special characters but still requires at least one letter and one number
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d\\W_]{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value
      ? { passwordMismatch: true } : null;
  }

  isInvalid(controlName: string) {
    const control = this.regForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit() {
    if (this.regForm.valid) {
      this.isSubmitting = true;
      this.statusMessage = 'Connecting to server...';
      this.statusType = 'none';

      // Map form values to the RegisterRequest model
      const userData: RegisterRequest = {
        FirstName: this.regForm.value.firstName,
        LastName: this.regForm.value.lastName,
        Email: this.regForm.value.emailId,
        UserName: this.regForm.value.loginId,
        ContactNumber: this.regForm.value.contactNo,
        Passwordhash: this.regForm.value.password
      };

      // Call the service
      this.registerService.registerCustomer(userData).subscribe({
        next: (response) => {
          this.statusType = 'success';
          this.statusMessage = 'Registration Successful! Redirecting to login...';
          this.regForm.reset();

          // Redirect to login after 2 seconds so they can read the message
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.statusType = 'error';

          // Extract error message from backend if available
          this.statusMessage = err.error?.message || 'Registration failed. Please check your details or try again later.';
          console.error('Registration Error:', err);
        },
        complete: () => {
          // Optional: final cleanup
        }
      });
    } else {
      // Mark all fields as touched to show validation errors if user clicks submit early
      this.regForm.markAllAsTouched();
    }
  }
}