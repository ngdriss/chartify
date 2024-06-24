import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TuiBrightness,
    TuiModeModule,
    TuiThemeNightModule, TuiNightThemeService, TuiLoaderModule
} from "@taiga-ui/core";
import {Component, inject, Inject} from '@angular/core';
import {Window} from "./components/window/window";
import {Footer} from "./components/footer/footer";
import {Preview} from "./components/preview/preview";
import {AsyncPipe, NgIf} from "@angular/common";
import {Header} from "./components/header/header";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {ConfigPanel} from "./components/config-panel/config-panel";
import {LoadingService} from "./components/loading.service";

@Component({
    selector: 'app-root',
    template: `
        <tui-theme-night *ngIf="!(night$ | async)"></tui-theme-night>
        <tui-loader [showLoader]="loading()">
            <tui-root [tuiMode]="mode$ | async">
                <kj-window>
                    <kj-preview/>
                    <kj-config-panel/>
                    <kj-footer/>
                </kj-window>
            </tui-root>
        </tui-loader>
    `,
    standalone: true,
    imports: [Window, Footer, Preview, ConfigPanel, TuiRootModule, TuiDialogModule, TuiAlertModule, AsyncPipe, NgIf, TuiModeModule, Header, TuiThemeNightModule, TuiLoaderModule],
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class EntryComponent {
    private loadingService = inject(LoadingService)
    constructor(@Inject(TuiNightThemeService) readonly night$: TuiNightThemeService) {}

    get mode$(): Observable<TuiBrightness | null> {
        return this.night$.pipe(map(isDark => !isDark ? 'onDark' : null));
    }
    get loading() {
        return this.loadingService.loading
    }
}
