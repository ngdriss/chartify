import { ChangeDetectionStrategy, Component } from '@angular/core';
import {BaseChartForm} from "../base-chart-form";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'kj-donut-chart-form',
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
      <mat-form-field>
        <mat-label>Inner Radius</mat-label>
        <input matInput type="number" formControlName="innerRadius" placeholder="inner Radius ?">
      </mat-form-field>
      <mat-form-field>
        <mat-label>Corner Radius</mat-label>
        <input matInput type="number" formControlName="cornerRadius" placeholder="corner Radius ?">
      </mat-form-field>
    </ng-container>
  `,
  styleUrl: './donut-chart-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartForm extends BaseChartForm {

  constructor() {
    super();
    this.fg = this.fb.group({
      entries: this.fb.nonNullable.control(5),
      maxValue: this.fb.nonNullable.control(100),
      innerRadius: this.fb.nonNullable.control(350),
      cornerRadius: this.fb.nonNullable.control(10)
    })
    this.init()
  }
}
