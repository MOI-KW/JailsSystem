import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MiddlewareService } from '../middleware.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  public usersApps = new BehaviorSubject([]);
  public menuIndex = new BehaviorSubject<number>(0);

  constructor(private middleWareService: MiddlewareService) { }

  public userPhotoSubject: BehaviorSubject<string> = new BehaviorSubject('');
  async getPersonDisplayPhoto(personNumber) {
    let userCivilID;
    let userphoto = '';
    if (personNumber?.length == 12) {
      userCivilID = personNumber;
      this.getPersonPassportPhoto(userCivilID);
    } else if (personNumber?.length == 9) {
      let detailsForm = {
        InputParameters: {
          CivilId: '',
          ResidentNatNumber: personNumber,
        },
      };
      this.middleWareService
        .callMiddleware(environment.personDetailsDisplay, detailsForm)
        .subscribe((result) => {
          if (result && result?.Response?.Gender == 'ذكر') {
            userCivilID = result?.Response?.CivilIdNumber;
            this.getPersonPassportPhoto(userCivilID);
          }
        });
    }
    return userphoto;
  }
  getPersonPassportPhoto(userCivilID) {
    let photoForm = {
      InputPassportSet: {
        CivilId: userCivilID, //CivilId
      },
    };
    return this.middleWareService
      .callMiddleware(environment.photo, photoForm)
      .subscribe((result) => {
        if (result != null && result?.Response?.ResponseCode == 1) {
          if (
            result.PassportSet?.PassportImage != null ||
            result.PassportSet?.PassportImage != ''
          ) {
            this.userPhotoSubject.next(
              'data:image/jpg;base64,' + atob(result.PassportSet?.PassportImage)
            );
          }
        }
      });
  }
}
