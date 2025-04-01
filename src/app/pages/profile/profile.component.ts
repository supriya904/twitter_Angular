import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    name: 'Vodnala Supriya',
    handle: 'SupriyaVod49428',
    postCount: 3,
    joinedDate: 'February 2025',
    following: 2,
    followers: 0,
    verified: false
  };

  tweets = [
    {
      id: 1,
      content: 'Hi Everyone this is supriya .',
      time: '43s',
      likes: 1
    },
    {
      id: 2,
      content: 'Working on my Twitter clone with Angular!',
      time: 'Mar 19',
      likes: 5
    },
    {
      id: 3,
      content: 'Just started learning Angular. Excited to build my first project!',
      time: 'Mar 15',
      likes: 8
    }
  ];

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
