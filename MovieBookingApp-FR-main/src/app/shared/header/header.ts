import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../core/services/login.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, 
    RouterLink, 
    RouterLinkActive, // <--- Crucial for the active styling
    RouterModule, 
    MatIconModule, 
    MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  public userFullName = signal<string | null>(null);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService : AuthService
  ) {
    // 2. Logic to update the name based on login status
    effect(() => {
      if (this.loginService.loginStatus()) {
        // In a real app, you'd get this from a ProfileService or JWT token
        // For now, we'll pull from localStorage or set a default
        const storedName = localStorage.getItem('userName') || 'Movie Fan';
        this.userFullName.set(storedName);
      } else {
        this.userFullName.set(null);
      }
    });
  }

  // 3. Getter for isLoggedIn (used in @if conditions)
  get isLoggedIn(): boolean {
   // console.log('Checking login status in header:', this.loginService.loginStatus());
    
    return !!this.loginService.loginStatus();
  }

  get isAdmin(): boolean {
    return this.loginService.userRole() === 'Admin';
  }

  // 4. The Action handler for the Sign In / Logout button
  handleAuthAction() {
    if (this.isLoggedIn) {
      // Logout logic
      this.authService.logout();
      this.loginService.loginStatus.set(false); // Update the signal
      this.router.navigate(['/login']);
    } else {
      // Navigate to login
      console.log('Navigating to login');
      
      this.router.navigate(['/login']);
    }
  }
}
