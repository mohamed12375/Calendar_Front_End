import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone:true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  // onSubmit() {
  //   this.authService.login(this.email, this.password).subscribe(
  //     response => {
  //       console.log('Login successful', response);
  //     },
  //     error => {
  //       console.error('Login failed', error);
  //     }
  //   );
  // }
}
