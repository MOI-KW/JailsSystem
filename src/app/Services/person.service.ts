import { Injectable } from '@angular/core';
import { MiddlewareService } from './middleware.service';
import { environment } from 'src/environments/environment';
import { personList } from '../Models/person';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  selectedperson_row_Subject: BehaviorSubject<number> = new BehaviorSubject(-1);
  constructor(private middlewareService: MiddlewareService) { }
  getlistbyName(SearchByNameForm) {
    let GQBC;
    return this.getPersonData(environment.searchByName, SearchByNameForm).pipe(map(
      (result) => {
        if (result != null && result.attributes?.exitStateType == "3") {
          if (result?.ExportGroup?.row?.length > 1) {
            return this.setPersonList(null, result);
          } else if (result?.ExportGroup?.row?.length == 1) {


          }
        }
      }
    ));
  }

  setPersonList(RSABResult: any, GQBCResult: any) {
    let pList = [];
    if (RSABResult != null) {
      RSABResult?.ExportList?.row?.forEach((p) => {
        if (p.ExportLsPersonEntry.PersonType == "1") {
          let newPerson = new personList();
          newPerson.civilID = p.ExportLsPersonEntry?.CivilId;
          newPerson.personNumber = p.ExportLsPersonEntry?.PersonNumber;
          newPerson.personName = p.ExportLsPersonEntry?.ArabicFullName;
          newPerson.nationlity = p.ExportLsPersonEntry?.Nationlity;
          newPerson.birthdate = p.ExportLsPersonEntry?.BirthDate;
          newPerson.sex = p.ExportLsPersonEntry?.Sex;
          pList.push(newPerson);
        }
      });
    } else if (GQBCResult != null) {
      GQBCResult?.ExportGroup?.row?.forEach((p) => {
        if (p.ExportGrpPersonEntry.PersonType == "1") {
          let newPerson = new personList();
          newPerson.civilID = p.ExportGrpPersonEntry?.CivilId;
          newPerson.personNumber = p.ExportGrpPersonEntry?.PersonNumber;
          newPerson.personName =
            p.ExportGrpPersonEntry?.Arabic1stName +
            " " +
            p.ExportGrpPersonEntry?.Arabic2ndName +
            " " +
            p.ExportGrpPersonEntry?.Arabic3rdName +
            " " +
            p.ExportGrpPersonEntry?.Arabic4thName +
            " " +
            p.ExportGrpPersonEntry?.ArabicFamilyName;
          newPerson.birthdate = p.ExportGrpPersonEntry?.BirthDate;
          newPerson.nationlity = p.ExportGrpNationality?.ArabicDescription;
          newPerson.sex = p.ExportGrpPersonEntry?.Sex;
          pList.push(newPerson);
        }
      });
    }
    return pList
  }

  getPersonData(path, form) {
    return this.middlewareService.callMiddleware(path, form).pipe();
  }

}
