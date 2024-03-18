import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHeader } from './header/header.component';
import { AjoutImage } from './ajoutImage/ajoutImage.component';


@NgModule({
  declarations: [
    AppComponent, 
    MyHeader, 
    AjoutImage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
