import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  showSignupForm = false;
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days = Array.from({ length: 31 }, (_, i) => i + 1);
  years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      month: ['', Validators.required],
      day: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    if (!this.showSignupForm) {
      this.signupForm.reset();
      this.errorMessage = '';
    }
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      // Mark all fields as touched to trigger validation errors
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { name, email, month, day, year } = this.signupForm.value;
    const dateOfBirth = `${year}-${month}-${day}`;

    const user: User = {
      name,
      email,
      dateOfBirth,
      createdAt: new Date().toISOString()
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.isLoading = false;
        this.toggleSignupForm();
        // Navigate to dashboard or home page after successful registration
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  login() {
    // For demo purposes, we'll just use a simple login with email
    const email = prompt('Enter your email to login:');
    if (!email) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(email).subscribe({
      next: (user) => {
        console.log('User logged in successfully:', user);
        this.isLoading = false;
        // Navigate to dashboard or home page after successful login
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
}
