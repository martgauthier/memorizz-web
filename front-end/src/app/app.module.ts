import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Bouton } from './bouton.component';
import { Template } from './config/template.component';
import { NbCard } from './config/nbCard/nbCard.component';

@NgModule({
  declarations: [
    AppComponent,
    Bouton,
    Template,
    NbCard
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
