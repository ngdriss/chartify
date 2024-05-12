import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {BaseChartForm} from "../base-chart-form";
import {Checkbox} from "../../form-controls/checkbox/checkbox";
import {Select} from "../../form-controls/select/select";
import {Slider} from "../../form-controls/slider/slider";
import {NgIf} from "@angular/common";

@Component({
    selector: 'kj-line-chart-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        Checkbox,
        Select,
        Slider,
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
                <kj-checkbox name="dashed" label="Dashed"/>
                <kj-checkbox name="showAxis" label="Show Axis"/>
                <ng-container *ngIf="fg.get('showAxis').value">
                    <kj-slider name="rangeY" label="Max Y" min="10" max="1000" step="10"/>
                    <kj-slider name="rangeX" label="Max X" max="1000" step="10"/>
                </ng-container>
            </div>
        </ng-container>
    `,
    styleUrls: ['../base-chart.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartForm extends BaseChartForm {
    constructor() {
        super();
        const initialFormData = this.initialFormData
        this.fg = this.fb.group({
            lines: this.fb.nonNullable.control(initialFormData?.lines),
            points: this.fb.nonNullable.control(initialFormData?.points),
            distribution: this.fb.nonNullable.control(initialFormData?.distribution),
            curve: this.fb.nonNullable.control(initialFormData?.curve),
            displayPoints: this.fb.nonNullable.control(initialFormData?.displayPoints),
            dashed: this.fb.nonNullable.control(initialFormData?.dashed),
            showAxis: this.fb.nonNullable.control(initialFormData?.showAxis),
            rangeX: this.fb.nonNullable.control(initialFormData?.rangeX),
            rangeY: this.fb.nonNullable.control(initialFormData?.rangeY),
        })
        this.init()
    }

    get defaultFormData(): any {
        return {
            lines: 3,
            points: 5,
            distribution: "random",
            curve: "simple",
            displayPoints: false,
            dashed: false,
            showAxis: true,
            rangeX: 100,
            rangeY: 100
        }
    }
}
