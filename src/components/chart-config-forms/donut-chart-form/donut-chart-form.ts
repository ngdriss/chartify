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
            <kj-slider name="padAngle" label="Pad Angle" min="0" max="100" step="1"/>
            <kj-slider name="innerRadius" label="Inner Radius" min="0" max="100" step="1"/>
            <kj-slider name="cornerRadius" label="Corner Radius" min="0" max="100" step="1"/>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartForm extends BaseChartForm {

    constructor() {
        super();
        const initialFormData = this.initialFormData
        this.fg = this.fb.group({
            entries: this.fb.nonNullable.control(initialFormData.entries),
            innerRadius: this.fb.nonNullable.control(initialFormData.innerRadius),
            padAngle: this.fb.nonNullable.control(initialFormData.padAngle),
            cornerRadius: this.fb.nonNullable.control(initialFormData.cornerRadius)
        })
        this.init()
    }

    get defaultFormData(): any  {
        return {
            entries: 5,
            padAngle: 0,
            innerRadius: 0,
            cornerRadius: 0
        }
    }
}
