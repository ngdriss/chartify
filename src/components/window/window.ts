import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-window',
  standalone: true,
  template: `
    <ng-content select="kj-preview"></ng-content>
    <div class="window-body">
      <ng-content select="kj-body"></ng-content>
    </div>
    <ng-content select="kj-footer"></ng-content>
  `,
  styleUrl: './window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Window {
}
