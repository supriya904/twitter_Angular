import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  user = {
    name: 'Vodnala Supriya',
    handle: '@supri_vodnala'
  };
  
  navItems = [
    { icon: 'home', label: 'Home', route: '/dashboard' },
    { icon: 'search', label: 'Explore', route: '/explore' },
    { icon: 'notifications', label: 'Notifications', route: '/notifications' },
    { icon: 'mail', label: 'Messages', route: '/messages' },
    { icon: 'bookmark', label: 'Bookmarks', route: '/bookmarks' },
    { icon: 'list_alt', label: 'Lists', route: '/lists' },
    { icon: 'person', label: 'Profile', route: '/profile' },
    { icon: 'more_horiz', label: 'More', route: '/more' }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
