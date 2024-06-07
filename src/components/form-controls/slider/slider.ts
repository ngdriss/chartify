import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiSliderModule} from "@taiga-ui/kit";

@Component({
    selector: 'kj-slider',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiSliderModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <label>{{label()}}</label>
            <input
                    size="m"
                    tuiSlider
                    type="range"
                    min="{{min()}}" max="{{max()}}" step="{{step()}}"
                    formControlName="{{name()}}"
            />
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
