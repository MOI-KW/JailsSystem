import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MiddlewareService } from '../middleware.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JailService {
  public groupedData: any[] = [];
  constructor(private middleWareService: MiddlewareService, private alertService: AlertService) { }
  getJailDetails(jailId: number) {
    let body = {
      ImportJailSections: {
        SectionNumber: jailId
      },
      ImportPublicOrganisation: {
        Number: "",
      },
    };

    return this.middleWareService
      .callMiddleware(`${environment.prisonerData}`, body)
      .pipe(map((res: any) => {
        if (res) {
          if (res.OutputParameters?.ReturnCode == 1) {
            return res.Array.row;
          }
          else {
            this.alertService.error(res.OutputParameters?.Message)
            return null
          }
        }
        else {
          this.alertService.error("حدث خطأ")
          return null
        }
      }));
  }

  groupData(data: any) {
    const groupedSection = data.reduce((acc, current) => {
      const sectionNumber = current.RowsJailSentence.SectionNumber;
      const wardNumber = current.RowsJailSentence.WardSectionNumber;
      if (!acc[sectionNumber]) {
        acc[sectionNumber] = {
          sectionNumber: sectionNumber,
          wards: { [wardNumber]: 1 },
          totalCount: 1,
        };
      } else {
        if (!acc[sectionNumber].wards[wardNumber]) {
          acc[sectionNumber].wards[wardNumber] = 1;
        } else {
          acc[sectionNumber].wards[wardNumber]++;
        }
        acc[sectionNumber].totalCount++;
      }

      return acc;
    }, {});
    console.log("groupedSection", groupedSection)
    return groupedSection
    // Convert object back to array
    //this.groupedData.push({ [jailId]: Object.values(groupedSection) });
  }


  public getBiometricPhoto(personNumber) {
    //console.log('get Passport Photo');
    //==========================biometric==========================================================
    let personForm = {
      ImportPersonEntry: {
        PersonType: '1',
        PersonNumber: personNumber,
      },
    };
    return this.middleWareService
      .callMiddleware(environment.biometric_photo, personForm)
      .pipe(
        map((result: any) => {
          if (result.PersonalData?.Photo != null) {
            return 'data:image/jpg;base64,' + result.PersonalData?.Photo;
          } else {
            return '';
          }
        })
      );
  }
  getOutPrisioner(arr, jailID) {
    let expiredList = []
    console.log("getOutPrisioner")

    arr.forEach(x => {
      let datePart = x?.RowsJailSentence?.ExpectedEndDate?.substr(0, 8);
      let formattedDate = datePart?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      if (new Date() > new Date(formattedDate))
        expiredList.push(x)
    })
    console.log(jailID, expiredList)
  }
}
