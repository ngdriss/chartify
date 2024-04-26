import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {DataForm} from "./data-form/data-form";

@Component({
  selector: 'kj-tabs',
  standalone: true,
  imports: [
    MatTabGroup, MatTab, DataForm
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Data">
        <kj-data-form/>
      </mat-tab>
      <mat-tab label="Style">Style</mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tabs {

}
