import {importProvidersFrom} from "@angular/core";
import 'zone.js';
import {EntryComponent} from './entry.component';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from "@angular/common/http";
import {ALL_TAIGA_UI_MODULES} from "./modules";
import {TUI_SANITIZER, tuiSvgOptionsProvider} from "@taiga-ui/core";
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import * as icons from "@taiga-ui/icons";
import {keys, reduce} from "lodash";

const ICONS: any = reduce(keys(icons), (acc, key) => {
    acc[key] = icons[key];
    return acc;
}, {})

bootstrapApplication(EntryComponent, {
    providers: [
        importProvidersFrom(ALL_TAIGA_UI_MODULES),
        provideHttpClient(),
        {
            provide: TUI_SANITIZER,
            useClass: NgDompurifySanitizer
        },
        tuiSvgOptionsProvider({
            srcProcessor: (src) => ICONS[src as string]
        })
    ],
})
    .catch(err => console.error(err))
