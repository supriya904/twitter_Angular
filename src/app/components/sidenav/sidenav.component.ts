import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TweetDialogComponent } from '../tweet-dialog/tweet-dialog.component';

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
    { icon: 'fa-home', label: 'Home', route: '/dashboard/home' },
    { icon: 'fa-search', label: 'Explore', route: '/dashboard/explore' },
    { icon: 'fa-bell', label: 'Notifications', route: '/dashboard/notifications' },
    { icon: 'fa-envelope', label: 'Messages', route: '/dashboard/messages' },
    { icon: 'fa-bookmark', label: 'Bookmarks', route: '/dashboard/bookmarks' },
    { icon: 'fa-list-alt', label: 'Lists', route: '/dashboard/lists' },
    { icon: 'fa-user', label: 'Profile', route: '/dashboard/profile' },
    { icon: 'fa-ellipsis-h', label: 'More', route: '/dashboard/more' }
  ];

  showTweetDialog = false;

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  openTweetDialog(): void {
    this.showTweetDialog = true;
  }

  closeTweetDialog(): void {
    this.showTweetDialog = false;
  }
}
