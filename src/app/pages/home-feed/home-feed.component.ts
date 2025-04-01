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
  tweets = [
    {
      id: 1,
      user: {
        name: 'Ahmed Khaleel',
        handle: '@ahmedkhaleel94',
        verified: true
      },
      content: 'visualize any codebase ',
      timestamp: 'Mar 28',
      stats: {
        replies: 297,
        retweets: '1.5K',
        likes: '14K',
        views: '1M'
      }
    },
    {
      id: 2,
      user: {
        name: 'Reown',
        handle: '@reown_',
        verified: true
      },
      content: 'AppKit is the full-stack toolkit to build onchain app UX ',
      timestamp: '2h',
      stats: {
        replies: 15,
        retweets: 42,
        likes: 189,
        views: '2.3K'
      }
    },
    {
      id: 3,
      user: {
        name: 'Elon Musk',
        handle: '@elonmusk',
        verified: true
      },
      content: 'Exciting times at X! We\'re making great progress!',
      timestamp: '4h',
      stats: {
        replies: 3420,
        retweets: '12.4K',
        likes: '89.2K',
        views: '5.7M'
      }
    },
    {
      id: 4,
      user: {
        name: 'Bill Gates',
        handle: '@BillGates',
        verified: true
      },
      content: 'Climate change remains one of our biggest challenges. We need to accelerate innovation in clean energy.',
      timestamp: '5h',
      stats: {
        replies: 1245,
        retweets: '8.7K',
        likes: '45.3K',
        views: '2.1M'
      }
    },
    {
      id: 5,
      user: {
        name: 'Sundar Pichai',
        handle: '@sundarpichai',
        verified: true
      },
      content: 'Excited to announce our latest AI advancements next month!',
      timestamp: '8h',
      stats: {
        replies: 876,
        retweets: '5.4K',
        likes: '32.1K',
        views: '1.8M'
      }
    }
  ];
}
