import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCalendarComponent } from './Components/my-calendar/my-calendar.component';
import { MyEventsComponent } from './Components/my-events/my-events.component';


export const routes: Routes = [
  { path: 'calendar', component: MyCalendarComponent },
  { path: 'events', component: MyEventsComponent },
  { path: '', redirectTo: '/calendar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
