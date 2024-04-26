import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ChartService} from "../chart.service";

@Component({
  selector: 'kj-footer',
  standalone: true,
  imports: [
      MatButton
  ],
  template: `
    <button mat-flat-button color="accent" (click)="createChart()">Create</button>
  `,
  styleUrl: './footer.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
  chartService = inject(ChartService);

  createChart() {
    this.chartService.createChart();
  }
}
