import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-window',
  standalone: true,
  template: `
      <ng-content select="kj-header"></ng-content>
      <div class="flex-auto overflow-none flex flex-nowrap">
        <ng-content select="kj-preview"></ng-content>
        <ng-content select="kj-config-panel"></ng-content>
      </div>
      <ng-content select="kj-footer"></ng-content>
  `,
  styleUrl: './window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Window {
}
