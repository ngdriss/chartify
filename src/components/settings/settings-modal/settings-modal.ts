import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'kj-settings-modal',
  standalone: true,
  imports: [],
  template: `
    <p>
      settings-modal works!
    </p>
  `,
  styleUrl: './settings-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModal {

}
