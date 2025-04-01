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
  trendingTopics = [
    { category: 'Trending in India', tag: '#VaaniKapoor', posts: '10.9K posts' },
    { category: 'Entertainment · Trending', tag: '#VaaniKapoor', posts: '10.2K posts' },
    { category: 'Trending', tag: '#TamannaahBhatia', posts: '1.25K posts' },
    { category: 'Bollywood · Trending', tag: 'Rihaab Pant', posts: '3,451 posts' },
    { category: 'Trending in India', tag: 'Anant Ambani', posts: '14.7K posts' },
    { category: 'Entertainment', tag: '#KhloeInWonderLand', posts: '5.3K posts' }
  ];
  
  suggestedAccounts = [
    { name: 'Elon Musk', handle: '@elonmusk', verified: true },
    { name: 'Bill Gates', handle: '@BillGates', verified: true },
    { name: 'Sundar Pichai', handle: '@sundarpichai', verified: true }
  ];
}
