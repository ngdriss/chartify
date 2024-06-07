import {TuiRootModule} from "@taiga-ui/core";
import {Component} from '@angular/core';
import {Window} from "./components/window/window";
import {Footer} from "./components/footer/footer";
import {Preview} from "./components/preview/preview";
import {Body} from "./components/body/body";

@Component({
    selector: 'app-root',
    template: `
        <tui-root>
            <kj-window>
                <kj-preview/>
                <kj-body/>
                <kj-footer/>
            </kj-window>
        </tui-root>
    `,
    standalone: true,
    imports: [Window, Footer, Preview, Body, TuiRootModule]
})
export class EntryComponent {
}
