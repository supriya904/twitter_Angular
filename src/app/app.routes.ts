import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./pages/home-feed/home-feed.component').then(m => m.HomeFeedComponent) },
      { path: 'explore', redirectTo: 'home' },
      { path: 'notifications', redirectTo: 'home' },
      { path: 'messages', redirectTo: 'home' },
      { path: 'profile', redirectTo: 'home' }
    ] 
  },
  { path: '**', redirectTo: '' }
];
