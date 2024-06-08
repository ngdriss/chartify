import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {ColorsService} from "../../colors.service";
import {TuiTagModule} from "@taiga-ui/kit";
import {NgForOf} from "@angular/common";
import {TuiButtonModule} from "@taiga-ui/core";

@Component({
  selector: 'kj-color-settings',
  standalone: true,
  imports: [
    TuiTagModule,
    NgForOf,
    TuiButtonModule
  ],
  template: `
    <div class="flex items-center gap-2 flex-wrap p-2">
      <tui-tag
          *ngFor="let color of colorService.colors()"
          status="custom"
          [style.background-color]="color"
          [hoverable]="true"
          [removable]="true"
          [value]="color"
          (edited)="onRemove(color)"
      ></tui-tag>
      <button
          tuiIconButton
          size="s"
          icon="tuiIconPlus"
          (click)="onAdd()"
      >
      </button>
      <button
          tuiIconButton
          size="s"
          icon="tuiIconRotateCcw"
          (click)="onReset()"
      >
      </button>
    </div>
  `,
  styleUrl: './color-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSettings {
  colorService = inject(ColorsService)

  onRemove(color: string) {
    this.colorService.removeColor(color)
  }

  onAdd() {

  }
  onReset() {
    this.colorService.resetColors()
  }
}
