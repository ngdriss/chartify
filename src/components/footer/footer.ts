import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ChartService} from "../../chart/chart.service";
import {AppStateService} from "../app-state.service";
import {MatIconModule} from "@angular/material/icon";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {SettingsModal} from "../settings/settings-modal/settings-modal";

@Component({
    selector: 'kj-footer',
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule
    ],
    template: `
        <button mat-flat-button class="create-btn" (click)="createChart()">Create</button>
        <button mat-icon-button (click)="openSettings()">
            <mat-icon>settings</mat-icon>
        </button>
    `,
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
    chartService = inject(ChartService);
    appStateService = inject(AppStateService);

    constructor(public dialog: MatDialog) {}

    createChart() {
        this.chartService.createChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType);
    }

    openSettings() {
        // this.modal.open(SettingsModal)
        console.log('openning modal')
    }
}
