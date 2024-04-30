import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {ChartService} from 'src/chart/chart.service';
import {AppStateService} from '../app-state.service';
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'kj-preview',
    standalone: true,
    imports: [],
    template: `
        <div id="preview"></div>
    `,
    styleUrl: './preview.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview {
    chartService = inject(ChartService);
    appStateService = inject(AppStateService);
    state = toSignal(this.appStateService.state$)

    constructor() {
        effect(() => {
            const state = this.state()
            if (state.selectedChartType && state.chartConfig) {
                this.chartService.previewChart(this.state().chartConfig, this.state().selectedChartType);
            }
        })
    }
}
