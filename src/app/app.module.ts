import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule, // CommonModule kerak emas, chunki BrowserModule ichida bor
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: []

})
export class AppModule { }
