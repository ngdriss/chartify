import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {ReactiveFormsModule} from "@angular/forms";
import {Slider} from "../../form-controls/slider/slider";

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
    styleUrls: ['../base-chart.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartForm extends BaseChartForm {
    constructor() {
        super();
        const initialFormData = this.initialFormData
        this.fg = this.fb.group({
            entries: this.fb.nonNullable.control(initialFormData.entries),
            padAngle: this.fb.nonNullable.control(initialFormData.padAngle),
            cornerRadius: this.fb.nonNullable.control(initialFormData.cornerRadius)
        })
        this.init()
    }

    get defaultFormData(): any  {
        return {
            entries: 5
        }
    }
}
