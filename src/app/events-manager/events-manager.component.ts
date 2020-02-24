import { Component, OnInit } from '@angular/core';

import { events } from '../events-list';

@Component({
  selector: 'app-events-manager',
  templateUrl: './events-manager.component.html',
  styleUrls: ['./events-manager.component.css']
})
export class EventsManagerComponent implements OnInit {
  currentEvent = "none";
  d3 = 0;

  events = events;

  constructor() { }

  ngOnInit() {
  }

  generateEvent() {
    this.d3 = Math.floor((Math.random() * 3) + 1);

    this.currentEvent = events[this.d3].desc;
  }

}