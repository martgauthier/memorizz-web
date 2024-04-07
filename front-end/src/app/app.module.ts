import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Template } from './config/template.component';
import { NbCard } from './config/nbCard/nbCard.component';
import { Position } from './config/postion/position.component';
import { Type } from './config/type/type.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MemorycardComponent} from "./memory/memorycard/memorycard.component";
import {MemoryComponent} from "./memory/memory/memory.component";
import {MemorytemplateComponent} from "./memory/memorytemplate.component";
import {MemorywinComponent} from "./memory/memorywin/memorywin.component";
import { NgParticlesModule } from "ng-particles";
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
import { CardsSelectorComponent } from './statistiques/cards-selector/cards-selector/cards-selector.component';
import { CourbeComponent } from './statistiques/courbe/courbe/courbe.component';
import {BaseChartDirective, provideCharts, withDefaultRegisterables} from "ng2-charts";
import { TimeSelectorComponent } from './statistiques/time-selector/time-selector/time-selector.component';
import {FormsModule} from "@angular/forms";
import {
  BigPreferredDifficultyComponent
} from "./statistiques/big-preferred-difficulty/big-preferred-difficulty.component";



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
    GamesDataContainerComponent,
    CardsSelectorComponent,
    CourbeComponent,
    TimeSelectorComponent,
    BigPreferredDifficultyComponent,
    MemoryComponent,
    MemorycardComponent,
    MemorytemplateComponent,
    MemorywinComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule,
    BaseChartDirective,
    FormsModule
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent]
})
export class AppModule { }
