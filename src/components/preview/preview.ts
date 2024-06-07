import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ChartService} from 'src/chart/chart.service';
import {AppStateService} from '../app-state.service';
import {DIMENSIONS} from "../../../plugin/shared";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: 'kj-preview',
    standalone: true,
    imports: [
        TuiSvgModule,
        TuiButtonModule
    ],
    template: `
        <div id="preview"></div>
        <button
                tuiIconButton
                icon="tuiIconRefreshCcw"
                type="button"
                appearance="flat"
                class="regenerate-btn"
                (click)="regenerate()"
        >
        </button>
    `,
    styleUrl: './preview.scss',
    styles: [`:host {
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
