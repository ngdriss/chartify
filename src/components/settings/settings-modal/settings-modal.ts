import { ChangeDetectionStrategy, Component } from '@angular/core';
import {ColorSettings} from "../color-settings/color-settings";
import {TuiTabsModule} from "@taiga-ui/kit";
import {NgSwitch, NgSwitchCase} from "@angular/common";
import {TuiSvgModule} from "@taiga-ui/core";
import {TuiHeaderModule, TuiTitleModule} from "@taiga-ui/experimental";

@Component({
  selector: 'kj-settings-modal',
  standalone: true,
  imports: [
    ColorSettings,
    TuiTabsModule,
    NgSwitch,
    NgSwitchCase,
    TuiSvgModule,
    TuiHeaderModule,
    TuiTitleModule
  ],
  template: `
    <kj-color-settings></kj-color-settings>
  `,
  styleUrl: './settings-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModal {
  activeView = 0
}
