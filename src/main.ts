import 'zone.js';
import {importProvidersFrom} from '@angular/core';

import {EntryComponent} from './entry.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

bootstrapApplication(EntryComponent, {
    providers: [
        importProvidersFrom(BrowserModule)
    ],
})
    .catch(err => console.error(err))
