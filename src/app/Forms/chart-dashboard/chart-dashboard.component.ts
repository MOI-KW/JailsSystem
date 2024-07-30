import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from 'angular-bootstrap-md/lib/free/utils';
import { EChartsOption } from 'echarts';
import { DataTableConstants } from 'src/app/Globals/datatable';
import { jailsDetails } from 'src/app/Models/Jails';
import { JailService } from 'src/app/Services/JailData/jail.service';
import { MiddlewareService } from 'src/app/Services/middleware.service';
import { environment } from 'src/environments/environment';


declare const utils: any;
@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})

export class ChartDashboardComponent implements OnInit {

  constructor(private middleWareService: MiddlewareService, private changeDetector: ChangeDetectorRef, private jailService: JailService) { }
  tblHeadArr: any[string] = [
    'jailName',
    'total_count',
    'capacity',
    'percent',
    'View',
  ];

  dataSource!: MatTableDataSource<any>;

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

    this.getJailData()
  }
  filterTableData = []
  settable(tableData) {
    console.log("tableData", tableData)
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.filterTableData = tableData;
  }
  ngAfterViewInit() {
    if (this.dataSource?.paginator) {
      this.dataSource.paginator = this.paginator;
    }

  }
  resJailData = []
  async getJailData() {

    let body = {};
    this.middleWareService
      .callMiddleware(`${environment.jailIdrl}`, body)
      .subscribe(res => {
        console.log('jailIdchecked', res.Array.row);
        this.settable(res.Array.row)
        res?.Array?.row?.forEach(element => {
          let E = { id: element.RowsPublicOrganisation?.Number, value: element.RowsIefSupplied?.Count, name: element.RowsPublicOrganisation?.Name }
          this.resJailData.push(E)
        })
        console.log("resJailData", this.resJailData)
        this.setPieChartOptions(this.resJailData)
      }, (err) => { console.log('err', err) }, () => { this.isLoading = false });
  }

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
    let jail = jailsDetails.get(jail_code.toString())
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
}
