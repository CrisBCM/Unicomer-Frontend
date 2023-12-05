import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UnicomerComponent } from './components/unicomer/unicomer.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { IsLogedGuard } from './guards/is-loged.guard';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { OperationsComponent } from './components/operations/operations.component';
import { TransactionDashboardComponent } from './components/transaction-dashboard/transaction-dashboard.component';
import { WithdrawalDashboardComponent } from './components/withdrawal-dashboard/withdrawal-dashboard.component';
import { DepositDashboardComponent } from './components/deposit-dashboard/deposit-dashboard.component';

const routes: Routes = [
  {path:'', redirectTo: '/unicomer/home', pathMatch:'full'},
  {path:'auth', redirectTo: '/auth/login', pathMatch:'full'},
  {path:'operations', redirectTo: '/operations/deposito'},
  {path: 'unicomer', component:UnicomerComponent, canActivate: [AuthGuardGuard], children: [
    {path:'home', component:HomeComponent, canActivate: [AuthGuardGuard]},
    { 
      path: 'operations', 
      redirectTo: 'operations/deposito', 
      pathMatch: 'full' 
    },
    {path: 'operations', component:OperationsComponent, children:[
      {path: 'transaccion', component:TransactionDashboardComponent},
      {path: 'extraccion', component:WithdrawalDashboardComponent},
      {path: 'deposito', component:DepositDashboardComponent}
    ]}
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
