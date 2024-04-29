import 'zone.js';
import {importProvidersFrom} from '@angular/core';

import {EntryComponent} from './entry.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from "@angular/platform-browser/animations";

bootstrapApplication(EntryComponent, {
    providers: [
        provideAnimations(),
        importProvidersFrom(BrowserModule)
    ]
})
    .catch(err => console.error(err))
