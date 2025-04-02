import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  showSignupForm = false;
  showLoginForm = false;
  signupForm: FormGroup;
  loginForm: FormGroup;
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
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      month: ['', Validators.required],
      day: ['', Validators.required],
      year: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    this.showLoginForm = false;
    if (!this.showSignupForm) {
      this.signupForm.reset();
      this.errorMessage = '';
    }
  }

  toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showSignupForm = false;
    if (!this.showLoginForm) {
      this.loginForm.reset();
      this.errorMessage = '';
    }
  }

  onSubmitSignup() {
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

    const { name, email, password, month, day, year } = this.signupForm.value;
    const dateOfBirth = `${year}-${month}-${day}`;

    const user: User = {
      name,
      email,
      password,
      dateOfBirth,
      createdAt: new Date().toISOString()
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.isLoading = false;
        this.toggleSignupForm();
        // Navigate to dashboard after successful registration
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = error.message || 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (user) => {
        console.log('User logged in successfully:', user);
        this.isLoading = false;
        // Navigate to dashboard after successful login
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message || 'Login failed. Please check your credentials.';
        this.isLoading = false;
      }
    });
  }
}
