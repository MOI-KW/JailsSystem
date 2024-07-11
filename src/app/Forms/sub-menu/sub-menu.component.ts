import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AlertService } from 'src/app/Shared/alert/alert.service';
import { Menu, mainmenu } from 'src/app/Models/Menu';
@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit {
  constructor(
    public router: Router,
    private CookieService: CookieService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}
  Roles: string[] = [];
  selectedMenu: Menu;
  ngOnInit(): void {
    const rolesString: string | null = this.CookieService.get('Roles');
    if (rolesString) {
      this.Roles = JSON.parse(rolesString);
    }

    let selectedMenuID;
    this.route.paramMap.subscribe((paramMap) => {
      selectedMenuID = paramMap.get('ID');
      //console.log('selectedMenuID',selectedMenuID)
      this.selectedMenu = mainmenu.menuList.find((element: any) => {
        if (element.Id.toString() == selectedMenuID) return element;
      });
    });
  }

  goToPage(submenuRoles, path) {
    if (this.Roles?.indexOf(submenuRoles) > -1) {
      this.router.navigate([path]);
    } else {
      this.alertService.error('ليس لديك صلاحية ');
    }
  }
}
