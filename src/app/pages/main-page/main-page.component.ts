import { Component } from '@angular/core';
import { MyCalendarComponent } from '../../Components/my-calendar/my-calendar.component';
import { MyEventsComponent } from '../../Components/my-events/my-events.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MyCalendarComponent,
    MyEventsComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
