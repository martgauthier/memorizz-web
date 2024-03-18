import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MemorytemplateComponent} from "./memory/memorytemplate/memorytemplate.component";
import {MemorycardComponent} from "./memory/memorycard/memorycard.component";

@NgModule({
  declarations: [
    AppComponent,
    MemorytemplateComponent,
    MemorycardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
