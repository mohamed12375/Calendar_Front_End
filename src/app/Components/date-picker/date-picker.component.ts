import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiTextfieldControllerModule} from '@taiga-ui/core';
import {TuiInputDateTimeModule} from '@taiga-ui/kit';
import {FormControl, FormGroup} from '@angular/forms';
import {TUI_DATE_FORMAT, TUI_DATE_SEPARATOR, TuiDay, TuiTime} from '@taiga-ui/cdk';
import {tuiInputDateOptionsProvider} from '@taiga-ui/kit';

@Component({
    selector: 'tui-input-date-time-example-5',
    standalone: true,
    templateUrl: './date-picker.component.html',
    imports:[
      FormsModule,
      ReactiveFormsModule,
      TuiInputDateTimeModule,
      TuiTextfieldControllerModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {provide: TUI_DATE_FORMAT, useValue: 'YMD'},
      {provide: TUI_DATE_SEPARATOR, useValue: '/'},
  ],
})
export class TuiInputDateTimeExample5 {
    // Get current date and time
    now: Date = new Date();
    currentDay: TuiDay = new TuiDay(this.now.getFullYear(), this.now.getMonth(), this.now.getDate());
    currentTime: TuiTime = new TuiTime(this.now.getHours(), 0);

    readonly testForm = new FormGroup({
        testValue: new FormControl([this.currentDay, this.currentTime]),
    });
}
