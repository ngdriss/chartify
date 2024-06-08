import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ColorSettings} from "../color-settings/color-settings";
import {TuiTabsModule} from "@taiga-ui/kit";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
  selector: 'kj-settings-modal',
  standalone: true,
  imports: [
    ColorSettings,
    TuiTabsModule,
    NgSwitch,
    NgSwitchCase,
    TuiSvgModule
  ],
  template: `
    <tui-tabs [(activeItemIndex)]="activeView">
      <button tuiTab>
        <tui-svg
            src="tuiIconDroplet"
            class="tui-space_right-2"
        ></tui-svg>
        Colors
      </button>
    </tui-tabs>
    <ng-container [ngSwitch]="activeView">
      <kj-color-settings *ngSwitchCase="0"></kj-color-settings>
    </ng-container>
  `,
  styleUrl: './settings-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModal {
  activeView = 0
}
