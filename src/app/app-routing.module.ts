import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Forms/login/login.component';
import { ChangePasswordComponent } from './Forms/login/change-password/change-password.component';
import { AuthGuard } from './Guards/auth-guard/auth.guard';
import { HomeComponent } from './Forms/home/home.component';
import { SubMenuComponent } from './Forms/sub-menu/sub-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrisonCardComponent } from './Forms/prison-card/prison-card.component';
import { PrisonDataComponent } from './Forms/prison-data/prison-data.component';
import { DemoComponent } from './demo/demo.component';
import { PrisonerDetailComponent } from './Forms/prisoner-detail/prisoner-detail.component';
import { ChartDashboardComponent } from './Forms/chart-dashboard/chart-dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'home', component: ChartDashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'prisondata', component: PrisonDataComponent },
  { path: 'prisoner-details', component: PrisonerDetailComponent },
  {
    path: 'sub-Menu/:ID',
    component: SubMenuComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
