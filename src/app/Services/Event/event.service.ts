import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../../Models/reponses/Models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8880/api/events';

  constructor(private http: HttpClient) {}

  getEvents(page: number, pageSize: number, searchTerm: string, isAscending: boolean): Observable<CalendarEvent[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('isAscending', isAscending.toString());

      console.log("dsfs")

    return this.http.get<CalendarEvent[]>(`${this.baseUrl}/events`, { params });
  }

  deleteEvent(eventId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${eventId}`);
  }

  createEvent(event: CalendarEvent): Observable<CalendarEvent> {
    return this.http.post<CalendarEvent>(`${this.baseUrl}`, event);
  }
}
