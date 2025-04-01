import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetService } from '../../services/tweet.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-tweet-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tweet-dialog.component.html',
  styleUrls: ['./tweet-dialog.component.css']
})
export class TweetDialogComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<void>();
  @ViewChild('tweetContent') tweetContentElement!: ElementRef;
  
  currentUser: User | null = null;
  tweetContent: string = '';
  isPosting: boolean = false;

  constructor(
    private tweetService: TweetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onContentChange(event: Event): void {
    const element = event.target as HTMLDivElement;
    this.tweetContent = element.textContent || '';
  }

  closeDialog(event: MouseEvent): void {
    // This will be called when clicking the overlay
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.closeEvent.emit();
  }

  postTweet(): void {
    if (!this.tweetContent.trim() || this.isPosting) {
      return;
    }

    this.isPosting = true;

    this.tweetService.createTweet(this.tweetContent).subscribe({
      next: () => {
        this.isPosting = false;
        this.close();
      },
      error: (error) => {
        console.error('Error posting tweet:', error);
        this.isPosting = false;
        // You could add error handling UI here
      }
    });
  }
}
