import { Component, OnInit } from '@angular/core';

import { explorations } from '../data/explorations-list';
import { corridorContents } from '../data/corridor-content-list';
import { corridorEnds } from '../data/corridor-end-list';
import { rooms } from '../data/rooms-list';

@Component({
  selector: 'app-exploration-manager',
  templateUrl: './exploration-manager.component.html',
  styleUrls: ['./exploration-manager.component.css']
})
export class ExplorationManagerComponent implements OnInit {
  currentPlace = "none";
  explorationD12 = 0;
  corridorContentD6 = 0;
  corridorEndD6 = 0;
  roomD6 = 0;
  nbDiscoveredRooms = 0
  value = 0;

  explorations = explorations;

  constructor() { }

  ngOnInit() {
  }

  explorate() {
    this.explorationD12 = Math.floor((Math.random() * 11) + 2);

    var explorationResult = explorations.find(x => x.id == this.explorationD12).desc;

    if (explorationResult == "room") {
      this.roomD6 = Math.floor((Math.random() * 6) + 1);
      var indexRoom = this.roomD6 + this.nbDiscoveredRooms;
      if (indexRoom > 8) {
        indexRoom = 8;
      }
      this.currentPlace = rooms.find(x => x.id == indexRoom).desc;
      this.nbDiscoveredRooms++;
    } else {
      this.corridorContentD6 = Math.floor((Math.random() * 6) + 1);
      var content = corridorContents.find(x => x.id == this.corridorContentD6).desc;

      this.corridorEndD6 = Math.floor((Math.random() * 6) + 1);
      var end = corridorEnds.find(x => x.id == this.corridorEndD6).desc;

      this.currentPlace = explorationResult + " (content: " + content + ", end: " + end + ")";
    }
  }
}