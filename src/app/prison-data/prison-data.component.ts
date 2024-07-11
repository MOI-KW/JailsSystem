import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prison-data',
  templateUrl: './prison-data.component.html',
  styleUrls: ['./prison-data.component.scss'],
})
export class PrisonDataComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onView(event: Event) {
    console.log(event);
  }
}
