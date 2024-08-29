import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MOIprisoner } from 'src/app/Models/prisenorDetails';
import { JailService } from 'src/app/Services/JailData/jail.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {

  constructor(private _fb: FormBuilder, private jailService: JailService,
    private location: Location, private ChangeDetector: ChangeDetectorRef) { }
  isLoading = false;
  isSubmited = false;
  PersonListResult;


  nationalities: any[] = [];
  customHeader: any[string] = ['م', 'الرقم المدني', 'الاسم', 'النوع', 'الجنسية', 'الحالة', ''];
  defaultHeader: any[string] = ['No', 'CivilId', 'ArabicFullName', 'Sex', 'ArabicDescription', 'Status', 'Action'];
  tableData: any[] = [];
  showList = false
  selectedPerson: MOIprisoner = null


  SearchByNameForm = this._fb.group({
    ImportPersonEntry: this._fb.group(
      {
        PersonType: [""],
        Arabic1stName: ["", Validators.required],
        Arabic2ndName: [""],
        Arabic3rdName: [""],
        Arabic4thName: [""],
        ArabicFamilyName: [""],
      },
      {
        validator: this.atLeastTwo(
          "Arabic1stName",
          "Arabic2ndName",
          "Arabic3rdName",
          "Arabic4thName",
          "ArabicFamilyName"
        ),
      }
    ),
    ImportNationality: this._fb.group({
      Code: ["1", Validators.required],
      ArabicDescription: [""],
    }),
    command: "DISPLAY",
  });

  atLeastTwo(...fields: string[]) {
    return (fg: FormGroup) => {
      let counter = 0;
      return fields.some((fieldName) => {
        const field = fg.get(fieldName).value;

        // if (typeof field === 'number')  field && field >= 0 ? counter++ : counter--;
        if (field && field.length > 0) {
          counter++;
        } else {
          null;
        }
        if (counter == 2) {
          return true;
        } else {
          return false;
        }
      })
        ? null
        : ({
          atLeastTwo: "يجب ادخال اسمين على الاقل",
        } as ValidationErrors);
    };
  }

  search() {
    this.PersonListResult = null
    this.showList = false
    this.isLoading = true
    this.tableData = []
    this.jailService.getlistbyName(this.SearchByNameForm.value).subscribe(result => {
      this.isLoading = false
      this.PersonListResult = result;
      const mappedResponse = result?.ExportGroup?.row?.map((item, index) => ({
        ...item.ExportGrpPersonEntry,
        ...item.ExportGrpNationality,
        No: index + 1,
        Action: 'eye',
        ArabicFullName: `${item.ExportGrpPersonEntry.Arabic1stName} ${item.ExportGrpPersonEntry.Arabic2ndName} ${item.ExportGrpPersonEntry.Arabic3rdName} ${item.ExportGrpPersonEntry.Arabic4thName} ${item.ExportGrpPersonEntry.ArabicFamilyName}`.trim()
      }));
      mappedResponse ? this.tableData = mappedResponse : [];
      this.tableData.length ? this.showList = true : this.showList = false;


    });
  }
  regex = /^[\u0621-\u064A\u0660-\u0669 ]+$/;
  arabicValidation(event: any) {
    let inputChar = String.fromCharCode(event.charCode);

    if (!this.regex.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  goBack() {
    this.location.back();
  }

  ngOnInit(): void {
    this.setNationalityList();
  }

  setNationalityList() {
    this.jailService.getNationalitiesList().subscribe((result) => {
      this.nationalities = result?.OutGroup?.row.sort((a, b) =>
        a.GrpOutNationality.Code.localeCompare(b.GrpOutNationality.Code)
      );
      this.onNationalityChange(this.nationalities[0].GrpOutNationality.ArabicDescription, this.nationalities[0].GrpOutNationality.Code);
    });

  }

  onNationalityChange(Nationality, code) {
    this.SearchByNameForm.get("ImportNationality")
      .get("ArabicDescription")
      .setValue(Nationality);
    this.SearchByNameForm.get("ImportNationality").get("Code").setValue(code);
  }

  onFetchedRow(eventData: any) {
    this.selectedPerson = null
    this.getPersonJailInfo(eventData?.PersonType, eventData?.CivilId);
  }
  showPrisonerCard = false;
  getPersonJailInfo(personType, CivilIdNumber) {

    this.jailService.getPersonJailInfo(personType, CivilIdNumber).subscribe(result => {

      if (result) {
        this.selectedPerson = result
        this.showPrisonerCard = true;
        this.ChangeDetector.detectChanges()
      }
    })
  }
}