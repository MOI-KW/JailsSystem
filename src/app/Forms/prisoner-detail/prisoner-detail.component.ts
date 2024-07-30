import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JailService } from 'src/app/Services/JailData/jail.service';

@Component({
  selector: 'app-prisoner-detail',
  templateUrl: './prisoner-detail.component.html',
  styleUrls: ['./prisoner-detail.component.scss'],
})
export class PrisonerDetailComponent implements OnInit {
  @Input() selectedPrisonerData: any;
  prisonerData: any[] = [];

  personPhoto = ''

  constructor(private router: Router, private route: ActivatedRoute, private jailService: JailService, private changeDetector: ChangeDetectorRef) {
    // this.selectedPrisonerData = JSON.parse(
    //   localStorage.getItem('selectedData')
    // )?.selectedPrisonerData;
    // debugger;
  }

  ngOnInit(): void {
    console.log("PrisonerDetailComponent")
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

  goBack() {
    this.router.navigate(["prisondata"])
  }
}
