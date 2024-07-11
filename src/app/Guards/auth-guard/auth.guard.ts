import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


import { UserProfileService } from '../../Services/login/user-profile.service';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/Services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService, private cookiesService: CookieService
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.cookiesService.get("clientId") && this.cookiesService.get("clientId") !="") {
      return true;
    }
    else{
      this.loginService.callGetMiddleware(environment.clearCookies).subscribe();
      this.cookiesService.deleteAll()
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
