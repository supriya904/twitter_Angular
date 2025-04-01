import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-feed.component.html',
  styleUrls: ['./home-feed.component.css']
})
export class HomeFeedComponent {
  // Dummy tweets for the home feed
  tweets = [
    {
      id: 1,
      user: {
        name: 'Elon Musk',
        handle: '@elonmusk',
        avatar: 'assets/avatars/elon.jpg',
        verified: true
      },
      content: 'Exciting times at X! We\'re making great progress on the AI front.',
      timestamp: '2h',
      stats: {
        replies: 1024,
        retweets: 5123,
        likes: 32567,
        views: '4.2M'
      }
    },
    {
      id: 2,
      user: {
        name: 'Bill Gates',
        handle: '@BillGates',
        avatar: 'assets/avatars/bill.jpg',
        verified: true
      },
      content: 'Climate change remains one of our biggest challenges. We need to accelerate innovation in clean energy.',
      timestamp: '5h',
      stats: {
        replies: 842,
        retweets: 3210,
        likes: 18945,
        views: '2.8M'
      }
    },
    {
      id: 3,
      user: {
        name: 'Sundar Pichai',
        handle: '@sundarpichai',
        avatar: 'assets/avatars/sundar.jpg',
        verified: true
      },
      content: 'Excited to announce our latest AI advancements at Google I/O next month!',
      timestamp: '8h',
      stats: {
        replies: 567,
        retweets: 2134,
        likes: 15678,
        views: '1.9M'
      }
    }
  ];
}
