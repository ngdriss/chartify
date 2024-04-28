import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {ChartService} from "../../chart/chart.service";
import {AppStateService} from "../app-state.service";

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
  appStateService = inject(AppStateService);

  createChart() {
    this.chartService.createChart(this.appStateService.state.chartConfig, this.appStateService.state.selectedChartType);
  }
}
