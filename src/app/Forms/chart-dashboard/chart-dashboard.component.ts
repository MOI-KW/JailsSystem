import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { DataTableConstants } from 'src/app/Globals/datatable';
import { jailsDetails } from 'src/app/Models/Jails';
import { JailService } from 'src/app/Services/JailData/jail.service';
import { MiddlewareService } from 'src/app/Services/middleware.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import * as XLSX from 'xlsx';

declare const utils: any;
@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit {

  constructor(private alertService: AlertService, private changeDetector: ChangeDetectorRef, public jailService: JailService) { }
  tblHeadArr: any[string] = [
    'sNo',
    'jailName',
    'prisonersCount',
    'custodyCount',
    'total_count',
    'capacity',
    'percent',
    'View',
  ];

  dataSource!: MatTableDataSource<any>;
  JaildisplayList = []
  showCustody = false
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  itemPerPage = DataTableConstants.ItemPerPage;
  pageSize = DataTableConstants.PageSize;
  pageSizeOptions: number[] = [10, 25, 50];
  selectedPrisoner: any
  activeModalRef: any;


  isLoading = false
  barChartOptions: EChartsOption = {}
  pieChartOptions: EChartsOption =
    {
      title: {

      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '60%',
          data: [
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

  emphasisStyle: any = {
    itemStyle: {
      shadowColor: utils.rgbaColor(utils.getColor('dark'), 0.3)
    }
  };
  chartTextStyle: any = {
    color: utils.getColors().dark,
    fontFamily: 'NotoKufiArabic-VariableFont_wght',
    fontWeight: 400,
    fontSize: 12
  };
  legendOptions: any = {
    show: true,
    icon: 'circle',
    left: 'right',
    orient: 'vertical',
    textStyle: this.chartTextStyle
  };

  ngOnInit(): void {
    this.showtable()
  }

  showtable() {
    this.isLoading = true
    let custodyList = []
    this.jailService.getJailData().subscribe((res: any) => {
      if (res != null) {

        console.log(res);

        this.jailService.getCustodyDetails().subscribe(custodyResult => {
          custodyList = custodyResult
        }, () => { }, () => {
          this.settable(res, custodyList)

        })
      }
      this.isLoading = false

    }, (err) => { console.log('err', err) }, () => { this.isLoading = false });
  }




  ngAfterViewInit() {
    if (this.dataSource?.paginator) {
      this.dataSource.paginator = this.paginator;
    }

  }
  resJailData = []




  setPieChartOptions(data: any = []) {
    this.pieChartOptions = {

      color: ['#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
      title: {

      },
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: '16',
          fontFamily: "NotoKufiArabic-VariableFont_wght",
          fontWeight: 600

        }
      },
      series: [
        {
          name: 'السجون',
          type: 'pie',
          radius: '50%',
          avoidLabelOverlap: false,
          label: {
            fontSize: '16',
            fontFamily: "NotoKufiArabic-VariableFont_wght",
            fontWeight: 600

          },
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    let jailsName = []
    let count = []
    data.forEach(element => {
      jailsName.push(element.name)
      count.push(element.value)
    });
    this.barChartOptions = {
      xAxis: {
        type: 'category',
        data: jailsName,
        axisLabel: {
          fontSize: 18
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 18
        }
      },
      series: [
        {
          data: count,
          type: 'bar',
          label: {
            fontSize: 20,
            fontWeight: 'bold'

          },
        }
      ]
    };

  }
  selectedjailID = ''
  selectedjailName = ""
  showDetails = false
  chartClicked(e) {
    this.getJailDetails(e.data.id, e.data.name)
  }

  printCol = [
    "slNo",
    'civilID',
    'nationalNumber',
    'personType',
    'Name',
    'crimeDesciption',
    'caseNumber',
    'caseYearIdent',
    'caseTypeDescription',
    'jailCode',
    'jailName',
    'wardName',
    'wardNumber',
    'nationality',
    'startDate',
    'expectedEndDate',
    'DurationYears',
    'DurationMonths',
    'DurationDays',
    'SuspensionYears',
    'SuspensionMonths',
    'SuspensionDays',
    'Period', 'ReasonHeld', 'ReasonReleased']
  getJailDetails(j_id, j_name) {
    if (j_id != 0) {
      this.showDetails = false
      this.selectedjailID = ''
      this.selectedjailName = ""

      setTimeout(() => {
        this.selectedjailID = j_id
        this.selectedjailName = j_name
        this.showDetails = true
      }, 500)
      this.changeDetector.detectChanges()
    }

    else {
      this.alertService.error("حدث خطأ في عرض بيانات السجن")
    }


    //if the jail code is zero 
    // else {
    //   let arr: any[][] = [];
    //   arr.push(this.printCol);
    //   this.jailService.getCustodyListDetails(999999999).subscribe(res => {
    //     if (res) {
    //       res.forEach((l: any, index: number) => {

    //         let valArr: any = [];
    //         let MOIprisonerData = this.jailService.setPrisonerData_from_JP004(l)
    //         this.printCol.forEach((e: any) => {
    //           if (e == 'slNo') {
    //             valArr.push(index)
    //           }
    //           else {
    //             valArr.push(MOIprisonerData?.[e]);
    //           }
    //         });
    //         arr.push(valArr);
    //       });
    //     }
    //   }, () => { }, () => {
    //     this.export(arr)
    //   })
    //   //  
    // }
  }

  export(excelData): void {

    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excelData);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    let fileName = 'custody_NoSectionNumber.xlsx';
    XLSX.writeFile(wb, fileName);
  }

  getJailCapacity(jail_code) {
    let jail = jailsDetails.get(jail_code?.toString())
    if (jail) return jail.capacity
    else return 0

  }

  total_prisonersCount = 0
  total_custodyCount = 0
  total_total_count = 0

  settable(jailData, custodyData) {
    console.log("jailData", jailData, "custodyData", custodyData)

    this.JaildisplayList = jailData?.map((details: any, i) => {

      let displayData: any = {}
      displayData.sNo = jailsDetails.get(details?.RowsJailSections?.SectionNumber.toString())?.seqNo
      displayData.jailNumber = details?.RowsJailSections?.SectionNumber
      displayData.jailName = jailsDetails.get(details?.RowsJailSections?.SectionNumber.toString())?.j_name
      displayData.prisonersCount = details?.RowsIefSupplied?.Count
      if (custodyData) {
        let custodyD = custodyData?.find(cu => { if (cu.jailNumber?.toString() === details?.RowsJailSections?.SectionNumber?.toString()) return cu })
        displayData.custodyCount = custodyD ? custodyD.CustodyCount : 0
        displayData.total_count = displayData.prisonersCount + displayData.custodyCount
      }


      return displayData
    })
    //if want to show all the jails and the section 0 
    // this.JaildisplayList = custodyData.map((details: any, i) => {

    //   let displayData: any = {}
    //   displayData.sNo = jailsDetails.get(details?.jailNumber.toString())?.seqNo
    //   displayData.jailNumber = details?.jailNumber
    //   displayData.jailName = jailsDetails.get(details?.jailNumber.toString())?.j_name

    //   displayData.custodyCount = details.CustodyCount
    //   let custodyD = jailData?.find(cu => { if (details?.jailNumber?.toString() === cu?.RowsJailSections?.SectionNumber?.toString()) return cu })
    //   displayData.prisonersCount = custodyD ? custodyD?.RowsIefSupplied?.Count : 0
    //   displayData.total_count = displayData.prisonersCount + displayData.custodyCount

    //   return displayData
    // })
    let data = this.JaildisplayList?.sort((a, b) => {
      return compare(a.sNo, b.sNo, true);
    });

    this.dataSource = new MatTableDataSource(data)

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.total_prisonersCount = this.JaildisplayList.reduce((prev, next) => prev + next.prisonersCount, 0)
    this.total_custodyCount = this.JaildisplayList.reduce((prev, next) => prev + next.custodyCount, 0)
    this.total_total_count = this.JaildisplayList.reduce((prev, next) => prev + next.total_count, 0)
    this.setChart()

  }

  setChart() {
    this.JaildisplayList?.forEach(element => {
      let E = { id: element?.jailNumber, value: element.total_count, name: element.jailName }
      this.resJailData.push(E)
    })
    this.setPieChartOptions(this.resJailData)


  }
  checkCustody(jail_code) {
    let jail = this.JaildisplayList.find(x => { if (x.jailNumber == jail_code?.toString()) return x })
    if (jail.custodyCount > 0) {
      return false
    }
    else return true
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
