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
    this.value = this.d3 * 10 + this.d6;

    this.currentEvent = events.find(x => x.id == this.value).desc;

    if (this.value == 66) {
      var artefactNb = this.mathService.getRandomValue(6);
      switch (artefactNb) {
        case 1:
          this.currentEvent += 'Cristal Warp : Le Space Marine peut manifester un pouvoir psy (utilisation unique).'
          break;
        case 2:
          this.currentEvent += 'Grenade Krak : Attaque de tir qui tue sur 2+ dans toute une section (utilisation unique).'
          break;
        case 3:
          this.currentEvent += 'Téléporteur : Permet pour un 1PA de se déplacer jusqu\'à 12 cases sans aucune restriction. Utilisable 2 fois.'
          break;
        case 4:
          this.currentEvent += 'Calice de sang : Le Space Marine gagne +1 au CaC.'
          break;
        case 5:
          this.currentEvent += 'Halo de fer : A chaque fois qu\'il perd un PV, il est annulé sur 4+.'
          break;
        case 6:
          this.currentEvent += 'Lance missiles : Mode Krak : 1D6 tue sur 2+ ; Mode Frag : 3D6 (peut cibler jusqu\'à 3 genestealer) tue sur 4+ ; Après avoir tiré si 2D6 < 4 plus de munition.'
          break;

        default:
          break;
      }
    }
  }

}