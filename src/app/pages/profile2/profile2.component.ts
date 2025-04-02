import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { TweetService, Tweet } from '../../services/tweet.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile2.component.html',
  styleUrls: ['./profile2.component.css']
})
export class Profile2Component implements OnInit, OnDestroy {
  user: User | null = null;
  userTweets: Tweet[] = [];
  activeTab: string = 'posts';
  isLoading: boolean = true;
  joinedDate: string = '';
  private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private tweetService: TweetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get current user
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.user = user;
      if (user) {
        this.loadUserTweets();
        this.formatJoinedDate();
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
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
    // In a real app, you would load different content based on the active tab
    // For now, we'll just switch tabs without changing content
  }

  formatTweetTime(timestamp: string): string {
    return this.tweetService.formatTweetTime(timestamp);
  }

  likeTweet(tweetId: string): void {
    this.tweetService.likeTweet(tweetId).subscribe();
  }

  editProfile(): void {
    // Will implement profile editing in a future update
    console.log('Edit profile clicked');
    // In a real app, you would open a modal or navigate to an edit profile page
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  composeTweet(): void {
    // Will implement tweet composition in a future update
    console.log('Compose tweet clicked');
    // In a real app, you would open the tweet dialog
  }

  getUserHandle(): string {
    return this.authService.getUserHandle(this.user);
  }

  getUserInitial(): string {
    return this.authService.getUserInitial(this.user);
  }
}
