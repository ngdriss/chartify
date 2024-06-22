import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'kj-header',
  standalone: true,
  template: `
    <p>
      header works!
    </p>
  `,
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
