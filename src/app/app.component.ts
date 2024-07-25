import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainPageComponent } from "./pages/main-page/main-page.component";
import { LoginComponent } from "./pages/login/login.component";
import { SignupComponent } from "./pages/signup/signup.component";
import { EventFormComponent } from './Components/event-form/event-form.component';


import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { EventListComponent } from "./Components/event-list copy/event-list-ang.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import {TuiInputDateTimeModule} from '@taiga-ui/kit';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainPageComponent,
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    FormsModule,
    LoginComponent,
    SignupComponent,
    EventFormComponent,
    EventListComponent,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
    TuiInputDateTimeModule
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, // Add custom sanitizer provider
  ],// Add custom sanitizer provider]
})
export class AppComponent {
  title = 'Calender';
}
