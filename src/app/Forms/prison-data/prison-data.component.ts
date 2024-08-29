import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableConstants } from 'src/app/Globals/datatable';
import { JailService } from 'src/app/Services/JailData/jail.service';



@Component({
  selector: 'app-prison-data',
  templateUrl: './prison-data.component.html',
  styleUrls: ['./prison-data.component.scss'],
})
export class PrisonDataComponent implements OnInit {

  tableData = [];

  @Input() selectedData: any
  @Input() prisoner_Type: string

  showPrisonerCard = false
  selectedPrisoner
  isLoading = false;
  tblHeadArr: any[string] = [
    'CivilId',
    'ArabicName',
    // 'CaseNumber',
    'Crime',
    'Nationality',
    'startDate',
    'Action',
  ];

  tblHeadArabic: any[string] = [
    'الرقم المدني',
    'الإسم',
    'التهمة',
    'الجنسية',
    'تاريخ السجن',
    '',
  ];

  constructor(private router: Router, private changeDetector: ChangeDetectorRef, private jailService: JailService) {
  }

  ngOnInit(): void {
    this.tableData = this.selectedData
    if (this.prisoner_Type === 'custody') {
      this.mapData_forCustody()
    }
    else {
      this.mapData_forjail()
    }
  }

  ngAfterViewInit() {
  }

  onView(event: any) {
    this.showPrisonerCard = false
    if (this.prisoner_Type == 'custody') {
      console.log("custody", event)
      this.selectedPrisoner = this.jailService.setPrisonerData_from_JP004(event)
    }
    else {
      this.selectedPrisoner = this.jailService.setPrisonerData_from_JE009(event)
    }

    this.jailService.getBiometricPhoto(this.selectedPrisoner.personType, this.selectedPrisoner.nationalNumber).subscribe(resultPhoto => {
      this.selectedPrisoner.Photo = resultPhoto
      this.showPrisonerCard = true
    }
    )


    this.changeDetector.detectChanges()
  }
  goBack() {
    this.router.navigateByUrl('home');
  }
  mapData_forCustody() {

    this.tableData.map(element => {
      console.log("ele", element)
      element.CivilId = element?.ExportGrpPrisonWorkArea?.CivilId
      element.ArabicName = element?.ExportGrpPrisonWorkArea?.NameAr
      element.Crime = element?.ExportGrpCrimeType?.Description
      element.Nationality = element?.ExportGrpPrisonWorkArea?.NationalityAr
      element.startDate = element?.ExportGrpCustody?.StartDate
      element.Action = 'eye'

    })
  }
  mapData_forjail() {
    this.tableData.map(element => {
      element.CivilId = element?.RowsJeWork?.CivilId
      element.ArabicName = element?.RowsJeWork?.ConcatArabicName
      element.Crime = element?.RowsCrimeType?.Description
      element.Nationality = element?.RowsNationality?.ArabicDescription
      element.startDate = element?.RowsJailSentence?.StartDate
      element.Action = 'eye'

    })
  }

}
