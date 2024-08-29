import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormFunctions } from 'src/app/Globals/form';
import { JailService } from 'src/app/Services/JailData/jail.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';

@Component({
  selector: 'app-search-by-civil-id',
  templateUrl: './search-by-civil-id.component.html',
  styleUrls: ['./search-by-civil-id.component.scss']
})
export class SearchByCivilIDComponent implements OnInit {

  constructor(
    private alertService: AlertService,
    private location: Location,
    private jailService: JailService,
    private ChangeDetector: ChangeDetectorRef
  ) { }
  ngOnInit(): void { }
  isLoading = false;
  CivilIdNumber = '';
  showPrisonerCard = false;
  selectedPrisoner = null;

  prisonerByCivilIdObj: any = {};

  clearData() {
    this.CivilIdNumber = '';
    this.showPrisonerCard = false;
    this.selectedPrisoner = null;
    this.prisonerByCivilIdObj = {};
    this.alertService.hideAlerts();
  }

  search() {

    this.jailService.getPersonJailInfo("1", this.CivilIdNumber).subscribe(result => {
      if (result) {
        this.selectedPrisoner = result
        this.jailService.getBiometricPhoto(this.selectedPrisoner.personType, this.selectedPrisoner.nationalNumber).subscribe(resultPhoto => {
          this.selectedPrisoner.Photo = resultPhoto
          this.showPrisonerCard = true;
        })

        this.ChangeDetector.detectChanges()
      }
    })
  }



  digitsOnly(event: { charCode: any }) {
    return FormFunctions.digitsOnly(event);
  }

  goBack() {
    this.location.back();
  }
}
