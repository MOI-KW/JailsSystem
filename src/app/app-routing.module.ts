import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Forms/login/login.component';
import { ChangePasswordComponent } from './Forms/login/change-password/change-password.component';
import { AuthGuard } from './Guards/auth-guard/auth.guard';
import { HomeComponent } from './Forms/home/home.component';
import { SubMenuComponent } from './Forms/sub-menu/sub-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrisonCardComponent } from './prison-card/prison-card.component';
import { PrisonDataComponent } from './prison-data/prison-data.component';
import { DemoComponent } from './demo/demo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'demo', component: PrisonCardComponent },
  { path: 'prisondata/:category', component: PrisonDataComponent },
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
      preloadingStrategy:PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
