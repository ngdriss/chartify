import 'zone.js';
import {importProvidersFrom} from '@angular/core';
import {EntryComponent} from './entry.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

bootstrapApplication(EntryComponent, {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ],
})
    .catch(err => console.error(err))
