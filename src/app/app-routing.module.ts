import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { ExchangeOfficePanelComponent } from "./exchange-office-panel/exchange-office-panel.component";
import { MessagesComponent } from "./messages/messages.component";
import { GlobalCurrencyStateListComponent } from "./global-currency-state-list/global-currency-state-list.component";
import { NewBankTransactionComponent } from "./new-bank-transaction/new-bank-transaction.component";
import { TradeWithBankComponent } from "./trade-with-bank/trade-with-bank.component";
import { AuthGuard } from "./service/auth-guard.service";


const routes : Routes = [

    {   path:'', redirectTo : "/home", pathMatch: 'full' },
    {   path: 'home', component : HomeComponent },
    {   path: 'transactions/history', component: TradeWithBankComponent, canActivate: [AuthGuard]},
    {   path: 'transactions/newTransaction/:transactionId', component: NewBankTransactionComponent, canActivate: [AuthGuard]},
    {   path: 'currencyState', component: GlobalCurrencyStateListComponent, canActivate: [AuthGuard]},
    {   path: 'message', component: MessagesComponent, canActivate: [AuthGuard]},
    {   path: 'login', component: LoginComponent},
    {   path: 'transacions/edit/:transactionId' , component: HomeComponent, canActivate: [AuthGuard]},
    {   path: 'exchangeOffice/:name' , component: ExchangeOfficePanelComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class MainRoutingModule {

}