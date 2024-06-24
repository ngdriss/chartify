import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {ReactiveFormsModule} from "@angular/forms";
import {Slider} from "../../../form-controls/slider/slider";
import {DonutChartConfig} from "../../../../models/chart-types";
import {Checkbox} from "../../../form-controls/checkbox/checkbox";
import {Patterns} from "../../../form-controls/patterns/patterns";

@Component({
    selector: 'kj-donut-chart-form',
    standalone: true,
    imports: [
        Slider,
        ReactiveFormsModule,
        Checkbox,
        Patterns,
    ],
    template: `
        <ng-container [formGroup]="fg">
            <kj-patterns />
            <div class="input-container">
                <kj-slider name="entries" label="Entries" min="2" max="30" step="1"/>
                <kj-slider name="padAngle" label="Pad Angle" min="0" max="100" step="1"/>
                <kj-slider name="innerRadius" label="Inner Radius" min="0" max="100" step="1"/>
                <kj-slider name="cornerRadius" label="Corner Radius" min="0" max="100" step="1"/>
                <kj-checkbox name="showLegend" label="Show Legend"/>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartForm extends BaseChartForm {

    constructor() {
        super(DonutChartConfig);
    }
}
