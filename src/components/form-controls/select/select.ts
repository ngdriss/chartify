import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, TitleCasePipe} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";

@Component({
    selector: 'kj-select',
    standalone: true,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgForOf,
        TitleCasePipe
    ],
    template: `
        <ng-container [formGroup]="fg">
            <mat-form-field>
                <mat-label>{{label()}}</mat-label>
                <select matNativeControl formControlName="{{name()}}">
                    <option *ngFor="let option of options()" value="{{option}}">{{option | titlecase}}</option>
                </select>
            </mat-form-field>
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
