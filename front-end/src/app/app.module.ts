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
import { PageNavComponent } from './nav/pageNav.component';
import { CardsOrGameSelectorComponent } from './statistiques/cards-or-game-selector/cards-or-game-selector/cards-or-game-selector.component';
import { CardsDataContainerComponent } from './statistiques/cards-data-container/cards-data-container/cards-data-container.component';
import { GamesDataContainerComponent } from './statistiques/games-data-container/games-data-container/games-data-container.component';



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
    SingledataForSingledifficultyComponent,
    PageNavComponent,
    CardsOrGameSelectorComponent,
    CardsDataContainerComponent,
    GamesDataContainerComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
