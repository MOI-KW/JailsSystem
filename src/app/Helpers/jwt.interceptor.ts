import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../Services/login/login.service';
import { User } from '../Models/login/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private router: Router,
    private loginService: LoginService,
    private http: HttpClient,
    private toastController: ToastController,
    private CookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<Object>> {
    let authReq = req;

    const isApiUrl = req.url.startsWith(environment.baseURL);
    return next.handle(authReq).pipe(
      // tap((res:any)=>console.log("res here -- ",res)),
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          isApiUrl &&
          (error.status === 401 || error.status === 403)
        ) {
          return this.handle401Error(authReq, next);
        }
        this.presentToast(error.message);
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((token: any) => {
          // console.log('inside switch map token')
          this.isRefreshing = false;
          return next
            .handle(this.addTokenHeader(request, token.accessToken))
            .pipe();
        }),
        catchError((err) => {
          this.isRefreshing = false;

          this.signOut();
          return throwError(err);
        })
      );
    }

    return EMPTY;
  }

  refreshToken(): Observable<any> {
    const refreshTokenUrl = `${environment.baseURL}${environment.refreshTokenURL}`;
    return this.http.get<any>(refreshTokenUrl, {
      headers: { 'Content-Type': 'application/json' },
      //  observe: 'response',
      withCredentials: true,
    });
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request;
  }

  async presentToast(error: any) {
    const toast = await this.toastController.create({
      message: error,
      cssClass: 'toast-scheme',
      color: 'danger',
      position: 'bottom',
      duration: 2000,
    });

    toast.present();
  }

  signOut(): void {
    let myItem = this.CookieService.get('theme')
      ? this.CookieService.get('theme')
      : 'light';
    this.CookieService.deleteAll();
    localStorage.clear();
    this.CookieService.set('theme', myItem!);
    this.router.navigate(['login']);
  }
}

export const JwtInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
];
