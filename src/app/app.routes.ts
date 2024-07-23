import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './Components/my-calendar/my-calendar.component';
import { MyEventsComponent } from './Components/my-events/my-events.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Updated import
import { AuthGuard } from './Helpers/auth.guard';  // Import the auth guard
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Helpers/auth.interceptor';



export const routes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard] },
  { path: 'calendar', component: MyCalendarComponent, canActivate: [AuthGuard] }, // Protect route
  { path: 'events', component: MyEventsComponent, canActivate: [AuthGuard] }, // Protect route
  { path: '', redirectTo: '/events', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient with interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule { }
