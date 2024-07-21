import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiddlewareService } from '../Services/middleware.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  resJailData: any[] = [];
  resPrisonersData: any[] = [];
  groupedData: any[] = [];
  groupSectionData: any[] = [];

  totalCount: any = 0;
  isCollapsed: boolean[] = [];

  prisons = [
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
  ];

  constructor(
    private router: Router,
    private middleWareService: MiddlewareService
  ) {
    this.isCollapsed = new Array(this.resJailData?.length).fill(true);
  }

  ngOnInit(): void {
    this.getJailData();
    // this.getPrisonerData();
  }

  async getJailData() {
    let body = {};
    this.middleWareService
      .callPostMiddleware(`${environment.jailIdrl}`, body)
      .subscribe({
        next: (res: any) => {
          console.log('jailIdchecked', res.Array.row);
          this.resJailData = res?.Array?.row;
        },
        error: (err: any) => {
          console.log('JailIDerr', err);
        },
      });
  }

  async getPrisonerData(jailId: string) {
    console.log('prisonerData', jailId);
    let body = {
      ImportPublicOrganisation: {
        Number: jailId,
      },
    };

    this.middleWareService
      .callPostMiddleware(`${environment.prisonerData}`, body)
      .subscribe({
        next: (res: any) => {
          console.log('PrisonerDatachecked', res.Array.row);
          this.totalCount = res?.Array?.row.length;
          console.log('PrisonerCount Checked', res.Array);
          this.resPrisonersData = res.Array.row;
        },
        error: (err: any) => {
          console.log('Prisonererr', err);
        },
      });
  }

  toggleCollapse(index: number, jailId: number): void {
    console.log(index, jailId);
    this.isCollapsed[index] = !this.isCollapsed[index];
    // this.getPrisonerData(jailId);
    // this.groupData();
    const data = this.groupedData.find((obj: any) => {
      const keys = Object.keys(obj);
      return Number(keys[0]) === jailId;
    });
    console.log({ data });
    data == undefined ? this.groupSection(jailId) : '';
  }

  async groupSection(jailId: number) {
    console.log('groupSectionvia id', jailId);
    let body = {
      ImportPublicOrganisation: {
        Number: jailId,
      },
    };

    this.middleWareService
      .callPostMiddleware(`${environment.prisonerData}`, body)
      .subscribe({
        next: (res: any) => {
          console.log('groupSectionvia ID fetched Checked', res.Array);
          this.groupSectionData = res.Array.row;
          this.groupData(jailId, this.groupSectionData);
        },
        error: (err: any) => {
          console.log('Prisonererr', err);
        },
      });
  }

  getCount(input: any) {
    return Object.keys(input);
  }

  groupData(jailId: any, data: any) {
    const groupedSection = data.reduce((acc, current) => {
      const sectionNumber = current.RowsJailSentence.SectionNumber;
      const wardNumber = current.RowsJailSentence.WardNumber;
      if (!acc[sectionNumber]) {
        acc[sectionNumber] = {
          sectionNumber: sectionNumber,
          wards: { [wardNumber]: 1 },
          totalCount: 1, // Initialize count
          // Add any other properties you want to aggregate
          // totalCount: [current], // If you want to collect all objects with the same SectionNumber
        };
      } else {
        if (!acc[sectionNumber].wards[wardNumber]) {
          acc[sectionNumber].wards[wardNumber] = 1; // First occurrence of this ward
          // acc[sectionNumber].totalCount++;
        } else {
          acc[sectionNumber].wards[wardNumber]++;
        }
        acc[sectionNumber].totalCount++;
        // Update other properties accordingly
        // }
        // acc[sectionNumber].totalCount++;

        // if (!acc[sectionNumber].wards.includes(wardNumber)) {
        //   acc[sectionNumber].wards.push(wardNumber);
        // }
        // acc[sectionNumber].totalCount++;
        // acc[sectionNumber].totalCount.push(current); // If you want to collect all objects with the same SectionNumber
        // Update other properties accordingly
      }
      console.log(acc);

      return acc;
    }, {});

    // Convert object back to array
    // this.groupedData = Object.values(grouped);
    this.groupedData.push({ [jailId]: Object.values(groupedSection) });
    console.log(this.groupedData, 'ddddddddddddddddd');
  }

  calculateProgressBarWidth(progress: number): number {
    // this.router.navigate(['prisondata', 'Kuwait']);
    return progress;
  }

  goToWardGroup(id: any, count: any) {
    console.log(id, '@@@@@@@@@@@@@@@@', count);
    // this.data.sendData(count);
    // const queryParams = {
    //   sectionNumber: count.sectionNumber,
    //   id: id,
    // };
    // console.log('gfggf', queryParams);
    // this.data.nextCount(count);

    // this.router.navigate(['prison-ward'], { queryParams: queryParams });
  }

  getSectionGroupData(jailId: number) {
    // for (let index = 0; index < this.groupedData.length; index++) {
    //     if(this.)

    // }
    const foundObject = this.groupedData.find((obj: any) => {
      const keys = Object.keys(obj);
      return Number(keys[0]) === jailId;
    });

    if (foundObject) {
      return foundObject[jailId];
    } else {
      // If no object with the given Id is found, return an empty array or handle as needed
      return [];
    }
    // this.groupedData[prison?.RowsPublicOrganisation?.Number]
  }

  // getSections(data: any) {
  //   console.log('sectionsdata', data);
  //   return data;
  // }
}
