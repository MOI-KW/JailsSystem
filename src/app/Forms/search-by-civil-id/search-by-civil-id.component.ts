import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
    private router:Router
  ) { }
  ngOnInit(): void { }
  isLoading = false;
  CivilIdNumber = '';
  showPrisonerCard = false;
  selectedPrisoner = {};

  prisonerByCivilIdObj:any = {};

  clearData() {
    this.CivilIdNumber = '';
    this.showPrisonerCard = false;
    this.selectedPrisoner = {};
    this.prisonerByCivilIdObj = {};
    this.alertService.hideAlerts();
  }

  search() {
    this.jailService.getPersonJailInfo("1", this.CivilIdNumber).subscribe(result => {
      if (result) {      
        this.selectedPrisoner = result;
        const selectedFieldById = {
          CivilId:result?.ExportPersonDetails?.PersonNo,
          Name:result?.ExportPersonDetails?.PersonNameAr,
          Nationality: result?.ExportPersonDetails?.PersonNationality,
          JailData:result?.ExportGroupJail?.row[0]

        }
        this.router.navigate(['/prisoner-details' ], { state: { data: selectedFieldById },queryParams:{id:selectedFieldById.CivilId} });
        this.showPrisonerCard = true;
      } else {
        alert("Error inside the Server")
      }
    },error => {
      console.log("Error in Server while Hitting DetailsAPI");
    })
  }


  digitsOnly(event: { charCode: any }) {
    return FormFunctions.digitsOnly(event);
  }

  goBack() {
    this.location.back();
  }
}
