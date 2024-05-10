import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ChartService} from 'src/chart/chart.service';
import {AppStateService} from '../app-state.service';
import {DIMENSIONS} from "../../../plugin/shared";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'kj-preview',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    template: `
        <div id="preview"></div>
        <button (click)="regenerate()" class="regenerate-btn" mat-icon-button color="primary">
            <mat-icon>restart_alt</mat-icon>
        </button>
    `,
    styleUrl: './preview.scss',
    styles: [`#preview {
      height: ${DIMENSIONS.previewHeight}px;
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview {
    chartService = inject(ChartService);
    appStateService = inject(AppStateService);
    regenerate() {
        this.chartService.previewChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType, true)
    }
}
