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

 name = [
  {
    PrisonerName:'AZAZAZ',
    CellName:'Gents-Cell',
    Age:33,
    DOB:11-11-2011,
    ArrestDate:20-20-2020,
    Reason:'Chain Snatching case'

  }
 ]



}
