import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MultiSelect} from "../multi-select/multi-select";
import {ControlContainer, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'kj-patterns',
  standalone: true,
  imports: [
    MultiSelect,
    ReactiveFormsModule
  ],
  template: `
    <ng-container [formGroup]="fg">
      <kj-multi-select name="patterns" [items]="patterns"/>
    </ng-container>
  `,
  styleUrl: './patterns.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Patterns {
  patterns = ["stripes", "dots", "lines"]
  controlContainer = inject(ControlContainer)

  get fg() {
    return this.controlContainer.control as FormGroup
  }
}
