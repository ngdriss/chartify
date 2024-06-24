import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {TuiMultiSelectModule} from "@taiga-ui/kit";
import {TuiDataListModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgForOf} from "@angular/common";
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'kj-multi-select',
  standalone: true,
  imports: [
    TuiMultiSelectModule,
    TuiTextfieldControllerModule,
    TuiDataListModule,
    NgForOf,
    ReactiveFormsModule
  ],
  template: `
    <ng-container [formGroup]="fg">
      <tui-multi-select
          [formControlName]="name()"
          [editable]="false"
          [expandable]="false"
          [tuiTextfieldLabelOutside]="true"
          tuiTextfieldSize="m"
      >
        Patterns
        <tui-data-list *tuiDataList>
          <button
              *ngFor="let item of items()"
              tuiOption
              [value]="item"
          >
            {{ item }}
          </button>
        </tui-data-list>
      </tui-multi-select>
    </ng-container>
  `,
  styleUrl: './multi-select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelect {
  private controlContainer = inject(ControlContainer)

  get fg() {
    return this.controlContainer.control as FormGroup
  }
  name = input.required<string>()
  items = input.required<string[]>()
}
