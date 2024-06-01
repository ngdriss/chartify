import 'zone.js';
import {importProvidersFrom} from '@angular/core';
import {EntryComponent} from './entry.component';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";

bootstrapApplication(EntryComponent, {
    providers: [
        provideAnimations(),
        provideHttpClient(),
        importProvidersFrom(BrowserModule, BrowserAnimationsModule, MatNativeDateModule, MatDialogModule),
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ],
})
    .catch(err => console.error(err))
