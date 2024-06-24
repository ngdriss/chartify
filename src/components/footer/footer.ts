import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {TuiButtonModule, TuiDialogModule, TuiDialogService, TuiHintModule} from "@taiga-ui/core";
import {ChartService} from "../../chart/chart.service";
import {ConfigService} from "../config.service";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {SettingsModal} from "../settings/settings-modal/settings-modal";
import {CurrentFigmaNodeService} from "../current-figma-node.service";
import {DataService} from "../data.service";

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
                appearance="secondary"
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
                appearance="outline"
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
    private chartService = inject(ChartService)
    private configService = inject(ConfigService)
    private dataService = inject(DataService)
    private dialogService = inject(TuiDialogService)
    private currentFigmaNodeService = inject(CurrentFigmaNodeService)

    label = computed(() => this.currentFigmaNodeService.hasNode() ? 'Update' : 'Create')

    createChart() {
        this.chartService.createChart(this.configService.config());
    }

    regenerate() {
        this.configService.updateConfig('data', this.dataService.getData(this.configService.config().chartConfig, true))
        this.chartService.previewChart(this.configService.config())
    }

    openSettings() {
        this.dialogService.open<number>(
            new PolymorpheusComponent(SettingsModal))
            .subscribe();
    }
}
