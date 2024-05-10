import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BaseChartForm} from "../base-chart-form";
import {Slider} from "../../form-controls/slider/slider";

@Component({
    selector: 'kj-bar-chart-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Slider
    ],
    template: `
        <ng-container [formGroup]="fg">
            <kj-slider name="entries" label="Entries" min="1" max="20" step="1"/>
            <kj-slider name="maxValue" label="Max Value" min="10" max="1000" step="10"/>
            <kj-slider name="barWidth" label="Bar width" min="10" max="100" step="10"/>
        </ng-container>
    `,
    styleUrls: ['../base-chart.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartForm extends BaseChartForm {

    constructor() {
        super();
        const initialFormData = this.initialFormData;
        this.fg = this.fb.group({
            entries: this.fb.nonNullable.control(initialFormData?.entries),
            maxValue: this.fb.nonNullable.control(initialFormData?.maxValue),
            barWidth: this.fb.nonNullable.control(initialFormData?.barWidth)
        })
        this.init()
    }

    get defaultFormData(): any  {
        return {
            entries: 10,
            maxValue: 100,
            barWidth: 20
        }
    }
}
