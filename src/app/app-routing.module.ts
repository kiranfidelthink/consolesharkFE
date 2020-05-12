import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/main/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HostManagementComponent } from './modules/main/host-management/host-management.component';
import { MobileVerifyComponent } from './modules/mobile-verification/mobile-verification.component';
import {DashboardsModule} from './modules/dashboards/dashboards.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { HostManagementModule } from './modules/host-management/host-management.module';
import { UserOrgStatusModule } from './modules/userOrgStatus/userOrgStatus.module';
import { RequestStatusComponent } from './modules/main/requestStatus/requestStatus.component';

const routes: Routes = [
  { path: "login", component : LoginComponent },
  { path: "mobile-verification", component : MobileVerifyComponent },
  // {path: '**', redirectTo: 'dashboards'},
  // {
  //   path: "host-management",
  //   component: HostManagementComponent
  // },
  // { path: "",canActivate : [AuthGuard], component : HomeComponent },
// { path: "home", canActivate : [AuthGuard] , component: HomeComponent },
  //   { path: '', redirectTo: 'dashboards', pathMatch: 'full' },

  // { path: 'dashboards', component: HomeComponent, loadChildren: ()=>DashboardsModule },
  {
    path: "",
    canActivate : [AuthGuard],
    pathMatch: 'full',
    redirectTo: 'dashboards',
    // children: [
    //   {
    //     path: "",
    //     component: UserDetailsComponent
    //   },
    //   {
    //     path: "host-management",
    //     component: HostManagementComponent
    //   },
    //   {
    //     path: "paper-trail",
    //     component: PaperTrailComponent
    //   }
      
    // ]
  },
  { path: 'dashboards',canActivate : [AuthGuard], component: HomeComponent, loadChildren: ()=>DashboardsModule },
  { path: 'organization',canActivate : [AuthGuard], component: HomeComponent, loadChildren: ()=>OrganizationsModule },
  { path: 'host-management',canActivate : [AuthGuard], component: HomeComponent, loadChildren: ()=>HostManagementModule },
  { path: 'request-status',canActivate : [AuthGuard], component: RequestStatusComponent, loadChildren: ()=>UserOrgStatusModule}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
