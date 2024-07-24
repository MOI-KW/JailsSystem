import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-prisoner-detail',
  templateUrl: './prisoner-detail.component.html',
  styleUrls: ['./prisoner-detail.component.scss'],
})
export class PrisonerDetailComponent implements OnInit {
  selectedPrisonerData: any;
  prisonerData: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.selectedPrisonerData = JSON.parse(
      localStorage.getItem('selectedData')
    )?.selectedPrisonerData;
    debugger;
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(["prisondata"])
  }
}
