import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
    selector: 'kj-checkbox',
    standalone: true,
    imports: [
        MatCheckbox,
        ReactiveFormsModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <label>{{label()}}</label>
            <mat-checkbox formControlName="{{name()}}"></mat-checkbox>
        </ng-container>
    `,
    styleUrl: './checkbox.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Checkbox {
    controlContainer = inject(ControlContainer)

    get fg() {
        return this.controlContainer.control as FormGroup
    }

    label = input.required()
    name = input.required()
}
