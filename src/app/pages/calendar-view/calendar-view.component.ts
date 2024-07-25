import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { EventService } from '../../Services/Event/event.service';
import { CalendarEvent as MyCalendarEvent } from '../../Models/reponses/Models/Event';
import { addDays, startOfDay, endOfDay } from 'date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports:[
    MatProgressSpinnerModule,
    CalendarModule,
    MatCommonModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss']
})
export class CalendarViewComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  isLoading = false;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getEvents().subscribe(
      (response: any) => {
        this.events = response.data.map((event: MyCalendarEvent) => {
          return {
            start: startOfDay(new Date(event.fromDate)),
            end: endOfDay(new Date(event.toDate)),
            title: event.name,
            meta: {
              id: event.id,
              details: event.details
            }
          };
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    );
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    console.log('Event clicked', event);
  }
}
