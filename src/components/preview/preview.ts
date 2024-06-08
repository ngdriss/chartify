import {ChangeDetectionStrategy, Component} from '@angular/core';
import {DIMENSIONS} from "../../../plugin/shared";
import {TuiButtonModule, TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: 'kj-preview',
    standalone: true,
    imports: [
        TuiSvgModule,
        TuiButtonModule
    ],
    template: `
        <div id="preview"></div>
    `,
    styleUrl: './preview.scss',
    styles: [`:host {
      height: ${DIMENSIONS.previewHeight}px;
    }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Preview {}
