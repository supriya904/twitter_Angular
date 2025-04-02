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
  bio?: string;
  location?: string;
  website?: string;
  profileImageUrl?: string;
  bannerImageUrl?: string;
  following?: number;
  followers?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://angulartest-93e44-default-rtdb.asia-southeast1.firebasedatabase.app/';
  //private apiUrl = 'https://twitterangular-4b448-default-rtdb.asia-southeast1.firebasedatabase.app/';
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
    // Store the password separately for login verification
    const userPassword = user.password;
    
    // Create a copy of user without the password for storage
    const userToStore = { ...user };
    
    // In a real app, you would hash the password before storing
    // For this demo, we'll store it to enable login verification
    // In a production app, you'd use Firebase Authentication instead
    
    // Add default profile values
    userToStore.following = 0;
    userToStore.followers = 0;
    userToStore.bio = '';
    userToStore.location = '';
    userToStore.website = '';

    return this.http.post<any>(`${this.apiUrl}/users.json`, userToStore)
      .pipe(
        tap(response => {
          // Firebase returns an object with a name property which is the unique ID
          const newUser = {
            ...userToStore,
            id: response.name
          };
          // Remove password before storing in local state
          delete newUser.password;
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
            throw new Error('Invalid email or password');
          }

          const user = users[userId];
          
          // Check if the password matches
          if (user.password !== password) {
            throw new Error('Invalid email or password');
          }
          
          // Create user object without password for client-side storage
          const authenticatedUser = {
            ...user,
            id: userId
          };
          
          // Remove password before storing in local state
          delete authenticatedUser.password;
          
          this.setCurrentUser(authenticatedUser);
          return authenticatedUser;
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

  // Update user profile
  updateUserProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      return throwError(() => new Error('No authenticated user found'));
    }

    const userId = currentUser.id;
    const updatedUser = { ...currentUser, ...userData };
    
    // Remove sensitive data
    const userToUpdate = { ...updatedUser };
    delete userToUpdate.id;
    delete userToUpdate.password;

    return this.http.put<any>(`${this.apiUrl}/users/${userId}.json`, userToUpdate)
      .pipe(
        tap(() => {
          this.setCurrentUser(updatedUser);
        }),
        map(() => updatedUser),
        catchError(error => {
          console.error('Profile update error:', error);
          return throwError(() => new Error('Failed to update profile. Please try again.'));
        })
      );
  }

  // Generate a Twitter-like handle from the user's name
  getUserHandle(user: User | null): string {
    if (!user || !user.name) return '@user';
    return '@' + user.name.replace(/\s+/g, '').toLowerCase();
  }

  // Get user's initial for avatar
  getUserInitial(user: User | null): string {
    return user?.name?.charAt(0) || 'U';
  }

  // Set current user and save to localStorage
  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}
