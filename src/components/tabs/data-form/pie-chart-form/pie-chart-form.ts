import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-pie-chart-form',
  standalone: true,
  imports: [],
  template: `
    <p>
      pie-chart-form works!
    </p>
  `,
  styleUrl: './pie-chart-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartForm {

}
