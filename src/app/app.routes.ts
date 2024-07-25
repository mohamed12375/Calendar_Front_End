import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './Components/my-calendar/my-calendar.component';
import { EventFormComponent } from './Components/event-form/event-form.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Updated import
import { AuthGuard } from './Helpers/auth.guard';  // Import the auth guard
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Helpers/auth.interceptor';
import { EventListComponent } from './Components/event-list copy/event-list-ang.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarViewComponent } from './pages/calendar-view/calendar-view.component';



export const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard] },
  { path: 'create-event', component: EventFormComponent, canActivate: [AuthGuard] }, // Protect route
  { path: 'events-list', component: EventListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/events-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),    HttpClientModule, // Import HttpClientModule
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports: [RouterModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true,
    // },
  ],
})
export class AppRoutingModule { }
