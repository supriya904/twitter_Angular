import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {
  user: User | null = null;
  userHandle: string = '';
  
  navItems = [
    { icon: 'fa-home', label: 'Home', route: '/home' },
    { icon: 'fa-search', label: 'Explore', route: '/explore' },
    { icon: 'fa-bell', label: 'Notifications', route: '/notifications' },
    { icon: 'fa-envelope', label: 'Messages', route: '/messages' },
    { icon: 'fa-bookmark', label: 'Bookmarks', route: '/bookmarks' },
    { icon: 'fa-list-alt', label: 'Lists', route: '/lists' },
    { icon: 'fa-user', label: 'Profile', route: '/profile' },
    { icon: 'fa-ellipsis-h', label: 'More', route: '/more' }
  ];

  showUserMenu = false;
  private userSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.userHandle = this.authService.getUserHandle(user);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openTweetDialog(): void {
    // Dispatch a custom event to notify the app component to open the tweet dialog
    window.dispatchEvent(new CustomEvent('openTweetDialog'));
  }
  
  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }
  
  logout(): void {
    this.authService.logout();
    // The app component will automatically show the landing page
    // since it's subscribed to the auth state changes
    this.showUserMenu = false;
  }

  // Helper method to get first letter of name for avatar
  getInitial(): string {
    return this.authService.getUserInitial(this.user);
  }
}
