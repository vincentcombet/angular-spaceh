import { Component, OnInit } from '@angular/core';

import { events } from '../data/events-list';
import { MathsServiceService } from '../helper/maths-service.service';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css'],
  providers: [MathsServiceService]
})
export class EventsManagerComponent implements OnInit {
  currentEvent = "none";
  d3 = 0;
  d6 = 0;
  value = 0;

  events = events;

  constructor(private mathService: MathsServiceService) { }

  ngOnInit() {
  }

  reset() {
    this.currentEvent = "none";
    this.d3 = 0;
    this.d6 = 0;
    this.value = 0;
  }

  generateEvent() {
    this.d3 = this.mathService.getRandomValue(6);
    this.d6 = this.mathService.getRandomValue(6);
    this.value = this.d3*10 + this.d6;

    this.currentEvent = events.find(x => x.id == this.value).desc;
  }

}