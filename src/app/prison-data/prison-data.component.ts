import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prison-data',
  templateUrl: './prison-data.component.html',
  styleUrls: ['./prison-data.component.scss'],
})
export class PrisonDataComponent implements OnInit {
  data = [];
  tableData = [];
  constructor(private router: Router) {
    const getNavigationData = this.router.getCurrentNavigation();
    if (getNavigationData?.extras.state) {
      this.tableData = getNavigationData?.extras.state['data'];
    }

    console.log(getNavigationData);
  }

  ngOnInit(): void {
    console.log(this.tableData, 'oninin');
  }

  onView(event: any) {
    debugger;

    this.router.navigate(['prisoner-details'], {
      state: {
        data: {
          selectedPrisonerData: event,
          prisonerData: this.tableData,
        },
      },
    });
  }

 
}
