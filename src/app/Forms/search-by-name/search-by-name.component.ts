import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { JailService } from 'src/app/Services/JailData/jail.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent implements OnInit {

  constructor(private _fb: FormBuilder, private jailService: JailService, private location: Location,) { }
  isLoading = false;
  isSubmited = false;
  PersonListResult
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
      Code: ["1"],
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
          atLeastTwo: "At least two fields has to be provided.",
        } as ValidationErrors);
    };
  }
  showList = false
  search() {
    this.PersonListResult = null
    this.showList = false
    this.isLoading = true
    this.jailService.getlistbyName(this.SearchByNameForm.value).subscribe(result => {
      this.showList = true
      this.isLoading = false
      this.PersonListResult = result
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
  }
}