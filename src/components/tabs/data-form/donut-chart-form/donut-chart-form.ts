import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-donut-chart-form',
  standalone: true,
  imports: [],
  template: `
    <p>
      donut-chart-form works!
    </p>
  `,
  styleUrl: './donut-chart-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartForm {

}
