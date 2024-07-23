import { Component } from '@angular/core';
import { MyCalendarComponent } from '../../Components/my-calendar/my-calendar.component';
import { EventFormComponent } from '../../Components/event-form/event-form.component';
import { TuiInputDateTimeExample5 } from '../../Components/date-picker/date-picker.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    TuiInputDateTimeExample5,
    MyCalendarComponent,
    EventFormComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {

}
