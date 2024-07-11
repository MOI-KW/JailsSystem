import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../../Services/login/login.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import { matchPasswords } from 'src/app/Shared/generic-validator';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  pwdChanged: boolean = false;

  fieldTextType: boolean = false;
  newPwdFieldTextType: boolean = false;
  confimPwdFieldTextType: boolean = false;

  dark: boolean = false;

  changePasswordForm = this._fb.group(
    {
      // userid : [this.CookieService.get('clientId')], 
      password : ['', [ Validators.required ]],
      newpassword : ['', [ Validators.required, Validators.maxLength(8), Validators.minLength(4), Validators.pattern('^[a-zA-Z\u0600-\u06FF]{4}[a-zA-Z0-9\u0600-\u06FF@#$]{0,4}$') ]],
      confirmpassword : ['', [ Validators.required, Validators.maxLength(8), Validators.minLength(4) ]]
    }, {
      validator: matchPasswords()
    }
  );
  
  constructor(
    private _fb: FormBuilder,
    private loginService: LoginService,
    private alertService: AlertService,
    private router: Router,
    private CookieService: CookieService
  ) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewChecked() {

    if (this.CookieService.get('theme') == "dark") this.dark = true; 
    else this.dark = false;
  }

  get userid() { return this.changePasswordForm.get('userid'); }
  get password() { return this.changePasswordForm.get('password'); }
  get newpassword() { return this.changePasswordForm.get('newpassword'); } 
  get confirmpassword() { return this.changePasswordForm.get('confirmpassword'); } 

  changePassword() {
    this.pwdChanged = true;
    this.changePasswordForm.get('newpassword')?.setValue(CryptoJS.AES.encrypt(this.changePasswordForm.get('newpassword')!.value, 'moiPassword').toString())
    this.changePasswordForm.get('password')?.setValue(CryptoJS.AES.encrypt(this.changePasswordForm.get('password')!.value, 'moiPassword').toString())
    this.changePasswordForm.get('confirmpassword')?.setValue(CryptoJS.AES.encrypt(this.changePasswordForm.get('confirmpassword')!.value, 'moiPassword').toString())
    this.loginService.changePassword(this.changePasswordForm.value).subscribe(res => {
      this.changePasswordForm.reset();
      // this.changePasswordForm.get('userid')?.setValue(this.CookieService.get('clientId'))
      if (res.result == "Password changed successfully") {

        this.pwdChanged = true;

        setTimeout(() => {
          let myItem = this.CookieService.get('theme') ? this.CookieService.get('theme') : 'light';
          localStorage.clear();
          this.CookieService.deleteAll();
          this.CookieService.set('theme',myItem!);
          this.router.navigate(['login']);
        }, 5000);

        this.alertService.success(res["resultAr"]);
      }
      else {
        this.alertService.error(res["resultAr"]);
      }      
    }, (error: HttpErrorResponse) => {
      this.changePasswordForm.reset();
      this.changePasswordForm.get('userid')?.setValue(this.CookieService.get('clientId'))
      this.alertService.error("خطأ في تغيير كلمة المرور");
      this.pwdChanged = false;
    });
  }  


  toggleFieldTextType(field: string = "") {

    switch (field) {

      case "password": this.fieldTextType = !this.fieldTextType; break;
      case "newpassword": this.newPwdFieldTextType = !this.newPwdFieldTextType; break;
      case "confirmpassword": this.confimPwdFieldTextType = !this.confimPwdFieldTextType; break;

      default: break;
    }
  } 
}
