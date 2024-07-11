import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prison-card',
  templateUrl: './prison-card.component.html',
  styleUrls: ['./prison-card.component.scss']
})
export class PrisonCardComponent implements OnInit {

  @Input() CategoryName!: string;
  @Input() TotalCapacity!: string;
  @Input() AccessedCells!: string;
  @Input() AvailableCells!: string;
  @Input() Progress!: string;
  @Input() ArrestDate!: string;
  @Input() Reason!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
