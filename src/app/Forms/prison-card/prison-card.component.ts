import { Component, Input, OnInit } from '@angular/core';
import { pData } from '../../prisondata'
import { Router } from '@angular/router';

@Component({
  selector: 'app-prison-card',
  templateUrl: './prison-card.component.html',
  styleUrls: ['./prison-card.component.scss']
})
export class PrisonCardComponent implements OnInit {

  prisons: any = [];

  // @Input() CategoryName!: string;
  // @Input() TotalCapacity!: string;
  // @Input() AccessedCells!: string;
  // @Input() AvailableCells!: string;
  // @Input() Progress!: string;
  // @Input() ArrestDate!: string;
  // @Input() Reason!: string;

  // cardBorderColorClass: string = 'custom-border-color';
  // applyCustomBorder:boolean = true;


  prisonsOne = [
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Womens-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 50,
      OverallPrisoners: '387',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'A-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 90,
      OverallPrisoners: '187',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'B-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 40,
      OverallPrisoners: '107',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'C-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 99,
      OverallPrisoners: '107',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'D-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 99,
      OverallPrisoners: '107',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'E-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 99,
      OverallPrisoners: '107',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'E-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 99,
      OverallPrisoners: '107',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
  ];
  prisonsTwo = [
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
  ];
  prisonsThree = [
    {
      CategoryName: 'Gents-Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: 70,
      OverallPrisoners: '287',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Womens-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 50,
      OverallPrisoners: '387',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'A-Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: 90,
      OverallPrisoners: '187',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },

  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

    // this.prisons = pData;

  }

  calculateProgressBarWidth(progress: number): number {
    // this.router.navigate(['prisondata', 'Kuwait']);
    return progress;
  }

  onView(category: string) {
    console.log(category);
    this.router.navigate(['prisondata', category]);
  }

}
