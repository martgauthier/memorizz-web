import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MemorycardComponent} from "./memory/memorycard/memorycard.component";
import {MemoryComponent} from "./memory/memory/memory.component";
import {MemorytemplateComponent} from "./memory/memorytemplate.component";
@NgModule({
  declarations: [
    AppComponent,
    MemoryComponent,
    MemorycardComponent,
    MemorytemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
