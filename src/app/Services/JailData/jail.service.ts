import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MiddlewareService } from '../middleware.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import { BehaviorSubject, map, of, switchMap } from 'rxjs';
import { MOIprisoner } from 'src/app/Models/prisenorDetails';
import { jails_wards, jailsDetails } from 'src/app/Models/Jails';

@Injectable({
  providedIn: 'root'
})
export class JailService {
  getlistbyName(SearchByNameForm) {
    return this.middleWareService.callMiddleware(environment.searchByName, SearchByNameForm).pipe(map(
      (result) => {
        if (result != null) {
          return result
        }
      }
    ));
  }

  public groupedData: any[] = [];
  constructor(private middleWareService: MiddlewareService, private alertService: AlertService) { }

  getCustodyDetails() {
    let body = {
      command: "GET"
    }

    return this.middleWareService
      .callMiddleware(`${environment.custodyStatsInPrison}`, body)
      .pipe(map((res: any) => {
        if (res) {
          if (res.ExportReturnMessage?.Code == 1) {
            let custodyList = res.ExportGroupStats?.row.map(jail => {
              let x: any = {}
              x.jailNumber = jail.ExportGrpJailSections?.SectionNumber
              x.CustodyCount = jail.ExportGrpCountIefSupplied?.Count
              return x

            })
            return custodyList;
          }
          else {
            this.alertService.error(res.ExportReturnMessage?.MessageEn)
            return null
          }
        }
        else {
          this.alertService.error("حدث خطأ")
          return null
        }
      }));
  }

  getCustodyListDetails(jailId: number) {
    let body = {
      ImportJailSections: {
        SectionNumber: jailId
      }
    };

    return this.middleWareService
      .callMiddleware(`${environment.custodyListInPrison}`, body)
      .pipe(map((res: any) => {
        if (res) {
          if (res.ExportReturnMessage?.Code == 1) {
            return res.ExportGroup.row;
          }
          else {
            this.alertService.error(res.ExportReturnMessage?.MessageEn)
            return null
          }
        }
        else {
          this.alertService.error("حدث خطأ")
          return null
        }
      }));
  }
  //======================================================================================================================================================

