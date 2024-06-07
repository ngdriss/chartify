import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TuiCheckboxModule} from "@taiga-ui/kit";

@Component({
    selector: 'kj-checkbox',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiCheckboxModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <label>{{label()}}</label>
            <tui-checkbox
                    formControlName="{{name()}}"
            ></tui-checkbox>
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
