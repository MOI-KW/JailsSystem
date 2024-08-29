import { Component, Input, OnInit } from '@angular/core';
import { MOIprisoner } from 'src/app/Models/prisenorDetails';

@Component({
  selector: 'app-print-prisoner-details',
  templateUrl: './print-prisoner-details.component.html',
  styleUrls: ['./print-prisoner-details.component.scss']
})
export class PrintPrisonerDetailsComponent implements OnInit {
  @Input() selectedPrisoner: MOIprisoner

  constructor() { }

  ngOnInit(): void {
  }

}
