import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-color-settings',
  standalone: true,
  imports: [],
  template: `
    <p>
      color-settings works!
    </p>
  `,
  styleUrl: './color-settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSettings {

}
