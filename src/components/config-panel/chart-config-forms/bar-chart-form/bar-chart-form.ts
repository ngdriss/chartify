import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BaseChartForm} from "../base-chart-form";
import {Slider} from "../../../form-controls/slider/slider";
import {Checkbox} from "../../../form-controls/checkbox/checkbox";
import {Select} from "../../../form-controls/select/select";
import {BarChartConfig} from "../../../../models/chart-types";
import {Patterns} from "../../../form-controls/patterns/patterns";

@Component({
    selector: 'kj-bar-chart-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Slider,
        Checkbox,
        Select,
        Patterns
    ],
    template: `
        <ng-container [formGroup]="fg">
            <div class="options-container">
                <kj-select name="direction" label="Direction" [options]="['vertical', 'horizontal']"/>
            </div>
            <kj-patterns />
            <div class="input-container">
                <kj-slider name="entries" label="Entries" min="1" max="20" step="1"/>
                <kj-slider name="maxValue" label="Max Value" min="10" max="1000" step="10"/>
                <kj-slider name="barWidth" label="Bar width" min="1" max="100" step="1"/>
            </div>
            <div class="input-container">
                <kj-checkbox name="showAxis" label="Show Axis"/>
                <kj-checkbox name="showLegend" label="Show Legend"/>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartForm extends BaseChartForm {

    constructor() {
        super(BarChartConfig);
    }
}
