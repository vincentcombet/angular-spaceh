import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsManagerComponent } from '../events-manager/events-manager.component';
import { ExplorationManagerComponent } from '../exploration-manager/exploration-manager.component';
import { MathsServiceService } from '../helper/maths-service.service';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.less'],
  providers: [MathsServiceService]
})
export class GlobalComponent implements OnInit {
  currentPlayer = "";
  roundNb = 0;
  gameStarted = false;
  blips = "";
  commandPoint = "";

  @ViewChild(EventsManagerComponent)
  private eventManager: EventsManagerComponent;

  @ViewChild(ExplorationManagerComponent)
  private explorationManager: ExplorationManagerComponent;

  constructor(private mathService: MathsServiceService) { }

  ngOnInit(): void {
  }

  startGame() {
    if (this.roundNb == 0 || confirm("Are you sure to start a new game ?")) {
      this.currentPlayer = "Space Marine";
      this.gameStarted = true;
      this.roundNb = 1;
      this.eventManager.reset();
      this.explorationManager.reset();
      this.blips = "";
      this.calculateCP();
    }
  }

  changePlayer() {
    this.currentPlayer = (this.currentPlayer == "Space Marine"?"Genestealer":"Space Marine");
    if (this.currentPlayer == "Space Marine") {
      this.roundNb++;
      this.calculateCP();
    } else {
      this.eventManager.generateEvent();
      this.blips = "(Blips : " + this.mathService.getRandomValue(3) + ")";
    }
  }

  calculateCP() {
    this.commandPoint = "(CP : " + this.mathService.getRandomValue(6) + ")";
  }

}
