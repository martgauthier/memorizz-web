import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MemorycardComponent} from "./memory/memorycard/memorycard.component";
import {MemoryComponent} from "./memory/memory/memory.component";
import {MemorytemplateComponent} from "./memory/memorytemplate.component";
import {MemorywinComponent} from "./memory/memorywin/memorywin.component";
import { NgParticlesModule } from "ng-particles";
@NgModule({
  declarations: [
    AppComponent,
    MemoryComponent,
    MemorycardComponent,
    MemorytemplateComponent,
    MemorywinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgParticlesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
