import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
    selector: 'kj-slider',
    standalone: true,
    imports: [
        MatSlider,
        MatSliderThumb,
        ReactiveFormsModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <label>{{label()}}</label>
            <mat-slider min="{{min()}}" max="{{max()}}" step="{{step()}}" showTickMarks discrete
                        [displayWith]="formatLabel">
                <input matSliderThumb formControlName="{{name()}}">
            </mat-slider>
        </ng-container>
    `,
    styleUrl: './slider.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Slider {
    controlContainer = inject(ControlContainer)

    get fg() {
        return this.controlContainer.control as FormGroup
    }

    label = input.required()
    min = input()
    max = input.required()
    step = input()
    name = input.required()

    formatLabel(value: number): string {
        if (value >= 1000) {
            return Math.round(value / 1000) + 'k';
        }

        return `${value}`;
    }
}
