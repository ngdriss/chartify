import { provideAnimations } from "@angular/platform-browser/animations";
import {importProvidersFrom} from "@angular/core";
import 'zone.js';
import {EntryComponent} from './entry.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {ALL_TAIGA_UI_MODULES} from "./modules";
import {
    TUI_SANITIZER,
    tuiSvgOptionsProvider,
    TuiRootModule,
    TUI_BUTTON_OPTIONS,
    TUI_BUTTON_DEFAULT_OPTIONS, TUI_CHECKBOX_OPTIONS, TUI_CHECKBOX_DEFAULT_OPTIONS
} from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import * as icons from "@taiga-ui/icons";
import {keys, reduce} from "lodash";
import {TUI_EDITOR_COLOR_SELECTOR_MODE_NAMES} from "@tinkoff/tui-editor";
import {TUI_SLIDER_DEFAULT_OPTIONS, TUI_SLIDER_OPTIONS} from "@taiga-ui/kit";

const ICONS: any = reduce(keys(icons), (acc, key) => {
    acc[key] = icons[key];
    return acc;
}, {})

bootstrapApplication(EntryComponent, {
    providers: [
        provideAnimations(),
        importProvidersFrom(ALL_TAIGA_UI_MODULES, TuiRootModule),
        provideHttpClient(),
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        {
            provide: TUI_EDITOR_COLOR_SELECTOR_MODE_NAMES,
            useValue: ['Solid']
        },
        {
            provide: TUI_BUTTON_OPTIONS,
            useValue: {
                ...TUI_BUTTON_DEFAULT_OPTIONS,
                size: 's'
            }
        },
        {
            provide: TUI_SLIDER_OPTIONS,
            useValue: {
                ...TUI_SLIDER_DEFAULT_OPTIONS,
                size: 's'
            }
        },
        {
            provide: TUI_CHECKBOX_OPTIONS,
            useValue: {
                ...TUI_CHECKBOX_DEFAULT_OPTIONS,
                size: 'm'
            }
        },
        tuiSvgOptionsProvider({
            srcProcessor: (src) => ICONS[src as string]
        })
    ],
})
    .catch(err => console.error(err))
