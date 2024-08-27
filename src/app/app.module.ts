import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Forms/login/login.component';
import { ChangePasswordComponent } from './Forms/login/change-password/change-password.component';
import { HomeComponent } from './Forms/home/home.component';
import { BlockCopyPasteDirective } from './Directive/block-copy-paste.directive';
import { NoRightClickDirective } from './Directive/no-right-click.directive';
import { AutoTabDirective } from './Directive/app-auto-tab';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SharedModule } from './Shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { JwtInterceptorProviders } from './Helpers/jwt.interceptor';
import { HttpErrorInterceptorProviders } from './Helpers/http-error.interceptor';
import { FlatpickrModule } from 'angularx-flatpickr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SubMenuComponent } from './Forms/sub-menu/sub-menu.component';
import { ChartDashboardComponent } from './Forms/chart-dashboard/chart-dashboard.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { JailDetailsComponent } from './Forms/jail-details/jail-details.component';
import { SearchByCivilIDComponent } from './Forms/search-by-civil-id/search-by-civil-id.component';
import { SearchByNameComponent } from './Forms/search-by-name/search-by-name.component';
import { CustodyDetailsComponent } from './Forms/custody-details/custody-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangePasswordComponent,
    HomeComponent,
    BlockCopyPasteDirective,
    NoRightClickDirective,
    AutoTabDirective,
    SubMenuComponent,
    ChartDashboardComponent,
    JailDetailsComponent,
    SearchByCivilIDComponent,
    SearchByNameComponent,
    CustodyDetailsComponent
  ],
  imports: [
    NgIdleKeepaliveModule.forRoot(),
    FlatpickrModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ],
  providers: [DatePipe, JwtInterceptorProviders, HttpErrorInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
