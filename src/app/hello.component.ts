import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>App {{name}}</h1>`,
  styles: [``]
})
export class HelloComponent  {
  @Input() name: string;
}
