import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { Template } from './config/template.component';
import { NbCard } from './config/nbCard/nbCard.component';
import { Position } from './config/postion/position.component';
import { Type } from './config/type/type.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHeader } from './header/header.component';
import { AjoutImage } from './ajoutImage/ajoutImage.component';


@NgModule({
  declarations: [
    AppComponent,
    MyHeader,
    AjoutImage,
    AppComponent,
    Template,
    NbCard,
    Position,
    Type
    ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
