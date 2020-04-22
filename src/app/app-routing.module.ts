import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/main/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailsComponent } from './modules/main/user-details/user-details.component';
import { HostManagementComponent } from './modules/main/host-management/host-management.component';
import { MobileVerifyComponent } from './modules/mobile-verification/mobile-verification.component';

const routes: Routes = [
  { path: "login", component : LoginComponent },
  { path: "mobile-verification", component : MobileVerifyComponent },
  // {path: '**', redirectTo: '/'},
  // {
  //   path: "host-management",
  //   component: HostManagementComponent
  // },
  // { path: "",canActivate : [AuthGuard], component : HomeComponent },
// { path: "home", canActivate : [AuthGuard] , component: HomeComponent },
  {
    path: "",
    component: HomeComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: "",
        component: UserDetailsComponent
      },
      {
        path: "host-management",
        component: HostManagementComponent
      }
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
