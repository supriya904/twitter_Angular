import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent {
  // Dummy trending topics
  trendingTopics = [
    { category: 'Trending in India', tag: '#VaaniKapoor', posts: '10.2K posts' },
    { category: 'Trending', tag: '#TamannaahBhatia', posts: '1.25K posts' },
    { category: 'Bollywood', tag: 'Rihaab Pant', posts: '3,451 posts' },
    { category: 'Trending in India', tag: 'Anant Ambani', posts: '14.7K posts' },
    { category: 'Entertainment', tag: '#KhloeInWonderLand', posts: '5.3K posts' }
  ];

  // Suggested accounts to follow
  suggestedAccounts = [
    { name: 'Narendra Modi', handle: '@narendramodi', verified: true },
    { name: 'Virat Kohli', handle: '@imVkohli', verified: true },
    { name: 'Priyanka Chopra', handle: '@priyankachopra', verified: true }
  ];
}
