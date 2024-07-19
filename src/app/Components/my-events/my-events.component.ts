import { Component } from '@angular/core';

@Component({
  selector: 'app-my-events',
  standalone: true,
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.scss'
})
export class MyEventsComponent {
  events: { name: string, date: string }[] = [];

  addEvent() {
    // logic to add event, possibly open a dialog to enter event details
  }
}
