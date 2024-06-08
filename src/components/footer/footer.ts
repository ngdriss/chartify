import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TuiButtonModule, TuiDialogModule, TuiDialogService, TuiHintModule} from "@taiga-ui/core";
import {ChartService} from "../../chart/chart.service";
import {AppStateService} from "../app-state.service";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {SettingsModal} from "../settings/settings-modal/settings-modal";
import {CurrentFigmaNodeService} from "../current-figma-node.service";

@Component({
    selector: 'kj-footer',
    standalone: true,
    imports: [
        TuiButtonModule,
        TuiDialogModule,
        TuiHintModule
    ],
    template: `
        <button
                tuiButton
                type="button"
                class="create-btn"
                (click)="createChart()"
        >
            {{label()}}
        </button>
        <button
                tuiIconButton
                icon="tuiIconRefreshCcw"
                type="button"
                class="regenerate-btn"
                tuiHint="Randomize Data"
                tuiHintAppearance="onDark"
                (click)="regenerate()"
        >
        </button>
        <button
                tuiIconButton
                type="button"
                icon="tuiIconSettings"
                tuiHint="Settings"
                tuiHintAppearance="onDark"
                (click)="openSettings()"
        ></button>
    `,
    styleUrl: './footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Footer {
    chartService = inject(ChartService)
    appStateService = inject(AppStateService)
    dialogService = inject(TuiDialogService)
    currentFigmaNodeService = inject(CurrentFigmaNodeService)

    label = computed(() => this.currentFigmaNodeService.hasNode() ? 'Update' : 'Create')

    createChart() {
        this.chartService.createChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType);
    }

    regenerate() {
        this.chartService.previewChart(this.appStateService.getCurrentChartConfig(), this.appStateService.selectedChartType, true)
    }

    openSettings() {
        this.dialogService.open<number>(
            new PolymorpheusComponent(SettingsModal))
            .subscribe();
    }
}
