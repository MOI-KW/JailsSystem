import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Forms/login/login.component';
import { ChangePasswordComponent } from './Forms/login/change-password/change-password.component';
import { AuthGuard } from './Guards/auth-guard/auth.guard';
import { SubMenuComponent } from './Forms/sub-menu/sub-menu.component';
import { PrisonDataComponent } from './Forms/prison-data/prison-data.component';
import { PrisonerDetailComponent } from './Forms/prisoner-detail/prisoner-detail.component';
import { ChartDashboardComponent } from './Forms/chart-dashboard/chart-dashboard.component';
import { SearchByCivilIDComponent } from './Forms/search-by-civil-id/search-by-civil-id.component';
import { SearchByNameComponent } from './Forms/search-by-name/search-by-name.component';
import { PrintPrisonerDetailsComponent } from './Forms/print-prisoner-details/print-prisoner-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password', component: ChangePasswordComponent },
  { path: 'home', component: ChartDashboardComponent, canActivate: [AuthGuard] },
  { path: 'prisondata', component: PrisonDataComponent, canActivate: [AuthGuard] },
  { path: 'searchByCivilID', component: SearchByCivilIDComponent, canActivate: [AuthGuard] },
  { path: 'searchByName', component: SearchByNameComponent, canActivate: [AuthGuard] },
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
