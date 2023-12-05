import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faBars, faCaretDown, faCaretUp, faEye, faEyeSlash, faGear, faGift, faHandHoldingUsd, faHouse, faKeyboard, faMagnifyingGlass, faMoneyBillTransfer, faQuestion, faQuestionCircle, faRightLeft, faShield, faSignOutAlt, faTag, faWallet, faXmark } from '@fortawesome/free-solid-svg-icons';
import {faBell, faCreditCard} from '@fortawesome/free-regular-svg-icons'
import { NavbarComponent } from './components/navbar/navbar.component';
import { UnicomerComponent } from './components/unicomer/unicomer.component';
import { BalanceChartsComponent } from './components/balance-charts/balance-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoansTableComponent } from './components/loans-table/loans-table.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OperationsComponent } from './components/operations/operations.component';
import { TransactionDashboardComponent } from './components/transaction-dashboard/transaction-dashboard.component';
import { DepositDashboardComponent } from './components/deposit-dashboard/deposit-dashboard.component';
import { WithdrawalDashboardComponent } from './components/withdrawal-dashboard/withdrawal-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ModalTransactionComponent } from './components/transaction-dashboard/modal-transaction/modal-transaction.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    UnicomerComponent,
    BalanceChartsComponent,
    LoansTableComponent,
    AuthenticationComponent,
    RegisterComponent,
    OperationsComponent,
    TransactionDashboardComponent,
    DepositDashboardComponent,
    WithdrawalDashboardComponent,
    ModalTransactionComponent,
    ModalConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary){
    library.addIcons(faBars,
                     faXmark,
                     faHouse,
                     faCreditCard,
                     faHandHoldingUsd,
                     faRightLeft,
                     faTag,
                     faShield,
                     faGift,
                     faQuestionCircle,
                     faSignOutAlt,
                     faMagnifyingGlass,
                     faGear,
                     faBell,
                     faWallet,
                     faArrowDown,
                     faArrowUp,
                     faCaretDown,
                     faCaretUp,
                     faKeyboard,
                     faEye,
                     faEyeSlash,
                     faMoneyBillTransfer
                     );
  }
 }
