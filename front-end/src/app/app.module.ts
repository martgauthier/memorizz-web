import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { Template } from './config/template.component';
import { NbCard } from './config/nbCard/nbCard.component';
import { Position } from './config/postion/position.component';
import { Type } from './config/type/type.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AjoutImage } from './ajoutImage/ajoutImage.component';
import {Bouton} from "./bouton.component";
import { StatistiquesDisplayerComponent } from './statistiques/statistiques-displayer/statistiques-displayer.component';
import {BigSinglestatComponent} from "./statistiques/big-singlestat/big-singlestat.component";
import {HelpIconComponent} from "./statistiques/help-icon/help-icon.component";
import {
  MonitoringCallToActionComponent
} from "./statistiques/monitoring-call-to-action/monitoring-call-to-action.component";
import {
  SingledataForSingledifficultyComponent
} from "./statistiques/singledata-for-singledifficulty/singledata-for-singledifficulty.component";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AjoutImage,
    AppComponent,
    Template,
    NbCard,
    Position,
    Type,
    Bouton,
    StatistiquesDisplayerComponent,
    BigSinglestatComponent,
    HelpIconComponent,
    MonitoringCallToActionComponent,
    SingledataForSingledifficultyComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
