import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MOIprisoner } from 'src/app/Models/prisenorDetails';
import { JailService } from 'src/app/Services/JailData/jail.service';




@Component({
  selector: 'app-prisoner-detail',
  templateUrl: './prisoner-detail.component.html',
  styleUrls: ['./prisoner-detail.component.scss'],
})

export class PrisonerDetailComponent implements OnInit {
  @Input() selectedPrisonerData: MOIprisoner;
  constructor() {
  }

  pPhoto = ''


  ngOnInit(): void {
    console.log("ss", this.selectedPrisonerData)

  }
}
