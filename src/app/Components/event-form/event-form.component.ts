import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { handleError } from '../../Helpers/error-handler';
import { CommonModule } from '@angular/common';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [
    FormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule, // Add CommonModule here
  ],  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent {
  event = {
    name: '',
    details: '',
    fromDate: '',
    toDate: ''
  };
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.http.post('http://localhost:8880/api/events/create', this.event).subscribe(
      response => {
        console.log('Event created successfully', response);
        this.isLoading = false;
        // Navigate to another page or show a success message
        this.router.navigate(['/events']);
      },
      error => {
        console.error('Event creation failed', error);
        this.errorMessage = handleError(error);
        this.isLoading = false;
      }
    );
  }
}
