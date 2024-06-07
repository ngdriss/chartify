import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {TuiButtonModule, TuiDialogModule} from "@taiga-ui/core";
import {ChartService} from "../../chart/chart.service";
import {AppStateService} from "../app-state.service";

@Component({
    selector: 'kj-footer',
    standalone: true,
    imports: [
        TuiButtonModule,
        TuiDialogModule
    ],
    template: `
        <button
                tuiButton
                type="button"
                class="create-btn"
                (click)="createChart()"
        >
            Create
        </button>
    `,
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
    chartService = inject(ChartService)
    appStateService = inject(AppStateService)

    createChart() {
        this.chartService.createChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType);
    }
}
