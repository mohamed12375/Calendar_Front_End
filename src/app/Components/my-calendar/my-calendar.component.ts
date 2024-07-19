import { Component } from '@angular/core';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  templateUrl: './my-calendar.component.html',
  styleUrl: './my-calendar.component.scss'
})
export class MyCalendarComponent {
  selectedDay: TuiDay | null = null;
  events: { [key: string]: string[] } = {};

  onDayClick(day: TuiDay) {
    this.selectedDay = day;
    // logic to handle day click, possibly open a dialog to add event
  }

  addEvent(date: TuiDay, event: string) {
    const key = date.toString();
    if (!this.events[key]) {
      this.events[key] = [];
    }
    this.events[key].push(event);
  }
}
