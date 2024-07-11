import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { UserProfileService } from 'src/app/Services/login/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName: string = "";
  userNo: string = "";
  userDept: string = "";
  userExpiry: string = "";
  userRefNum:string=""

  @ViewChild('navbarDropdownUser') navbarDropdownUserEl!: ElementRef;
  @ViewChild('userDropdown') userDropdownEl!: ElementRef;

  constructor(
    private router: Router,
    private CookieService:CookieService,
    public loginService:LoginService, 
    public userService: UserProfileService,
  ) {
    this.AppTitle = environment.AppTitle
   }
   AppTitle
  ngOnInit(): void {

    this.userName = this.CookieService.get('userName')!;
    this.userNo = this.CookieService.get('clientId') ? this.CookieService.get('clientId')?.slice(3)! : "";
    this.userDept = this.CookieService.get('userDept')!;
    this.userExpiry = this.CookieService.get('userExpiry')!;    
    this.userRefNum = this.CookieService.get("userRefNumber")!;
    
    this.userService.getPersonDisplayPhoto(this.userRefNum)
    

    document.getElementsByTagName('html')[0].classList.remove('navbar-vertical-collapsed');

    // const box = document.querySelector('#navHead') as HTMLElement | null;
    // if (this.CookieService.get('theme') == "dark") {    
    //   box?.setAttribute('style', 'background: var(--falcon-card-bg) !important');
    // }
    // else {
    //   box?.setAttribute('style', 'background: #f5f7fa !important');
    // }
  }

  goToLogin() {
    
    let myItem = this.CookieService.get('theme') ? this.CookieService.get('theme') : 'light';
    this.loginService.callGetMiddleware(environment.clearCookies).subscribe();
    this.CookieService.deleteAll();
    this.CookieService.set('theme',myItem!);
    this.router.navigate(["/login"]);
  }

  goToHome() {
    this.hideMenu();
    this.router.navigate(['/home']);
  }

  hideMenu(){
    if(document.getElementById('navbarVerticalCollapse') != null && document.getElementById('navbarVerticalCollapse')?.classList != null) {
      document.getElementById('navbarVerticalCollapse')?.classList.remove("show");
    }
  }

  goToChangePassword() {

    this.router.navigate(['/change-password']);
  }

  themeChange() {

    // this.CookieService.set('theme', this.CookieService.get('theme') == "dark" ? "light" : "dark");
    
    // const boxClick = document.querySelector('#navHead') as HTMLElement | null;
    // if (this.CookieService.get('theme') == "dark") {     
    //   boxClick?.setAttribute('style', 'background: #edf2f9 !important');
    // }
    // else {
    //   boxClick?.setAttribute('style', 'background: var(--falcon-card-bg) !important');
    // }
  }

  @HostListener('document:click', ['$event'])
    handleClick(event: any) {

      const box = document.querySelector('.appStep') as HTMLElement | null;
      if (this.CookieService.get('theme') == "dark") {     
        box?.setAttribute('style', 'background-color: hwb(214deg 14% 76%) !important');
      }
      else {
        box?.removeAttribute('style');
      } 
    }

  @HostListener('window:scroll', ['$event'])
    handleScroll(){
      const windowScroll = window.pageYOffset;
      
      if(windowScroll > 0) {

        this.navbarDropdownUserEl.nativeElement.classList.remove('show');
        this.userDropdownEl.nativeElement.classList.remove('show');
      }
    }
}
