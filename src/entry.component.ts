import {Component} from '@angular/core';
import {Window} from "./components/window/window";
import {Footer} from "./components/footer/footer";
import {Preview} from "./components/preview/preview";
import {Body} from "./components/body/body";

@Component({
    selector: 'app-root',
    template: `
        <kj-window>
            <kj-preview/>
            <kj-body/>
            <kj-footer/>
        </kj-window>
    `,
    standalone: true,
    imports: [Window, Footer, Preview, Body]
})
export class EntryComponent {}
