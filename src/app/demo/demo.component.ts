import { Component, OnInit } from '@angular/core';
import { pData } from '../prisondata';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  prisons:any = {};


  prisonsOne = [
    {
      id:1,
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    }
   
  ];
  constructor() { }

  ngOnInit(): void {
     this.prisons = pData;
     
  }

  calculateProgressBarWidth(progress:number):number{
    return progress;
  }

}
