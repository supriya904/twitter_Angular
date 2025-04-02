import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {
  // This component is currently a static UI mockup
  // In a real implementation, you would inject services to fetch actual notifications
  // and implement functionality for the tabs and settings
}
