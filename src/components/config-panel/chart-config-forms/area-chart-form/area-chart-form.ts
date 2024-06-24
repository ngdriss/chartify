import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {BaseChartForm} from "../base-chart-form";
import { AreaChartConfig } from 'src/models/chart-types';
import {Slider} from "../../../form-controls/slider/slider";
import {Select} from "../../../form-controls/select/select";
import {Checkbox} from "../../../form-controls/checkbox/checkbox";
import {MultiSelect} from "../../../form-controls/multi-select/multi-select";
import {Patterns} from "../../../form-controls/patterns/patterns";

@Component({
    selector: 'kj-area-chart-form',
    standalone: true,
    imports: [
        Slider,
        Select,
        Checkbox,
        ReactiveFormsModule,
        NgIf,
        MultiSelect,
        Patterns
    ],
    template: `
        <ng-container [formGroup]="fg">
            <div class="options-container">
                <kj-select name="distribution" label="Distribution" [options]="['random', 'trend-up', 'trend-down']"/>
                <kj-select name="curve" label="Path" [options]="['simple', 'curved']"/>
            </div>
            <kj-patterns />
            <div class="input-container">
                <kj-slider name="lines" label="Lines" min="1" max="20" step="1"/>
                <kj-slider name="points" label="Points" min="1" max="30" step="1"/>
            </div>
            <div class="input-container">
                <kj-checkbox name="displayPoints" label="Display Points"/>
                <kj-checkbox name="stacked" label="Stacked"/>
                <kj-checkbox name="showAxis" label="Show Axis"/>
                <kj-checkbox name="showLegend" label="Show Legend"/>
            </div>
            <div *ngIf="fg.get('showAxis').value" class="input-inline">
                <div>
                    <kj-slider name="rangeY" label="Max Y" min="10" max="1000" step="10"/>
                </div>
                <div>
                    <kj-slider name="rangeX" label="Max X" max="1000" step="10"/>
                </div>
            </div>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaChartForm extends BaseChartForm {
    constructor() {
        super(AreaChartConfig);
    }
}
