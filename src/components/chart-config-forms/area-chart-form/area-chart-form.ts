import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {LineChartForm} from "../line-chart-form/line-chart-form";
import {Slider} from '../../form-controls/slider/slider';
import {Checkbox} from "../../form-controls/checkbox/checkbox";
import {Select} from "../../form-controls/select/select";
import {NgIf} from "@angular/common";

@Component({
    selector: 'kj-area-chart-form',
    standalone: true,
    imports: [
        Slider,
        Select,
        Checkbox,
        ReactiveFormsModule,
        NgIf
    ],
    template: `
        <ng-container [formGroup]="fg">
            <div class="options-container">
                <kj-select name="distribution" label="Distribution" [options]="['random', 'trend-up', 'trend-down']"/>
                <kj-select name="curve" label="Path" [options]="['simple', 'curved']"/>
            </div>
            <div class="input-container">
                <kj-slider name="lines" label="Lines" min="1" max="20" step="1"/>
                <kj-slider name="points" label="Number of points" min="1" max="30" step="1"/>
                <kj-checkbox name="displayPoints" label="Display Points"/>
                <kj-checkbox name="showAxis" label="Show Axis"/>
                <ng-container *ngIf="fg.get('showAxis').value">
                    <kj-slider name="rangeY" label="Max Y" min="10" max="1000" step="10"/>
                    <kj-slider name="rangeX" label="Max X" max="1000" step="10"/>
                </ng-container>
            </div>
        </ng-container>
    `,
    styleUrls: ['../base-chart.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaChartForm extends LineChartForm {
    constructor() {
        super();
    }
}
