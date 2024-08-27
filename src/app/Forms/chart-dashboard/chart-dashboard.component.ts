import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { DataTableConstants } from 'src/app/Globals/datatable';
import { jailsDetails } from 'src/app/Models/Jails';
import { JailService } from 'src/app/Services/JailData/jail.service';
import { MiddlewareService } from 'src/app/Services/middleware.service';



declare const utils: any;
@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit {

  constructor(private middleWareService: MiddlewareService, private changeDetector: ChangeDetectorRef, private jailService: JailService) { }
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
    let custodyList = []
    this.jailService.getJailData().subscribe(res => {
      console.log('jailIdchecked', res.Array.row);
      this.jailService.getCustodyDetails().subscribe(custodyResult => {
        console.log(custodyResult)
        custodyList = custodyResult
      }, () => { }, () => {
        this.settable(res.Array.row, custodyList)

      })


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
      // legend: {
      //   orient: 'vertical',
      //   left: 'right',
      //   padding: 10,
      //   itemGap: 15,
      //   textStyle: {
      //     fontSize: '16',
      //     fontFamily: "NotoKufiArabic-VariableFont_wght",
      //     fontWeight: 600
      //   }
      // },
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

  getJailDetails(j_id, j_name) {
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

  getJailCapacity(jail_code) {
    let jail = jailsDetails.get(jail_code?.toString())
    if (jail) return jail.capacity
    else return 0

  }

  getPrograssbarStyle(value, totalValue) {
    let percentage = this.getPercentage(value, totalValue)

    return '--falcon-progressbar-width:' + percentage + "%"
  }
  getPrograssClass(value, totalValue) {
    let percentage = this.getPercentage(value, totalValue)
    let percentage_class = ""
    if (Number(percentage) <= 25) {
      percentage_class = "bg-defult"
    }
    else if (Number(percentage) > 25 && Number(percentage) <= 50) {
      percentage_class = "bg-success"
    }
    else if (Number(percentage) > 50 && Number(percentage) <= 75) {
      percentage_class = "bg-warning"
    }
    else if (Number(percentage) > 75) {
      percentage_class = "bg-danger"
    }
    return percentage_class
  }
  getPercentage(value, totalValue) {
    totalValue = totalValue != 0 ? totalValue : 1
    return ((value / totalValue) * 100).toFixed(2)

  }



  settable(jailData, custodyData) {
    console.log("settable", custodyData)
    this.JaildisplayList = jailData.map((details: any, i) => {

      let displayData: any = {}
      displayData.sNo = i + 1
      displayData.jailNumber = details?.RowsJailSections?.SectionNumber
      displayData.jailName = jailsDetails.get(details?.RowsJailSections?.SectionNumber.toString())?.j_name
      displayData.prisonersCount = details?.RowsIefSupplied?.Count
      let custodyD = custodyData.find(cu => { if (cu.jailNumber?.toString() === details?.RowsJailSections?.SectionNumber?.toString()) return cu })
      displayData.custodyCount = custodyD ? custodyD.CustodyCount : 0
      displayData.total_count = displayData.prisonersCount + displayData.custodyCount

      return displayData
    })

    console.log("JaildisplayList", this.JaildisplayList)
    this.dataSource = new MatTableDataSource(this.JaildisplayList);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.setChart()

  }

  setChart() {

    this.JaildisplayList?.forEach(element => {
      let E = { id: element?.jailNumber, value: element.total_count, name: element.jailName }
      this.resJailData.push(E)
    })
    console.log("resJailData", this.resJailData)
    this.setPieChartOptions(this.resJailData)
  }
}
