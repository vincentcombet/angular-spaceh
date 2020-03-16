import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { EventsManagerComponent } from './events-manager/events-manager.component';
import { ExplorationManagerComponent } from './exploration-manager/exploration-manager.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { GlobalComponent } from './global/global.component';
import { MathsServiceService } from './helper/maths-service.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, EventsManagerComponent, ExplorationManagerComponent, ToolBarComponent, GlobalComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ MathsServiceService]
})
export class AppModule { }
