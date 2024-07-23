import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './Components/my-calendar/my-calendar.component';
import { MyEventsComponent } from './Components/my-events/my-events.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Updated import
import { AuthGuard } from './Helpers/auth.guard';  // Import the auth guard


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'calendar', component: MyCalendarComponent },
  { path: 'calendar', component: MyCalendarComponent, canActivate: [AuthGuard] }, // Protect route
  { path: 'events', component: MyEventsComponent, canActivate: [AuthGuard] }, // Protect route
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Provide HttpClient with interceptors
  ],
})
export class AppRoutingModule { }
