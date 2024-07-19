import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TUI_DATE_TIME_VALUE_TRANSFORMER} from '@taiga-ui/kit';

import {ExampleDateTimeTransformer} from './value-transformer';

@Component({
  selector: 'tui-input-date-time-example-4',
  standalone: true,
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_DATE_TIME_VALUE_TRANSFORMER,
            useClass: ExampleDateTimeTransformer,
        },
    ],
})
export class DatePickerComponent {

}
