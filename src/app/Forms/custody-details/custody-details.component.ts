import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { jails_wards, jailsDetails } from 'src/app/Models/Jails';
import { JailService } from 'src/app/Services/JailData/jail.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custody-details',
  templateUrl: './custody-details.component.html',
  styleUrls: ['./custody-details.component.scss']
})
export class CustodyDetailsComponent implements OnInit {

  constructor(public jailService: JailService, private changeDetector: ChangeDetectorRef) { }

  @Input() jailName
  @Input() jailID
  prisonersList = []
  filteredList = []
  jailInfromation: any = {}
  showDetails = false
  sectionsChartOptions: EChartsOption = {}
  sectionList = []
  isLoading = false
  showList = false
  dataCard = false

  ngOnInit(): void {
    this.isLoading = true
    this.clearData()
    let count = []

    if (this.jailID != '') {
      this.jailService.getCustodyListDetails(this.jailID).subscribe(res => {
        if (res) {

          this.prisonersList = res
          this.jailInfromation = this.jailService.groupCustodyData(res)
          //the list of all sections from  tha api 
          this.sectionList = Object.keys(this.jailInfromation)
          this.sectionList.forEach(element => {
            count.push({ value: this.jailInfromation[element].totalCount, name: this.getJailName(element) })
          });

          let Wardsdata = []
          Object.entries(this.jailInfromation[this.jailID].wards).forEach(element => {
            Wardsdata.push({ value: element[1], name: this.getWardName(this.jailID, element[0]) })
          });

          this.showBarChart(Wardsdata)
          this.changeDetector.detectChanges()

        }
        else {
          this.clearData()
        }
        this.isLoading = false
      })

    }
  }
  clearData() {
    this.showDetails = false
    this.prisonersList = []
    this.filteredList = []
    this.jailInfromation = {}
    this.sectionsChartOptions = {}
    this.sectionList = []
  }


  showBarChart(dataList) {
    this.sectionsChartOptions = {
      title: {

      },
      color: ['#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1'],
      series: [
        {

          itemStyle: {
            borderRadius: 1,
            borderColor: '#fff',
            borderWidth: 1
          },
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            fontSize: '16',
            fontFamily: "NotoKufiArabic-VariableFont_wght",
            fontWeight: 600

          },
          data: dataList,
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
    this.showDetails = true
  }
  getCount(input: any) {
    return Object.keys(input);
  }

  async showPrisonerList(sectionNumber: any, wardNo: any) {
    this.showList = false
    this.filteredList = await this.prisonersList.filter(
      (item: any) =>
        item?.ExportGrpCustody?.SectionNumber.toString() === sectionNumber.toString() &&
        item?.ExportGrpCustody?.WardSectionNumber.toString() === wardNo.toString()

    );
    this.changeDetector.detectChanges()
    this.showList = true
  }

  getJailName(j_code) {
    let j = jailsDetails.get(j_code.toString())?.j_name
    return j ? j : "البيانات غير متوفرة"
  }
  getJailCapacity(j_code) {
    let j = jailsDetails.get(j_code.toString())?.capacity

    return j ? j : 0
  }

  getWardCapacity(j_code, w_code) {
    let wardsList: Array<any> = jails_wards.get(j_code.toString())
    if (wardsList) {
      let w = wardsList.find((obj: any) => { return obj.ward_code == w_code })?.capacity
      return w ? w : 0
    }
    else
      return 0
  }
  getWardName(j_code, w_code) {
    let wardsList: Array<any> = jails_wards.get(j_code.toString())
    if (wardsList) {
      let w = wardsList.find((obj: any) => { return obj.ward_code == w_code })
      return w ? w.ward_name : "البيانات غير متوفرة"
    }
    else
      return "البيانات غير متوفرة"
  }
  getWardDescription(j_code, w_code) {
    let wardsList: Array<any> = jails_wards.get(j_code.toString())
    if (wardsList) {
      let w = wardsList.find((obj: any) => { return obj.ward_code == w_code })
      return w ? w.desc : "البيانات غير متوفرة"
    }
    else
      return "البيانات غير متوفرة"
  }
}
