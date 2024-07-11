import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ChangePasswordModel, User } from '../../Models/login/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  timedOut = false;
  lastPing?: Date | null = null;


  constructor(
    private http: HttpClient,
    private idle: Idle,
    private router: Router,
    private keepalive: Keepalive,
    private CookieService:CookieService, 
  
  ) { }
  
  startSessionTimeOut() {
    console.log("startSessionTimeOut")
    this.idle.setIdle(900);
    this.idle.setTimeout(3);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => { 
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.timedOut = true;
      
      let myItem = this.CookieService.get('theme') ? this.CookieService.get('theme') : 'light';
      this.CookieService.deleteAll()
      this.callGetMiddleware(environment.clearCookies).subscribe();
      this.CookieService.set('theme',myItem!);
      this.router.navigate(['/login']);
    });

    this.idle.onIdleStart.subscribe(() => {
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      console.log("countingdown",countdown)
    });

    this.keepalive.interval(3);
    this.keepalive.onPing.subscribe(() => {this.lastPing = new Date()});
    if(this.loggedIn)
    {
      this.reset();
    }
    else
    {
      this.idle.stop()
    }
   
    //here
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }


  //=============================
  callGetMiddleware(url:string){
    return this.http.get<any>(
      `${environment.baseURL}`+url, 
       {
        headers:{ 'Content-Type': 'application/json'  },
      //  observe: 'response',
        withCredentials: true
      }
    ).pipe();
  }


  public login(username: string, password: string): Observable<any> {
    
    let body = {
      // 'userid': 'ZIT' + username,
      'userid': username,
      'password': password
    }

    
    let basicT ="cnNfYXBpX2tleToyaFZPZTAwZzNCRk5lTk1sQkNzZXJ2elVEZVp2UlBYdGtrZXZmUlVNRDk3Ylp5ZTRPVjdxUUt5dkREQVZVQ2RCZTR3MmZQT1ZuQ0Nra2JCTERtV0gzTWJIR2NJSHhCTFpjRVU3MktGdnkwT2dSNUk0NlM1Q0tyT21ZWFl6Z3BIRw=="
    return this.http.post<any>(
      `${environment.baseURL}${environment.loginURL}`, 
      body, 
      {
        headers:{ 'Content-Type': 'application/json', Authorization:`Basic ${basicT}`  },
        withCredentials: true
      }
    ).pipe(map((response:any)=> {
      if(response && response.data && response?.data?.responseData && response?.data?.responseData?.code == "200"){
        //succesful login & sucessful SU with ExportGroup
        if(response?.attributes && response?.attributes?.exitStateType == "3"){
          return response?.data
          //succesful login But
        }else if(response?.attributes && response?.attributes?.exitStateType == "2"){
          let res ={
            resultAr : response?.attributes?.exitStateMsg
          }
          return res;
        }
      }else if(response && response.message){
        let res  ={
          resultAr : response?.message?.resultAr
        }
        return res;
      }
      else if(response?.data?.responseData?.resultAr){
        let res ={
          resultAr : response?.data?.responseData?.resultAr
        }
        return res;
      }else{
        let res ={
          resultAr : response?.resultAr
        }
        return res;
      }
    }))
  }


  public changePassword(formObj: ChangePasswordModel): Observable<any> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(
      `${environment.baseURL}${environment.changePassword}`, 
      formObj, 
      {
        headers:{ 'Content-Type': 'application/json'  },
        withCredentials: true
      }
    ).pipe();
  }

  public isloggedin = new BehaviorSubject(new User());
  loggedIn() {  
    let user = new User();
    this.isloggedin.next(user);
    return !!this.CookieService.get('clientId')
  }
 
}
