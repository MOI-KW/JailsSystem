import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() id = 'default-alert';
  @Input() fade = false;

  alerts: Alert[] = [];
  subscription: Subscription[] = [];

  constructor(
    private router: Router, 
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    
    this.subscription.push(this.alertService.onAlert(this.id).subscribe(alert => {

      let el = this.alerts.filter((e: any) => e.type == alert.type && e.message == alert.message);

      if (el.length == 0) {

        if (alert.message) {

          this.alerts.push(alert);
        }
      }

      if (alert.autoClose) {
         setTimeout(() => this.removeAlert(alert), 2000);
      }
    }));

    this.subscription.push(this.alertService.clearAll.subscribe((clr: any) => {

      if (clr) this.alerts = [];
    }));

    this.subscription.push(this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    }));
  }

  ngOnDestroy() {

    this.subscription.forEach(obj => { obj.unsubscribe(); }); 
  }

  removeAlert(alert: Alert) {

    if (!this.alerts.includes(alert)) return;

    if (this.fade) {

      let el = this.alerts.find(x => x === alert);
      if (el) { el.fade = true; }

      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {

      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {

    let iconClass: string = "";

    switch (alert.type) {
      case 0: iconClass = 'alert alert-dismissible alert-success border-2 d-flex align-items-center'; break; // success
      case 1: iconClass = 'alert alert-dismissible alert-danger border-2 d-flex align-items-center'; break; // error
      case 2: iconClass = 'alert alert-dismissible alert-info border-2 d-flex align-items-center'; break; // info
      case 3: iconClass = 'alert alert-dismissible alert-warning border-2 d-flex align-items-center'; break; // warning

      default: iconClass = "alert alert-secondary border-2 d-flex align-items-center"; break;
    }

    return iconClass;
  }

  // cssColor(alert: Alert) {

  //   let iconClass: string = "";

  //   switch (alert.type) {

  //     case 0: iconClass = "bg-success me-3 icon-item"; break; // success
  //     case 1: iconClass = "bg-danger me-3 icon-item"; break; // error
  //     case 2: iconClass = "bg-info me-3 icon-item"; break; // info
  //     case 3: iconClass = "bg-warning me-3 icon-item"; break; // warning

  //     default: iconClass = "bg-secondary me-3 icon-item"; break;
  //   }

  //   return iconClass;
  // }

  cssIcon(alert: Alert) {

    let iconClass: string = "";

    switch (alert.type) {

      case 0: iconClass = "bi bi-check-circle-fill fs-2 px-2"; break; // success
      case 1: iconClass = "bi bi-x-circle-fill fs-2 px-2"; break; // error
      case 2: iconClass = "bi bi-exclamation-circle-fill fs-2 px-2"; break; // info
      case 3: iconClass = "bi bi-exclamation-circle-fill fs-2 px-2"; break; // warning

      default: iconClass = "fa fa-question-circle fs-2"; break;
    }

    return iconClass;
  }

}
