import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathsServiceService {

  constructor() { }

  /**
   * Return a rendam value between 1 and max parameter.
   * (Using Crypto algo)
   * @param max max value for the random number.
   */
  public getRandomValue(max: number) {
    var array = new Uint8Array(1);
    window.crypto.getRandomValues(array);

    return Math.floor(array[0]/255*max) + 1;
  }

  public generate() {
    
    var t = 0;
    var nb1 = 0;
    var nb2 = 0;
    var nb3 = 0;
    var nb4 = 0;
    var nb5 = 0;
    var nb6 = 0;
    for (var i=0; i<1000; i++) {
      var tt =this.getRandomValue(6);
      switch (tt) {
        case 1: {
          nb1++;
          break;
        }
        case 2: {
          nb2++;
          break;
        }
        case 3: {
          nb3++;
          break;
        }
        case 4: {
          nb4++;
          break;
        }
        case 5: {
          nb5++;
          break;
        }
        case 6: {
          nb6++;
          break;
        }
      }
      t+=tt;
    }
    console.log(nb1);
    console.log(nb2);
    console.log(nb3);
    console.log(nb4);
    console.log(nb5);
    console.log(nb6);
    console.log(1000/6);
  }
}
