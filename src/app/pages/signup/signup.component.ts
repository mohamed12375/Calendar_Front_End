import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { handleError } from '../../Helpers/error-handler';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule, // Add CommonModule here
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.signup(this.email, this.password).subscribe(
      response => {
        console.log('Signup successful', response);
        this.errorMessage = '';
        this.isLoading = false;
        // Navigate to login page after successful signup
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Signup failed', error);
        this.errorMessage = handleError(error);
        this.isLoading = false;
      }
    );
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
