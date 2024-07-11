import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '../../Services/login/login.service';
import { UserProfileService } from 'src/app/Services/login/user-profile.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormFunctions } from 'src/app/Globals/form';
import { CookieService } from 'ngx-cookie-service';
import { MiddlewareService } from 'src/app/Services/middleware.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  backendError: string = '';
  fieldTextType: boolean = false;

  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: [
      '',
      [Validators.required, Validators.maxLength(8), Validators.minLength(1)],
    ],
  });

  loginErr: string = '';

  isLoading: boolean = false;

  dark: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private loginService: LoginService,
    private userProfileService: UserProfileService,
    private middlewareService: MiddlewareService,
    private router: Router,
    private CookieService: CookieService
  ) {
    if (this.CookieService.get('theme') == 'dark') this.dark = true;
    else this.dark = false;
    this.AppTitle =environment.AppTitle
  }
  AppTitle
  ngOnInit(): void {
    // if (this.CookieService.get("token")) {
    //   this.router.navigate(['/home']);
    // }

    this.onChanges();
  }

  onChanges(): void {
    this.username?.valueChanges.subscribe(() => {
      this.backendError = '';
    });

    this.password?.valueChanges.subscribe(() => {
      this.backendError = '';
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (
      this.loginForm.valid &&
      this.loginForm.get('username')!.value != undefined
    ) {
      this.isLoading = true;
      let password = CryptoJS.AES.encrypt(
        this.loginForm.get('password')!.value,
        'moiPassword'
      ).toString();
      this.loginService
        .login(
          `${environment.clientPrefix}` + this.loginForm.get('username')!.value,
          password
        )
        .subscribe(
          (res: any) => {
            this.isLoading = false;

            if (
              res &&
              (res?.responseData?.['result'] == 'authenticated' ||
                res.responseData?.['code'] == '200')
            ) {
              // localStorage.setItem("password",password)

              return this.getProfile(res);
            } else if (res && res['code'] == '203') {
              let myItem = this.CookieService.get('theme')
                ? this.CookieService.get('theme')
                : 'light';
              this.CookieService.deleteAll();
              this.loginService
                .callGetMiddleware(environment.clearCookies)
                .subscribe();
              this.CookieService.set('theme', myItem!);

              // this.CookieService.set('clientId',environment.clientPrefix + this.loginForm.get('username')!.value)

              setTimeout(() => {
                this.router.navigate(['/reset-password']);
              }, 5000);
            }
            this.loginErr = res['resultAr'];
            this.isLoading = false;
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            this.loginErr = 'خطأ فني';
          }
        );

      setTimeout(() => {
        this.loginErr = '';
      }, 10000);
    }
  }
  getProfile(res: any) {
    let exist = res?.ExportGroup.row?.find(
      (element: any) =>
        element.ExpGrpSuSystemType?.Code == environment.system_name
      // element.ExpGrpSuSystemType?.Code == 'PAYMENTADMIN'
    );

    if (exist) {
      let d = new Date();
      let today =
        d.getFullYear() +
        ('0' + (d.getMonth() + 1)).slice(-2) +
        ('0' + d.getDate()).slice(-2);
      let expiry = res?.ExportUser?.EndDate;
      let expired = expiry < today;

      if (expired) {
        this.loginErr = 'صلاحية المشغل منتهية';
        this.isLoading = false;
        return;
      } else {
        let usersApps = res?.ExportGroup.row;
        this.CookieService.set('usersApps', JSON.stringify(usersApps));
        this.CookieService.set('userID', this.loginForm.get('username')!.value);
        this.CookieService.set('userName', res?.ExportUser.Name);
        this.CookieService.set('userDept', res?.ExportPublicOrganisation.Name);
        this.CookieService.set(
          'userDeptNumber',
          res?.ExportPublicOrganisation.Number
        );

        let end = res?.ExportUser.EndDate;
        let endDate =
          end.slice(0, 4) + '-' + end.slice(4, 6) + '-' + end.slice(6, 8);
        this.CookieService.set('userExpiry', endDate);
        this.CookieService.set(
          'clientId',
          res?.responseData?.clientPrefix + res?.ExportUser?.Number
        );
        this.isLoading = false;

        document
          .getElementsByTagName('html')[0]
          .classList.remove('navbar-vertical-collapsed');

        this.getUserTransactions_SU001(res?.ExportUser?.Number);
        setTimeout(() => {
          this.loginErr = '';
        }, 10000);
      }
    } else {
      this.loginErr = 'ليس لديك الصلاحية لاستخدام هذا النظام';
      this.isLoading = false;
      this.CookieService.deleteAll();
      this.loginService.callGetMiddleware(environment.clearCookies).subscribe();

      return;
    }
  }


  getUserTransactions_SU001(userId: string) {
    this.isLoading = true;

    let body = {
      ImportUser: {
        Number: userId,
      },
      ImportSuSystemType: {
        Code: environment.system_name,
      },
    };

    this.middlewareService.callMiddleware(environment.userAuth, body).subscribe(
      (result) => {
        if (result) {
          this.isLoading = false;
          let allTransactions = result?.ExportGroup?.row.map(
            (e: any) => e.ExpGrpSuFunction.Code
          );
          this.CookieService.set('Roles', JSON.stringify(allTransactions));
          setTimeout(() => {
            window.location.reload();
          }, 500);
          //this.setUserPhotoAccess(userId)

          this.router.navigate(['/home']);
          setTimeout(() => {
            this.loginErr = '';
          }, 10000);
        } else {
          this.loginErr = 'خطأ في صلاحيات المستخدم';
          this.isLoading = false;
          setTimeout(() => {
            this.loginErr = '';
          }, 10000);
        }
      },
      (error: HttpErrorResponse) => {
        this.loginErr = 'خطأ فني';
        this.isLoading = false;
        setTimeout(() => {
          this.loginErr = '';
        }, 10000);
      }
    );
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  checkLen(event: any) {
    return FormFunctions.digitsOnly(event);
  }

  hideCharacters(e: any) {}
}
