import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';
import { CalendarEvent } from '../../Models/reponses/Models/Event';
import { EventService } from '../../Services/Event/event.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'table-overview-example',
  standalone: true,
  styleUrls: ['event-list-ang.component.scss'],
  templateUrl: 'event-list-ang.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
})
export class EventListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'name', 'details', 'fromDate', 'toDate', 'actions'];
  dataSource: MatTableDataSource<CalendarEvent>;
  totalEvents = 0;
  currentPage = 1;
  pageSize = 20;
  nextPage: number | undefined = 0;
  isLoading = false;
  private filterSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;
  @ViewChild(MatSort) sort!: MatSort | null;
  @ViewChild(CdkScrollable) scrollable!: CdkScrollable;

  constructor(private eventService: EventService, private router: Router) {
    this.dataSource = new MatTableDataSource<CalendarEvent>([]);
  }

  ngOnInit() {
    this.fetchEvents(this.currentPage, this.pageSize, '', true);
    this.filterSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(filterValue => {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.currentPage = 1;
      this.fetchEvents(this.currentPage, this.pageSize, this.dataSource.filter, true);
    });
  }

  ngAfterViewInit() {
    this.scrollable.elementScrolled().subscribe(() => this.onScroll());
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchEvents(page: number, pageSize: number, searchTerm: string, isAscending: boolean) {
    if (this.isLoading) {
      return;
    }
    this.isLoading = true;

    this.eventService.getEvents(page, pageSize, searchTerm, isAscending).subscribe(
      (response: any) => {
            // Clear previous data if fetching the first page
        if (page === 1) {
          this.dataSource.data = [];
        }
        this.dataSource.data = this.dataSource.data.concat(response.data as CalendarEvent[]);
        this.totalEvents = response.pagination.total;
        this.nextPage = response.pagination.nextPage;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterSubject.next(filterValue);
  }

  onScroll() {
    const scrollElement = this.scrollable.getElementRef().nativeElement;
    const scrollTop = scrollElement.scrollTop;
    const scrollHeight = scrollElement.scrollHeight;
    const clientHeight = scrollElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!this.nextPage) return;
      this.currentPage++;
      this.fetchEvents(this.currentPage, this.pageSize, '', true);
    }
  }

  deleteEvent(eventId: number) {
    this.isLoading = true;
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(event => event.id !== eventId);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error deleting event:', error);
        this.isLoading = false;
      }
    );
  }

  navigateToCreateEvent() {
    this.router.navigate(['/create-event']); // Adjust the route as needed
  }
}