  getJailData() {
    let body = {};
    return this.middleWareService
      .callMiddleware(`${environment.jailIdrl}`, body).pipe()

  }


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
    return groupedSection
    // Convert object back to array
    //this.groupedData.push({ [jailId]: Object.values(groupedSection) });
  }
  groupCustodyData(data: any) {
    const groupedSection = data.reduce((acc, current) => {
      const sectionNumber = current.ExportGrpCustody.SectionNumber;
      const wardNumber = current.ExportGrpCustody.WardSectionNumber;
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
    return groupedSection
    // Convert object back to array
    //this.groupedData.push({ [jailId]: Object.values(groupedSection) });
  }

  public getBiometricPhoto(personType, personNumber) {
    //==========================biometric==========================================================
    let personForm = {
      ImportPersonEntry: {
        PersonType: personType,
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

    arr.forEach(x => {
      let datePart = x?.RowsJailSentence?.ExpectedEndDate?.substr(0, 8);
      let formattedDate = datePart?.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      if (new Date() > new Date(formattedDate))
        expiredList.push(x)
    })
    console.log(jailID, expiredList)
  }
  //================================================================
  getPersonJailInfo(personType, CivilIdNumber) {
    if (CivilIdNumber != "0") {
      let body = {
        ImportPersonDetails: {
          PersonType: personType,
          PersonNo: CivilIdNumber
        }
      }

      return this.middleWareService
        .callMiddleware(environment.getPersonJailInfo, body)
        .pipe(
          switchMap(result => {
            if (result) {
              if (result?.ExportReturnMessage?.Code == 1) {
                return of(this.setPrisonerData_searchbyID(result))
              } if (result?.ExportReturnMessage?.Code == 2) {
                let custodyForm = {
                  ImportPersonDetails: {
                    PersonType: personType,
                    PersonNo: CivilIdNumber
                  }
                }
                return this.middleWareService.callMiddleware(environment.GetPersonCustodyInfo, custodyForm).pipe(map(custodyInfoResult => {
                  if (custodyInfoResult?.ExportReturnMessage?.Code == 1) {
                    return this.setPrisonerData_searchCustodybyID(custodyInfoResult)
                  }
                  else {
                    this.alertService.error("غير موجود بالسجن")
                    null
                  }
                }))
              }
              else {
                this.alertService.error(result?.ExportReturnMessage?.MessageAr)
                return of(null)
              }

            }
            else {
              return null
            }
          }))
    }
    else {
      this.alertService.error("الرقم المدني غير صحيح")
      return null
    }
  }



  setPrisonerData_searchbyID(result) {
    let p_details = new MOIprisoner()
    p_details.Name = result?.ExportPersonDetails?.PersonNameAr
    p_details.personType = result?.ExportPersonDetails?.PersonType
    //need to check with vishnu
    p_details.nationalNumber = result?.ExportPersonDetails?.NationalNumber
    p_details.civilID = result?.ExportPersonDetails?.CivilId
    p_details.nationality = result?.ExportPersonDetails?.PersonNationality
    p_details.caseNumber = result?.ExportGroupJail?.row[0]?.ExportGrpCase?.CaseNumber
    p_details.caseYearIdent = result?.ExportGroupJail?.row[0]?.ExportGrpCase?.CaseYearIdent
    p_details.caseTypeDescription = result?.ExportGroupJail?.row[0]?.ExportGrpCaseType?.Description
    p_details.jailCode = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.SectionNumber
    p_details.crimeDesciption = result?.ExportGroupJail?.row[0]?.ExportGrpCrimeType?.Description
    p_details.jailName = jailsDetails.get(result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.SectionNumber?.toString())?.j_name
    p_details.wardNumber = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.WardSectionNumber

    p_details.wardName = this.getWardName(p_details.jailCode, p_details.wardNumber)

    p_details.startDate = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.StartDate
    p_details.expectedEndDate = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.ExpectedEndDate
    p_details.DurationYears = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.DurationYears
    p_details.DurationMonths = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.DurationMonths
    p_details.DurationDays = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.DurationDays

    p_details.SuspensionYears = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.SuspensionYears
    p_details.SuspensionMonths = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.SuspensionMonths
    p_details.SuspensionDays = result?.ExportGroupJail?.row[0]?.ExportGrpJailSentence?.SuspensionDays

    return p_details
  }
  setPrisonerData_searchCustodybyID(result) {
    let p_details = new MOIprisoner()
    p_details.Name = result?.ExportPersonDetails?.PersonNameAr
    p_details.personType = result?.ExportPersonDetails?.PersonType
    //need to check with vishnu

    p_details.nationalNumber = result?.ExportPersonDetails?.NationalNumber
    p_details.civilID = result?.ExportPersonDetails?.CivilId
    p_details.nationality = result?.ExportPersonDetails?.PersonNationality

    let row_length = result?.ExportGroupCustody?.row.length - 1
    p_details.caseNumber = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCase?.CaseNumber
    p_details.caseYearIdent = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCase?.CaseYearIdent
    p_details.caseTypeDescription = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCaseType?.Description

    p_details.jailCode = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.SectionNumber
    console.log(p_details.jailCode)
    p_details.jailName = jailsDetails.get(result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.SectionNumber?.toString())?.j_name
    p_details.wardNumber = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.WardSectionNumber

    p_details.wardName = this.getWardName(p_details.jailCode, p_details.wardNumber)

    p_details.crimeDesciption = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCrimeType?.Description
    p_details.startDate = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.StartDate

    p_details.Period = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.Period
    p_details.ReasonHeld = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.ReasonHeld
    p_details.ReasonReleased = result?.ExportGroupCustody?.row[row_length]?.ExportGrpCustody?.ReasonReleased

    return p_details
  }




  getNationalitiesList() {
    let form = {
      command: "DISPLAY",
    };
    return this.middleWareService.callMiddleware(environment.nationalitiesList, form).pipe();
  }

  setPrisonerData_from_JE009(result) {
    let p_details = new MOIprisoner()
    p_details.Name = result?.RowsJeWork?.ConcatArabicName
    p_details.personType = result?.RowsJeWork?.Text1
    p_details.nationalNumber = result?.RowsJeWork?.Number
    p_details.civilID = result?.RowsJeWork?.CivilId
    p_details.nationality = result?.RowsNationality?.ArabicDescription

    p_details.caseNumber = result?.RowsCase?.CaseNumber
    p_details.caseYearIdent = result?.RowsCase?.CaseYearIdent

    p_details.caseTypeDescription = result?.RowsCaseType?.Description
    p_details.crimeDesciption = result?.RowsCrimeType?.Description
    p_details.jailCode = result?.RowsJailSentence?.SectionNumber
    p_details.jailName = jailsDetails.get(result?.RowsJailSentence?.SectionNumber?.toString())?.j_name
    p_details.wardNumber = result?.RowsJailSentence?.WardSectionNumber
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", result?.RowsJailSentence?.SectionNumber)

    p_details.wardName = this.getWardName(p_details.jailCode, p_details.wardNumber)

    p_details.startDate = result?.RowsJailSentence?.StartDate
    p_details.expectedEndDate = result?.RowsJailSentence?.ExpectedEndDate
    p_details.DurationYears = result?.RowsJailSentence?.DurationYears
    p_details.DurationMonths = result?.RowsJailSentence?.DurationMonths
    p_details.DurationDays = result?.RowsJailSentence?.DurationDays

    p_details.SuspensionYears = ""
    p_details.SuspensionMonths = ""
    p_details.SuspensionDays = ""

    return p_details

  }


  setPrisonerData_from_JP004(result) {
    console.log("setPrisonerData_from_JP004", result)
    let p_details = new MOIprisoner()
    p_details.Name = result?.ExportGrpPrisonWorkArea?.NameAr
    p_details.personType = result?.ExportGrpPrisonWorkArea?.PersonType
    //need to check with vishnu
    p_details.nationalNumber = result?.ExportGrpPrisonWorkArea?.PersonNum
    p_details.civilID = result?.ExportGrpPrisonWorkArea?.CivilId
    p_details.nationality = result?.ExportGrpPrisonWorkArea?.NationalityAr
    p_details.caseNumber = result?.ExportGrpCase?.CaseNumber
    p_details.caseYearIdent = result?.ExportGrpCase?.CaseYearIdent
    p_details.caseTypeDescription = result?.ExportGrpCaseType?.Description
    p_details.jailCode = result?.ExportGrpCustody?.SectionNumber
    p_details.jailName = jailsDetails.get(result?.ExportGrpCustody?.SectionNumber?.toString())?.j_name
    p_details.wardNumber = result?.ExportGrpCustody?.WardSectionNumber

    p_details.wardName = this.getWardName(p_details.jailCode, p_details.wardNumber)
    p_details.crimeDesciption = result?.ExportGrpCrimeType?.Description
    p_details.startDate = result?.ExportGrpCustody?.StartDate
    p_details.expectedEndDate = result?.ExportGrpCustody?.ExpectedEndDate
    p_details.DurationYears = result?.ExportGrpCustody?.DurationYears
    p_details.DurationMonths = result?.ExportGrpCustody?.DurationMonths
    p_details.DurationDays = result?.ExportGrpCustody?.DurationDays

    p_details.SuspensionYears = result?.ExportGrpCustody?.SuspensionYears
    p_details.SuspensionMonths = result?.ExportGrpCustody?.SuspensionMonths
    p_details.SuspensionDays = result?.ExportGrpCustody?.SuspensionDays

    p_details.Period = result?.ExportGrpCustody?.Period
    p_details.ReasonHeld = result?.ExportGrpCustody?.ReasonHeld
    p_details.ReasonReleased = result?.ExportGrpCustody?.ReasonReleased

    return p_details

  }



  getWardName(j_code, w_code) {
    let wardsList: Array<any> = jails_wards.get(j_code.toString())
    if (wardsList) {
      let w = wardsList.find((obj: any) => { return obj.ward_code == w_code })
      return w ? w.ward_name : "البيانات غير متوفرة"
    }
    else
      return "البيانات غير متوفرة"
  }

}
