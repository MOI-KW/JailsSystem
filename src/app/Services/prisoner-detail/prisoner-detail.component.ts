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
    console.log('prisonerDetails constructor called');
    const navigationData = this.router.getCurrentNavigation();
    debugger;
    if (navigationData?.extras?.state) {
      this.selectedPrisonerData = navigationData?.extras?.state['data'];
    }
    console.log('single', this.selectedPrisonerData);
    console.log('single', this.selectedPrisonerData.selectedPrisonerData);
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['prisondata'], {
      state: {
        data: this.selectedPrisonerData.prisonerData,
      },
    });
  }
}
