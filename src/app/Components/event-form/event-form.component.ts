import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { handleError } from '../../Helpers/error-handler';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputPasswordModule, TuiInputDateTimeModule } from '@taiga-ui/kit';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

interface TuiDay {
  year: number;
  month: number;
  day: number;
}

interface TuiTime {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    FormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,
    TuiInputDateTimeModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  event = {
    name: '',
    details: '',
    fromDate: '',
    toDate: ''
  };
  fromDate = ''
  toDate = ''
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  isValidTuiDay(day: TuiDay): boolean {
    return day && !isNaN(day.year) && !isNaN(day.month) && !isNaN(day.day);
  }

  isValidTuiTime(time: TuiTime): boolean {
    return time && !isNaN(time.hours) && !isNaN(time.minutes) && !isNaN(time.seconds) && !isNaN(time.ms);
  }

  convertToISO(day: TuiDay, time: TuiTime): string | null {
    if (!this.isValidTuiDay(day) || !this.isValidTuiTime(time)) {
      return null;
    }
    const date = new Date(day.year, day.month - 1, day.day, time.hours, time.minutes, time.seconds, time.ms);
    return date.toISOString();
  }

  onSubmit() {
    const fromDateArray = this.parseTuiDateTime(this.fromDate);
    const toDateArray = this.parseTuiDateTime(this.toDate);

    if (!fromDateArray || !toDateArray) {
      this.errorMessage = 'Please enter valid dates.';
      return;
    }

    const fromDateISO = this.convertToISO(fromDateArray[0], fromDateArray[1]);
    const toDateISO = this.convertToISO(toDateArray[0], toDateArray[1]);

    if (!fromDateISO || !toDateISO) {
      this.errorMessage = 'Please enter valid dates.';
      return;
    }

    this.isLoading = true;
    this.event.fromDate = fromDateISO;
    this.event.toDate = toDateISO;

    this.http.post('http://localhost:8880/api/events/create', this.event).subscribe(
      response => {
        console.log('Event created successfully', response);
        this.isLoading = false;
        this.router.navigate(['/events-list']);
      },
      error => {
        console.error('Event creation failed', error);
        this.errorMessage = handleError(error);
        this.isLoading = false;
      }
    );
  }

  parseTuiDateTime(dateTimeArray: any): [TuiDay, TuiTime] | null {
    if (dateTimeArray.length !== 2) {
      return null;
    }

    const day = dateTimeArray[0];
    const time = dateTimeArray[1];

    if (this.isValidTuiDay(day) && this.isValidTuiTime(time)) {
      return [day, time];
    }

    return null;
  }
  navigateBack() {
    this.router.navigate(['/events-list']);
  }
}
