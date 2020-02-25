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
  currentCorridor = "none";
  currentRoom = "none";
  nbDiscoveredRooms = 0;

  explorations = explorations;

  constructor() { }

  ngOnInit() {
  }

  explorate() {
    var explorationD12 = Math.floor((Math.random() * 11) + 2);

    var explorationResult = explorations.find(x => x.id == explorationD12).desc;

    if (explorationResult == "room") {
      this.currentRoom = this.generateRoom();
      this.currentCorridor = "none";
    } else {
      this.currentCorridor = explorationResult + this.generateCorridor();
      if (explorationResult.indexOf("room") != -1) {
        this.currentRoom = this.generateRoom();
      } else if (explorationResult.indexOf("relaunch") != -1) {
        // FIXME
        var explorationD12 = Math.floor((Math.random() * 11) + 2);
        while (explorationD12 == 7) {
          explorationD12 = Math.floor((Math.random() * 11) + 2);
        }
        var explorationResult2 = explorations.find(x => x.id == explorationD12).desc;
        this.currentCorridor = this.currentCorridor.replace("relaunch", "(" + explorationResult2 + ")");
        this.currentRoom = "none";
      } else {
        this.currentRoom = "none";
      }
    }
  }

  generateRoom() {
    var roomD6 = Math.floor((Math.random() * 6) + 1);
    var indexRoom = roomD6 + this.nbDiscoveredRooms;
    if (indexRoom > 8) {
      indexRoom = 8;
    }
    var tempRoom = rooms.find(x => x.id == indexRoom).desc;
    this.nbDiscoveredRooms++;

    return tempRoom;
  }

  generateCorridor() {
    var corridorContentD6 = Math.floor((Math.random() * 6) + 1);
    var content = corridorContents.find(x => x.id == corridorContentD6).desc;

    var corridorEndD6 = Math.floor((Math.random() * 6) + 1);
    var end = corridorEnds.find(x => x.id == corridorEndD6).desc;

    var tempCorridor = " (content: " + content + ", end: " + end + ")";

    return tempCorridor;

  }
}