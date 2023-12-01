import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp, faBars, faCaretDown, faCaretUp, faGear, faGift, faHandHoldingUsd, faHouse, faMagnifyingGlass, faQuestion, faQuestionCircle, faRightLeft, faShield, faSignOutAlt, faTag, faWallet, faXmark } from '@fortawesome/free-solid-svg-icons';
import {faBell, faCreditCard} from '@fortawesome/free-regular-svg-icons'
import { NavbarComponent } from './components/navbar/navbar.component';
import { UnicomerComponent } from './components/unicomer/unicomer.component';
import { BalanceChartsComponent } from './components/balance-charts/balance-charts.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoansTableComponent } from './components/loans-table/loans-table.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    NavbarComponent,
    UnicomerComponent,
    BalanceChartsComponent,
    LoansTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HighchartsChartModule
  ],
  providers: [],
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
                     faCaretUp
                     );
  }
 }
