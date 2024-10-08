import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AlertService } from '../Shared/alert/alert.service';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MiddlewareService {
  constructor(
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient,
    private CookieService: CookieService
  ) { }

  baseUrl: string = environment.baseURL;




  callSahlNotification(form) {
    return this.http
      .post<any>(`${environment.sahlURL}`, form, {
        headers: { 'Content-Type': 'application/json' },
        //  observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((result: any) => {
          if (result && result[0]?.message) {
            return result;
          }
        })
      );
  }

  callGetMiddleware(path) {
    return this.http.get(`${environment.baseURL}` + path).pipe(
      map(
        (response: any) => {
          if (response?.data) {
            return response?.data;
          } else {
            return '';
          }
        },
        catchError((err, caught) => {
          this.alertService.error('حدث خطأ');
          console.log(err);
          return '';
        })
      )
    );
  }


  callPostJailMiddleware(url: string, form: any) {
    let path = `${environment.baseURL}` + url
    let bearerAuth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vaSIsInBhc3N3b3JkIjoibW9pMzIxIiwiaWF0IjoxNzI2MTQxMDgxfQ.HXHpJIIuFbnFSrQkcGAb-2cUOoeQzZwju6vvkxxB6Zg'
    return this.http
      .post<any>(path, form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerAuth}`,
        },
        withCredentials: true,
      }).pipe(
        map(
          (response: any) => {
            if (response?.statusCode != 500) {
              return response;
            }
            else {
              this.alertService.error('حدث خطأ');
              return null
            }
          },
          catchError((err, caught) => {
            this.alertService.error('حدث خطأ');
            console.log(err);
            return '';
          })
        )
      );
  }

  callMiddleware(url: string, form: any) {
    // form.version = environment.RasedVersion
    return this.http
      .post<any>(`${environment.baseURL}` + url, form, {
        headers: { 'Content-Type': 'application/json' },
        //  observe: 'response',
        withCredentials: true,
      })
      .pipe(
        map((result: any) => {
          if (result) {
            //result = this.checkExitStateTypePY(result);
            // console.log(result)
            return result;
          } else {
            this.alertService.error('حدث خطأ');
            return null;
          }
        })
      );
  }

  checkExitStateTypePY(result: any) {
    if (result?.statusCode == 500) {
      this.alertService.error(result?.message);
      return null;
    }
    if (result?.statusCode == 403 || result?.statusCode == 401) {
      this.alertService.error('عفوا ليس لديك الصلاحية');
      //clear-cookies
      let myItem = this.CookieService.get('theme')
        ? this.CookieService.get('theme')
        : 'light';
      localStorage.clear();
      this.CookieService.deleteAll();
      this.CookieService.set('theme', myItem!);
      this.router.navigate(['login']);
      return null;
    }
    if (result && result?.attributes?.exitStateType == '3') {
      if (result?.ExportWebServiceResponse?.ReturnCode) {
        if (
          result?.ExportWebServiceResponse?.ReturnCode == '1' ||
          result?.ExportWebServiceResponse?.ReturnCode == '116' ||
          result?.ExportWebServiceResponse?.ReturnCode == '110'
        )
          return result;
        else {
          //this.alertService.error(result?.ExportWebServiceResponse?.ReturnMessage);
          this.translateErrorMessage(
            result?.ExportWebServiceResponse?.ReturnMessage
          );
          return null;
        }
      } else {
        return result;
      }
    } else {
      this.alertService.error(result?.attributes?.exitStateMsg);
      return null;
    }
  }

  translateErrorMessage(message) {
    if (message != undefined) {
      this.http
        .get('../../assets/Rased-errors.json')
        .subscribe((errors: any) => {
          //let error = errors.find(el => el?.Code == code);
          let error = errors.find((el) => el?.Message == message);
          if (error != null) {
            this.alertService.error(error?.MessageAR);
          } else {
            this.alertService.error(message);
          }
        });
    }
  }
}
