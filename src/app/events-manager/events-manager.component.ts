import { Component, OnInit } from '@angular/core';

import { events } from '../data/events-list';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent implements OnInit {
  currentEvent = "none";
  d3 = 0;
  d6 = 0;
  value = 0;

  events = events;

  constructor() { }

  ngOnInit() {
  }

  generateEvent() {
    this.d3 = Math.floor((Math.random() * 3) + 1);
    this.d6 = Math.floor((Math.random() * 6) + 1);
    this.value = this.d3*10 + this.d6;

    this.currentEvent = events.find(x => x.id == this.value).desc;
  }

}