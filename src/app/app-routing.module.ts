import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/main/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UserDetailsComponent } from './modules/main/user-details/user-details.component';


const routes: Routes = [
  { path: "login", component : LoginComponent },
  {path: '**', redirectTo: '/'},
  // { path: "",canActivate : [AuthGuard], component : HomeComponent },
// { path: "home", canActivate : [AuthGuard] , component: HomeComponent },
  {
    path: "",
    component: HomeComponent,
    pathMatch: 'full',
    canActivate : [AuthGuard],
    children: [
      {
        path: "",
        component: UserDetailsComponent
      },
      // {
      //   path: "app-list",
      //   component: AppListComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
