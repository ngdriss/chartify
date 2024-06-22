import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {TuiDataListWrapperModule, TuiSelectModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: 'kj-select',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        TitleCasePipe,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule
    ],
    template: `
        <ng-container [formGroup]="fg">
            <tui-select tuiTextfieldSize="m" formControlName="{{name()}}" class="w-full">
                {{label()}}
                <input
                        placeholder="Choose your hero"
                        tuiTextfield
                />
                <tui-data-list-wrapper
                        *tuiDataList
                        [items]="options()"
                ></tui-data-list-wrapper>
            </tui-select>
        </ng-container>
    `,
    styleUrl: './select.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select {
    controlContainer = inject(ControlContainer)

    get fg() {
        return this.controlContainer.control as FormGroup
    }

    label = input.required()
    name = input.required()
    options = input.required<any[]>()
}
