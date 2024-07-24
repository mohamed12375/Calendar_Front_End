import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://localhost:8880/api/events';

  constructor(private http: HttpClient) {}

  getEvents(page: number, pageSize: number, searchTerm: string, isAscending: boolean): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('searchTerm', searchTerm)
      .set('isAscending', isAscending.toString());

    return this.http.get(`${this.baseUrl}/events`, { params });
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/events/${eventId}`);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events`, event);
  }
}
