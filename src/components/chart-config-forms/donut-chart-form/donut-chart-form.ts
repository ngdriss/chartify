import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {ReactiveFormsModule} from "@angular/forms";
import {Slider} from "../../form-controls/slider/slider";

@Component({
    selector: 'kj-donut-chart-form',
    standalone: true,
    imports: [
        Slider,
        ReactiveFormsModule,
    ],
    template: `
        <div class="input-container" [formGroup]="fg">
            <kj-slider name="entries" label="Entries" min="2" max="30" step="1"/>
            <kj-slider name="innerRadius" label="Inner Radius" min="0" max="100" step="1"/>
            <kj-slider name="cornerRadius" label="Corner Radius" min="0" max="100" step="1"/>
        </div>
    `,
    styleUrls: ['../base-chart.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartForm extends BaseChartForm {

    constructor() {
        super();
        const initialFormData = this.initialFormData
        this.fg = this.fb.group({
            entries: this.fb.nonNullable.control(initialFormData.entries),
            innerRadius: this.fb.nonNullable.control(initialFormData.innerRadius),
            cornerRadius: this.fb.nonNullable.control(initialFormData.cornerRadius)
        })
        this.init()
    }

    get defaultFormData(): any  {
        return {
            entries: 5,
            innerRadius: 90,
            cornerRadius: 10
        }
    }
}
