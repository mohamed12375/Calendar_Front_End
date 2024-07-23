import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ServerError } from '../../Models/reponses/ServerErrorResponse';
import { handleError } from '../../Helpers/error-handler';  // Adjust the path as necessary
import {ReactiveFormsModule} from '@angular/forms';





@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    FormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule, // Add CommonModule here

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // Variable to store error message
  isLoading: boolean = false; // Variable to manage loading state



  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true; // Start loading
    this.authService.login(this.email, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        localStorage.setItem('accessToken', response.access_token); // Save access token
        this.errorMessage = ''
        this.isLoading = false; // Stop loading
        // Handle successful login, possibly navigate to another route
        // Navigate to a different route, e.g., the dashboard
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed', error);
        this.errorMessage = handleError(error);
        this.isLoading = false; // Stop loading
        //this.errorMessage = 'Invalid email or password. Please try again.'; // Set error message
      }
    );
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  // private handleError(error: HttpErrorResponse): Observable<ServerError> {
  //   let serverError: ServerError = { status: 'error', message: 'An unknown error occurred' };
  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     this.errorMessage = error.error.message;
  //     serverError.message = error.error.message;
  //   } else {
  //     // Server-side error
  //     this.errorMessage = error.error.message;
  //     serverError = error.error as ServerError;
  //   }
  //   return throwError(serverError);
  // }
}
