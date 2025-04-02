import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TweetDialogComponent } from '../tweet-dialog/tweet-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, TweetDialogComponent],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  user = {
    name: 'Vodnala Supriya',
    handle: '@supri_vodnala'
  };
  
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

  showTweetDialog = false;
  showUserMenu = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openTweetDialog(): void {
    this.showTweetDialog = true;
  }

  closeTweetDialog(): void {
    this.showTweetDialog = false;
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
}
