import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { EventsManagerComponent } from './events-manager/events-manager.component';
import { ExplorationManagerComponent } from './exploration-manager/exploration-manager.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, EventsManagerComponent, ExplorationManagerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
