import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Menu, mainmenu } from 'src/app/Models/Menu';
import { LoginService } from 'src/app/Services/login/login.service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  subscription: Subscription[] = [];

  menus: Menu[] = [];
  usersApps: any[] = [];

  constructor(
    public router: Router,
    private CookieService: CookieService,
    private alertService: AlertService,
    private loginService: LoginService
  ) { }
  Roles: string[] = [];
  ngOnInit(): void {
    this.loginService.startSessionTimeOut();
    const rolesString: string | null = this.CookieService.get('Roles');
    if (rolesString) {
      this.Roles = JSON.parse(rolesString);
    }

    this.menus = mainmenu.menuList;
  }

  ngOnDestroy() {
    this.subscription.forEach((obj) => {
      obj.unsubscribe();
    });
  }

  goToMenu(id: number, children) {
    if (children?.length > 0) {
      if (
        document.getElementById('subMenu ' + id)?.classList?.contains('hide')
      ) {
        document.getElementById('subMenu ' + id)?.classList?.remove('hide');
        document.getElementById('subMenu ' + id)?.classList?.add('show');
      } else {
        document.getElementById('subMenu ' + id)?.classList?.add('hide');
        document.getElementById('subMenu ' + id)?.classList?.remove('show');
      }
    }
    // this.router.navigate(['sub-Menu/'+id])
  }

  goToPage(submenuRoles, path) {
    if (this.Roles?.indexOf(submenuRoles) > -1) {
      this.router.navigate([path]);
    } else {
      this.alertService.error('ليس لديك صلاحية ');
    }
  }
}
