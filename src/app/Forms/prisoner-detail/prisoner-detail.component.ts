import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { JailService } from 'src/app/Services/JailData/jail.service';

@Component({
  selector: 'app-prisoner-detail',
  templateUrl: './prisoner-detail.component.html',
  styleUrls: ['./prisoner-detail.component.scss'],
})
export class PrisonerDetailComponent implements OnInit {
  @Input() selectedPrisonerData: any;
  @Input() PrisonerByCivilId:any;
  paramCivilIdNo:any;
  prisonerByParam:any;
  prisonerData: any[] = [];
  displayData: { key: string; value: any }[] = [];


  personPhoto = ''

  constructor(private router: Router, private route: ActivatedRoute, private jailService: JailService, private changeDetector: ChangeDetectorRef) {
    // this.selectedPrisonerData = JSON.parse(
    //   localStorage.getItem('selectedData')
    // )?.selectedPrisonerData;
    // debugger;
  }

  ngOnInit(): void {
    
    
    if(history?.state?.data){
      this.PrisonerByCivilId = history?.state?.data;
    } else {
      this.route.queryParamMap.subscribe(params => {
        const idParam = params.get('id');
        this.paramCivilIdNo = idParam ? +idParam : null;
        
        this.getPrisonerDetailsById(String(this.paramCivilIdNo))
      });
    }
    
    
    this.personPhoto = ''
    if (this.selectedPrisonerData?.RowsJeWork.Number && this.selectedPrisonerData?.RowsJeWork.Number != '0') {
      this.jailService
        .getBiometricPhoto(
          this.selectedPrisonerData?.RowsJeWork.Number
        )
        .subscribe((NPhoto) => {
          this.personPhoto = NPhoto;
        });
    }
    this.changeDetector.detectChanges()
  }

  getPrisonerDetailsById(civilID:any){
    debugger
    this.jailService.getPersonJailInfo("1", civilID).subscribe(result => {
      if (result) {
       
        this.prisonerByParam = result;
        const selectedFieldById = {
          CivilId:result?.ExportPersonDetails?.PersonNo,
          Name:result?.ExportPersonDetails?.PersonNameAr,
          Nationality: result?.ExportPersonDetails?.PersonNationality,
          JailData:result?.ExportGroupJail?.row[0]

        }
        
        this.PrisonerByCivilId = selectedFieldById;
        
        
      } else {
        alert("Error inside the Server")
      }
    },error => {
      console.log("Error in Server while Hitting DetailsAPI",error);
    })
  }



  goBack() {
    this.router.navigate(["/searchByCivilID"]);
  }
}
