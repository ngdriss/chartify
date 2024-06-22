import {ChangeDetectionStrategy, Component, effect, inject} from '@angular/core';
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";
import {ConfigService} from "../config.service";
import {ChartService} from "../../chart/chart.service";

@Component({
    selector: 'kj-preview',
    standalone: true,
    imports: [
        TuiSvgModule,
        TuiButtonModule
    ],
    template: `
        <div id="preview"></div>
    `,
    styleUrl: './preview.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview {
    chartService = inject(ChartService)
    configService = inject(ConfigService)
    config = this.configService.config

    constructor() {
        effect(() => {
            const currentConfig = this.config()
            if (currentConfig) {
                this.chartService.previewChart(currentConfig)
            }
        })
    }
}
