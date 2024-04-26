import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../data.service";
import {startWith} from "rxjs/operators";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
    selector: 'kj-data-form',
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatInput,
        ReactiveFormsModule
    ],
    providers: [FormBuilder],
    template: `
        <ng-container [formGroup]="fg">
            <mat-form-field>
                <mat-label>Lines</mat-label>
                <input matInput type="number" formControlName="lines" placeholder="How many lines ?">
            </mat-form-field>
            <mat-form-field>
                <mat-label>Number of points</mat-label>
                <input matInput type="number" formControlName="points" placeholder="How many points ?">
            </mat-form-field>
            <mat-form-field>
                <mat-label>Max Y</mat-label>
                <input matInput type="number" formControlName="rangeY" placeholder="Max Y-axis number ?">
            </mat-form-field>
            <mat-form-field>
                <mat-label>Max X</mat-label>
                <input matInput type="number" formControlName="rangeX" placeholder="Max X-axis number ?">
            </mat-form-field>
            <mat-form-field>
                <mat-label>Distribution</mat-label>
                <select matNativeControl formControlName="distribution">
                    <option value="random">Random</option>
                    <option value="trend-up">Trend up</option>
                    <option value="trend-down">Trend down</option>
                </select>
            </mat-form-field>
        </ng-container>
    `,
    styleUrl: './data-form.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataForm {
    fb = inject(FormBuilder);
    fg = this.fb.group({
        lines: this.fb.nonNullable.control(3),
        points: this.fb.nonNullable.control(5),
        rangeX: this.fb.nonNullable.control(100),
        rangeY: this.fb.nonNullable.control(100),
        distribution: this.fb.nonNullable.control("random")
    })
    dataService = inject(DataService);

    constructor() {
        this.fg.valueChanges
            .pipe(startWith(this.fg.value))
            .subscribe((value) => {
                this.dataService.data = value as any;
            })
    }
}
