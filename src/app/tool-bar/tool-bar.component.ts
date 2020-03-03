import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  template: `
    <div class="text-center">
      <img src="assets/img/title.png" width="500px"/>
    </div>
  `,
  styleUrls: ['./tool-bar.component.css']
})
export class ToolBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
