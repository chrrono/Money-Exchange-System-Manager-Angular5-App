import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirecive } from './header/dropdown.directive';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthHttpService } from './http-service/auth-http-service';
import { ExchangeOfficeService } from './service/exchange-office-service';
import { ExchangeOfficeHttpService } from './http-service/exchange-office-http-service';
import { ExchangeOfficePanelComponent } from './exchange-office-panel/exchange-office-panel.component';
import { CashRegisterStateComponent } from './exchange-office-panel/cash-register-state/cash-register-state.component';
import { TransactionHistoryComponent } from './exchange-office-panel/transaction-history/transaction-history.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesPanelComponent } from './messages/messages-panel/messages-panel.component';
import { NewMessageComponent } from './messages/new-message/new-message.component';
import { MessagesService } from './service/messages.service';
import { MessageSTOMPService } from './http-service/message-stomp-service';
import { DatePipe } from '@angular/common';
import { AssumingCashStateService } from './service/assuming-cash-state-service';
import { GlobalCurrencyStateListComponent } from './global-currency-state-list/global-currency-state-list.component';
import { NewBankTransactionComponent } from './new-bank-transaction/new-bank-transaction.component';
import { BankTransactionsHttpService } from './http-service/bank-transactions-http-service';
import { TradeWithBankComponent } from './trade-with-bank/trade-with-bank.component';
import { BankTransactionListComponent } from './trade-with-bank/bank-transaction-list/bank-transaction-list.component';
import { CurrencyStateAfterBankTransactionsComponent } from './trade-with-bank/currency-state-after-bank-transactions/currency-state-after-bank-transactions.component';
import { AuthGuard } from './service/auth-guard.service';
import { AuthReqInterceptor } from './http-service/authReqInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirecive,
    HomeComponent,
    LoginComponent,
    ExchangeOfficePanelComponent,
    CashRegisterStateComponent,
    TransactionHistoryComponent,
    MessagesComponent,
    MessagesPanelComponent,
    NewMessageComponent,
    GlobalCurrencyStateListComponent,
    NewBankTransactionComponent,
    TradeWithBankComponent,
    BankTransactionListComponent,
    CurrencyStateAfterBankTransactionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainRoutingModule
  ],
  providers: [AuthHttpService,
              ExchangeOfficeService,
              ExchangeOfficeHttpService,
              MessagesService,
              MessageSTOMPService,
              AssumingCashStateService,
              BankTransactionsHttpService,
              DatePipe,
              AuthGuard,
              {provide : HTTP_INTERCEPTORS, useClass: AuthReqInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
