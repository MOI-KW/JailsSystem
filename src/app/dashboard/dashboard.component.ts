import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  prisons = [
    {
      CategoryName: 'Gents Prison',
      TotalCapacity: '150',
      AccessedCells: '100',
      AvailableCells: '50',
      Progress: '70%',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Womens Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: '70%',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'Womens Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: '70%',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
    {
      CategoryName: 'A Prison',
      TotalCapacity: '150',
      AccessedCells: '80',
      AvailableCells: '70',
      Progress: '70%',
      ArrestDate: '17th Nov. 2020',
      Reason: 'Chain Snatch',
    },
   
  ];

  constructor() {}

  ngOnInit(): void {}
}
