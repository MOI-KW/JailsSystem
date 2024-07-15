import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SideMenu, mainmenu } from 'src/app/Models/Menu';
import { UserProfileService } from 'src/app/Services/login/user-profile.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  subscription: Subscription[] = [];

  usersApps: any[] = [];
  Roles: string[] = [];

  displayMenu: boolean = false;

  appPages: SideMenu[] = [];
  constructor(
    private readonly elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private alertService: AlertService,
    private CookieService: CookieService,
  ) { }

  ngOnInit(): void {
    const rolesString: string | null = this.CookieService.get("Roles");
    if (rolesString) {
      this.Roles = JSON.parse(rolesString);
    }
    this.appPages = [
      {
        title: 'mainmenu',
        titleAr: 'القائمة الرئيسية',
        icon: 'bi-house',
        displayMenu: true,
        router: '/home',
        children: mainmenu.menuList,
        Role: ''
      },
      {
        title: 'mainmenu',
        // titleAr: 'القائمة الرئيسية',
        titleAr:'demo',
        icon: 'bi-house-door-fill',
        displayMenu: true,
        router: '/demo',
        children: mainmenu.menuList,
        Role: ''
      },

    ];

    const script = this.renderer.createElement('script');
    script.src = './assets/js/theme.js';
    this.renderer.appendChild(this.elementRef.nativeElement, script);
  }

  ngOnDestroy() {
    this.subscription.forEach(obj => { obj.unsubscribe(); });
  }

  goToHome() {

    this.router.navigate(['/home']);
  }

  navigateToPage(router: any) {

    this.highlightMenu('parent0');

    this.router.navigate([router]);
  }
  showMenu(roles) {
    if (this.Roles?.indexOf(roles) > -1) {
      return true
    }
    else
      return false
  }
  navigateToChildPage(index, path: string, submenuRoles) {
    if (path == '') {
      if (document.getElementById(index)?.classList?.contains("show")) {
        document.getElementById(index)?.classList?.remove("show")
      }
      else {
        document.getElementById(index)?.classList?.add("show")
      }
    } else {
      this.router.navigate([path]);
    }
  }

  public highlightMenu(index: any) {

    var elems = document.querySelectorAll(".sm_link.active");
    elems.forEach(ele => {
      ele.classList.remove("active");
    });
    document.getElementById(index.toString())?.classList.add("active");
  }
}
