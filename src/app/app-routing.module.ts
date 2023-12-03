import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UnicomerComponent } from './components/unicomer/unicomer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path:'', redirectTo: '/unicomer/home', pathMatch:'full'},
  {path:'auth', redirectTo: '/auth/login', pathMatch:'full'},
  {path: 'unicomer', component:UnicomerComponent, children: [
    {path:'home', component:HomeComponent}
  ]},
  {path: 'auth',component:AuthenticationComponent, children: [
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent}
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
