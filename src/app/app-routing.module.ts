import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UnicomerComponent } from './components/unicomer/unicomer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { IsLogedGuard } from './guards/is-loged.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path:'', redirectTo: '/unicomer/home', pathMatch:'full'},
  {path:'auth', redirectTo: '/auth/login', pathMatch:'full'},
  {path: 'unicomer', component:UnicomerComponent, canActivate: [AuthGuardGuard], children: [
    {path:'home', component:HomeComponent, canActivate: [AuthGuardGuard]}
  ]},
  {path: 'auth',component:AuthenticationComponent, canActivate: [IsLogedGuard] , children: [
    {path:'login', component:LoginComponent, canActivate: [IsLogedGuard]},
    {path:'register', component:RegisterComponent, canActivate: [IsLogedGuard]}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
