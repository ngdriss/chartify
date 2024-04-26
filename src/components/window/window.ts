import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-window',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="kj-sidebar"></ng-content>
    <div class="window-body">
      <ng-content select="kj-tabs"></ng-content>
      <ng-content select="kj-footer"></ng-content>
    </div>
  `,
  styleUrl: './window.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Window {

}
