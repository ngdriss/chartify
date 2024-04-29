import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'kj-pie-chart-form',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  template: `
    <ng-container [formGroup]="fg">
      <mat-form-field>
        <mat-label>Entries</mat-label>
        <input matInput type="number" formControlName="entries" placeholder="How many entries ?">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Max Value</mat-label>
        <input matInput type="number" formControlName="maxValue" placeholder="maxValue ?">
      </mat-form-field>
    </ng-container>
  `,
  styleUrl: './pie-chart-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChartForm extends BaseChartForm {

  constructor() {
    super();
    this.fg = this.fb.group({
      entries: this.fb.nonNullable.control(5),
      maxValue: this.fb.nonNullable.control(100)
    })
    this.init()
  }
}
