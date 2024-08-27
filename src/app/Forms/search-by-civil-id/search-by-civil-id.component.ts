import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private jailService: JailService
  ) { }
  ngOnInit(): void { }
  isLoading = false;
  CivilIdNumber = '';
  showPrisonerCard = false;
  selectedPrisoner = {}

  clearData() {
    this.CivilIdNumber = '';
    this.showPrisonerCard = false;
    this.selectedPrisoner = {}
    this.alertService.hideAlerts();
  }

  search() {
    this.jailService.getPersonJailInfo("1", this.CivilIdNumber).subscribe(result => {
      if (result) {
        this.selectedPrisoner = result
        this.showPrisonerCard = true;
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
