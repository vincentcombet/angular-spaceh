import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'SpaceH';

  public constructor (private titleService: Title) {
    titleService.setTitle("Space Hulk App")
  }  
}
