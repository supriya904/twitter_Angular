import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { TweetDialogComponent } from './components/tweet-dialog/tweet-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent, DashboardComponent, TweetDialogComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'twitter_Angular';
  isLoggedIn = false;
  showTweetDialog = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the authentication state
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });

    // Listen for tweet dialog open requests
    window.addEventListener('openTweetDialog', () => {
      this.openTweetDialog();
    });
  }

  openTweetDialog() {
    this.showTweetDialog = true;
  }

  closeTweetDialog() {
    this.showTweetDialog = false;
  }
}
