import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ScriptService } from './Services/script.service';
declare var setUser: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScriptService]
})
export class AppComponent {
  title = 'Doc Printing';

  constructor(
    public router: Router,
    private CookieService: CookieService,
    private script: ScriptService
  ) {
    if (typeof ineum !== 'undefined') {

      ineum('trackSessions');
      if (environment.clientPrefix == "ZCS") {
        ineum('key', 'xM2uOUcRSa-aObB18CJTyg');
        ineum('reportingUrl', 'https://app.moi.gov.kw/eum/');

        this.script.load('instanaProd').catch(error => console.log(error));
      }
      else {
        ineum('key', '5ue9g7t8RaWSxYLLlBezCA');
        ineum('reportingUrl', 'https://apptest.moi.gov.kw/eum/');

        this.script.load('instanaTest').catch(error => console.log(error));
      }
      ineum('user', this.CookieService.get('clientId'), this.CookieService.get('userName'));
    }
    else {
      ineum('reportError', 'INSTANA UNDEFINED');
    }

    (window as any).pdfWorkerSrc = './assets/js/pdf.worker.js';
  }

  ngOnInit(): void {

  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(e: KeyboardEvent) {
    if (e.key === 'F12') {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "I") {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "C") {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.key === "J") {
      return false;
    }
    if (e.ctrlKey && e.key == "U") {
      return false;
    }
    return true;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any) {

    if (this.router.url != '/login' && this.router.url != '/') {
      if (event!.target.tagName == "BUTTON" && event!.target.classList.contains("navbar-toggler-humburger-icon")) {

        document.getElementsByTagName('html')[0].classList.toggle('navbar-vertical-collapsed');
        document.getElementById('logoImg')!.style.width = "60px";

        event.stopPropagation();
      }
    }
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    (document.activeElement as HTMLElement)?.blur();
  }

}