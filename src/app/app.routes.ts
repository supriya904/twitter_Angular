import { Routes } from '@angular/router';

export const routes: Routes = [
  // Routes for content inside the dashboard
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home-feed/home-feed.component').then(m => m.HomeFeedComponent) },
  { path: 'profile', loadComponent: () => import('./pages/profile2/profile2.component').then(m => m.Profile2Component) },
  { path: 'explore', loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent) },
  { path: 'notifications', loadComponent: () => import('./pages/notifications/notifications.component').then(m => m.NotificationsComponent) },
  { path: 'messages', redirectTo: 'home' },
  // Wildcard route
  { path: '**', redirectTo: 'home' }
];
