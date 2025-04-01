import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

export interface Tweet {
  id?: string;
  userId: string;
  userHandle: string;
  userName: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
}

@Injectable({
  providedIn: 'root'
})
export class TweetService {
  private apiUrl = 'https://twitterangular-4b448-default-rtdb.asia-southeast1.firebasedatabase.app/';
  private tweetsSubject = new BehaviorSubject<Tweet[]>([]);
  public tweets$ = this.tweetsSubject.asObservable();
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Subscribe to the current user
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadTweets();
      }
    });
  }

  // Create a new tweet
  createTweet(content: string): Observable<any> {
    if (!this.currentUser) {
      throw new Error('User must be logged in to create a tweet');
    }

    const tweet: Tweet = {
      userId: this.currentUser.id || '',
      userHandle: this.currentUser.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 10000),
      userName: this.currentUser.name,
      content: content,
      timestamp: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      replies: 0,
      views: 0
    };

    return this.http.post<any>(`${this.apiUrl}/tweets.json`, tweet)
      .pipe(
        tap(response => {
          // Firebase returns an object with a name property which is the unique ID
          const newTweet = {
            ...tweet,
            id: response.name
          };
          
          // Update the tweets list
          const currentTweets = this.tweetsSubject.value;
          this.tweetsSubject.next([newTweet, ...currentTweets]);
          
          return newTweet;
        }),
        catchError(error => {
          console.error('Error creating tweet:', error);
          throw new Error('Failed to create tweet. Please try again.');
        })
      );
  }

  // Load all tweets
  loadTweets(): void {
    this.http.get<any>(`${this.apiUrl}/tweets.json`)
      .pipe(
        map(tweets => {
          if (!tweets) return [];
          
          return Object.keys(tweets).map(key => ({
            id: key,
            ...tweets[key]
          }));
        })
      )
      .subscribe({
        next: (tweets: Tweet[]) => {
          // Sort tweets by timestamp (newest first)
          tweets.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          this.tweetsSubject.next(tweets);
        },
        error: error => {
          console.error('Error loading tweets:', error);
        }
      });
  }

  // Get tweets by user ID
  getTweetsByUser(userId: string): Observable<Tweet[]> {
    return this.tweets$.pipe(
      map(tweets => tweets.filter(tweet => tweet.userId === userId))
    );
  }

  // Like a tweet
  likeTweet(tweetId: string): Observable<any> {
    // Get the current tweet
    const tweets = this.tweetsSubject.value;
    const tweetIndex = tweets.findIndex(t => t.id === tweetId);
    
    if (tweetIndex === -1) {
      throw new Error('Tweet not found');
    }
    
    const tweet = tweets[tweetIndex];
    const updatedTweet = { ...tweet, likes: tweet.likes + 1 };
    
    return this.http.patch<any>(`${this.apiUrl}/tweets/${tweetId}.json`, { likes: updatedTweet.likes })
      .pipe(
        tap(() => {
          // Update the tweets list
          const updatedTweets = [...tweets];
          updatedTweets[tweetIndex] = updatedTweet;
          this.tweetsSubject.next(updatedTweets);
        }),
        catchError(error => {
          console.error('Error liking tweet:', error);
          throw new Error('Failed to like tweet. Please try again.');
        })
      );
  }
}
