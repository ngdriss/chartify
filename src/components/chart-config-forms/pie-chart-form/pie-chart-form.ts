import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {ReactiveFormsModule} from "@angular/forms";
import {Slider} from "../../form-controls/slider/slider";
import {PieChartConfig} from "../../../models/chart-types";

@Component({
    selector: 'kj-pie-chart-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Slider
    ],
    template: `
        <div class="input-container" [formGroup]="fg">
            <kj-slider name="entries" label="Entries" min="2" max="30" step="1"/>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartForm extends BaseChartForm {
    constructor() {
        super(PieChartConfig);
    }
}
