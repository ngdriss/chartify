import {Component} from '@angular/core';
import {NgSwitch, NgSwitchDefault, NgSwitchCase} from '@angular/common';
import {Window} from "./components/window/window";
import {Footer} from "./components/footer/footer";
import {Sidebar} from "./components/sidebar/sidebar";
import {Tabs} from "./components/tabs/tabs";

@Component({
    selector: 'app-root',
    template: `
        <kj-window>
            <kj-sidebar/>
            <kj-tabs/>
            <kj-footer/>
        </kj-window>
    `,
    standalone: true,
    imports: [NgSwitch, NgSwitchDefault, NgSwitchCase, Window, Footer,Tabs, Sidebar]
})
export class EntryComponent {}
