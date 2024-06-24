import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {ReactiveFormsModule} from "@angular/forms";
import {PieChartConfig} from "../../../../models/chart-types";
import {Slider} from "../../../form-controls/slider/slider";
import {Checkbox} from "../../../form-controls/checkbox/checkbox";
import {Patterns} from "../../../form-controls/patterns/patterns";

@Component({
    selector: 'kj-pie-chart-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Slider,
        Checkbox,
        Patterns
    ],
    template: `
        <ng-container [formGroup]="fg">
            <kj-patterns />
            <kj-slider name="entries" label="Entries" min="2" max="30" step="1"/>
            <div class="input-container">
                <kj-checkbox name="showLegend" label="Show Legend"/>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartForm extends BaseChartForm {
    constructor() {
        super(PieChartConfig);
    }
}
