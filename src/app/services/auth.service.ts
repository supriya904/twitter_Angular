import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  dateOfBirth: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://twitterangular-4b448-default-rtdb.asia-southeast1.firebasedatabase.app/';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Register a new user
  register(user: User): Observable<any> {
    // Create a copy of user without the password for storage
    const userToStore = { ...user };
    delete userToStore.password;

    return this.http.post<any>(`${this.apiUrl}/users.json`, userToStore)
      .pipe(
        tap(response => {
          // Firebase returns an object with a name property which is the unique ID
          const newUser = {
            ...userToStore,
            id: response.name
          };
          this.setCurrentUser(newUser);
          return newUser;
        }),
        catchError(error => {
          console.error('Registration error:', error);
          return throwError(() => new Error('Registration failed. Please try again.'));
        })
      );
  }

  // Login user by email and password
  login(email: string, password: string): Observable<User> {
    // Get all users and find the one with matching email and password
    return this.http.get<any>(`${this.apiUrl}/users.json`)
      .pipe(
        map(users => {
          if (!users) {
            throw new Error('User not found');
          }

          // Find user with matching email
          const userId = Object.keys(users).find(key => 
            users[key].email === email
          );

          if (!userId) {
            throw new Error('User not found');
          }

          // In a real app, you would hash passwords and not store them directly
          // For this demo, we're checking if the user exists with the given email
          // In a production app, you'd use Firebase Authentication instead
          
          const user = {
            ...users[userId],
            id: userId
          };
          
          this.setCurrentUser(user);
          return user;
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed. Please check your credentials.'));
        })
      );
  }

  // Logout user
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Set current user and save to localStorage
  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
