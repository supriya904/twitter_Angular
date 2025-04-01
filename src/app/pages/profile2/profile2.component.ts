import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { TweetService, Tweet } from '../../services/tweet.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit {
  user: User | null = null;
  userTweets: Tweet[] = [];
  activeTab: string = 'posts';
  isLoading: boolean = true;
  joinedDate: string = '';

  constructor(
    private authService: AuthService,
    private tweetService: TweetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadUserTweets();
        this.formatJoinedDate();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  loadUserTweets(): void {
    this.isLoading = true;
    this.tweetService.getCurrentUserTweets().subscribe(tweets => {
      this.userTweets = tweets;
      this.isLoading = false;
    });
  }

  formatJoinedDate(): void {
    if (this.user && this.user.createdAt) {
      const date = new Date(this.user.createdAt);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      this.joinedDate = `${month} ${year}`;
    } else {
      this.joinedDate = 'February 2025'; // Default fallback
    }
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  formatTweetTime(timestamp: string): string {
    return this.tweetService.formatTweetTime(timestamp);
  }

  likeTweet(tweetId: string): void {
    this.tweetService.likeTweet(tweetId).subscribe();
  }

  editProfile(): void {
    // Will implement later
    console.log('Edit profile clicked');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
