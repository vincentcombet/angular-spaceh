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
  ssssEvent="";
  ssssCoordX=0;
  ssssCoordY=0;
  sabot = [
  'Activation de Horde', 
  'Activation de Horde', 
  'Activation de Horde', 
  'Activation de Monstre', 
  'Activation de Monstre', 
  'Activation de Monstre', 
  'Embuscade !', 
  'Embuscade !', 
  '#Frénésie !', 
  '#Frénésie !', 
  'Monstre errant$', 
  'Monstre errant$', 
  '#Qu’est-ce qu il a dans sa poche ?', 
  'Perte d équilibre', 
  '#Scénario$', 
  'Flux de Mana', 
  '#Ça pourrait être utile !', 
  'Renforts', 
  '#J ai marché sur une vipère !$', 
  'Ils sont à nos trousses !', 
  '#Ça peut pas être pire !$', 
  'Piège !$', 
  'Il est costaud celui-là !'
  ];
  defausse = [];
  final = [];

  @ViewChild(EventsManagerComponent)
  private eventManager: EventsManagerComponent;

  @ViewChild(ExplorationManagerComponent)
  private explorationManager: ExplorationManagerComponent;

  constructor(private mathService: MathsServiceService) { }

  ngOnInit(): void {
    this.flushCards(this.sabot);
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

  ///////////////////////////////////////////
  // SS & SS //
  ///////////////////////////////////////////

  flushCards(table: Array<String>) {
    var intermediarie = table.slice();
    for (let i = 0; i < table.length; i++) {
      var aleat = Math.floor(Math.random() * Math.floor(intermediarie.length));
      console.log(aleat);
      this.final[i] = intermediarie[aleat];
      intermediarie.splice(aleat, 1);
    }
    console.log(this.final);
  }

  generateSSSSCoordonnates() {
    this.ssssCoordX = this.mathService.getRandomValue(36);
    this.ssssCoordY = this.mathService.getRandomValue(36);
  }

  generateSSSSEvent() {
    var aleat = Math.floor(Math.random() * Math.floor(this.final.length));

    this.ssssEvent = this.final[aleat];
    if (!this.ssssEvent.startsWith('#')) {
      this.defausse.push(this.ssssEvent);
    }

    this.final.splice(aleat, 1);

    if (this.ssssEvent.endsWith('$')) {
      console.log('Reflush !');
      this.final = this.final.concat(this.defausse);
      this.defausse = [];
      this.flushCards(this.final);
    }

    console.log(this.final);
    console.log(this.defausse);
  }

}
