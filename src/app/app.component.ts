import { Component } from '@angular/core';
import { ExchangeOfficeHttpService } from './http-service/exchange-office-http-service';
import { BankTransactionsHttpService } from './http-service/bank-transactions-http-service';
import { MessageSTOMPService } from './http-service/message-stomp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private exchangeOfficeHttp : ExchangeOfficeHttpService,
              private banksTransactionHttpService : BankTransactionsHttpService,
              private stompHttpService : MessageSTOMPService){};
  title = 'app';
}