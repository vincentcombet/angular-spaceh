import { Component, OnInit } from '@angular/core';

import { explorations } from '../data/explorations-list';
import { corridorContents } from '../data/corridor-content-list';
import { corridorEnds } from '../data/corridor-end-list';
import { rooms } from '../data/rooms-list';
import { MathsServiceService } from '../helper/maths-service.service';

@Component({
  selector: 'app-exploration-manager',
  templateUrl: './exploration-manager.component.html',
  styleUrls: ['./exploration-manager.component.css'],
  providers: [MathsServiceService]
})
export class ExplorationManagerComponent implements OnInit {
  currentCorridor = "none";
  currentRoom = "none";
  nbDiscoveredRooms = 0;
  firstAttempt = true;
  explorationD12: number = 0;
  roomRate = 4;
  nbTurn = 0;
  map = "";

  constructor(private mathService: MathsServiceService) { }

  ngOnInit() {
  }

  reset() {
    this.currentCorridor = "none";
    this.currentRoom = "none";
    this.nbDiscoveredRooms = 0;
    this.firstAttempt = true;
    this.explorationD12 = 0;
    this.roomRate = 4;
    this.nbTurn = 0;
    this.map = ""
  }

  explorate_loop() {
    this.nbTurn = 0;
    this.reset();
    while (this.currentRoom != "Objective room") {
      this.explorate();
      this.nbTurn++;
    }
  }

  explorate() {
    // 4+ room (in room list) otherwise corridor (exploration list)
    // Each time a corridor is found, -1 to find a room, each time a room is found, +1 to find a room
    
    var firstExplore = this.mathService.getRandomValue(6);
    //console.log("Begin room rate: " + this.roomRate);
    console.log("First explore: " + firstExplore);

    if (firstExplore < this.roomRate && this.explorationD12 != 7) {
      //Room
      //console.log("ROOM !!");

      this.currentRoom = this.generateRoom();
      this.currentCorridor = "none";
      this.explorationD12 = 0;
      this.roomRate = 0;
    } else {
      // Corridor
      //console.log("CORRIDOR !!");

      this.explorate2();
      if (this.explorationD12 == 4 || this.explorationD12 == 10 || this.explorationD12 == 12) {
        this.roomRate = 0;
      } else if (this.explorationD12 != 7) {
        this.roomRate < 6 ? this.roomRate += 2 : this.roomRate;
      }
    }
    if (this.explorationD12 != 7) {
      this.nbTurn++;
      this.map += "-->" + this.currentCorridor + "/" + this.currentRoom + "<br />";
    }
    //console.log("Final room rate: " + this.roomRate);
  }



  explorate2() {
    this.explorationD12 = this.mathService.getRandomValue(6) + this.mathService.getRandomValue(6);

    var explorationResult = explorations.find(x => x.id == this.explorationD12).desc;

    if (explorationResult == "room") {
      this.currentRoom = this.generateRoom();
      this.currentCorridor = "none";
    } else {
      this.currentCorridor = explorationResult + this.generateCorridor();
      if (explorationResult.indexOf("room") != -1) {
        this.currentRoom = this.generateRoom();
      } else if (explorationResult.indexOf("relaunch") != -1) {
        this.explorationD12 = this.mathService.getRandomValue(6) + this.mathService.getRandomValue(6);
        while (this.explorationD12 == 7 || this.explorationD12 == 9) {
          this.explorationD12 = this.mathService.getRandomValue(6) + this.mathService.getRandomValue(6);
        }
        var explorationResult2 = explorations.find(x => x.id == this.explorationD12).desc;
        this.currentCorridor = this.currentCorridor.replace("relaunch", "(" + explorationResult2 + ")");
        if (explorationResult2.indexOf("room") != -1) {
          this.currentRoom = this.generateRoom();
        } else {
          this.currentRoom = "none";
        }
      } else {
        this.currentRoom = "none";
      }
    }
    if (this.firstAttempt && this.explorationD12 != 7) {
      this.firstAttempt = false;
    }
  }

  generateRoom() {
    //console.log("Nb rooms discovered: " + this.nbDiscoveredRooms);

    var roomD6 = this.mathService.getRandomValue(6);
    var indexRoom = roomD6 + this.nbDiscoveredRooms;
    if (indexRoom > 8) {
      indexRoom = 8;
    }
    var tempRoom = rooms.find(x => x.id == indexRoom).desc;
    this.nbDiscoveredRooms++;

    return tempRoom;
  }

  generateCorridor() {
    var corridorContentD6 = this.mathService.getRandomValue(6);
    var content = corridorContents.find(x => x.id == corridorContentD6).desc;

    var corridorEndD6 = this.mathService.getRandomValue(6);
    var end = corridorEnds.find(x => x.id == corridorEndD6).desc;

    var end2 = "";
    if (this.firstAttempt) {
      while (corridorEndD6 == 5) {
        corridorEndD6 = this.mathService.getRandomValue(6);
        end = corridorEnds.find(x => x.id == corridorEndD6).desc;
      }
      corridorEndD6 = this.mathService.getRandomValue(6);
      while (corridorEndD6 == 5) {
        corridorEndD6 = this.mathService.getRandomValue(6);
      }
      end2 = corridorEnds.find(x => x.id == corridorEndD6).desc;
      end2 = ", end2: " + end2;
    }

    var tempCorridor = " (content: " + content + ", end: " + end + end2 + ")";

    return tempCorridor;
  }
}
