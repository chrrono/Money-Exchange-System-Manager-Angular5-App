import { Component, OnInit } from '@angular/core';
import { AuthHttpService } from '../http-service/auth-http-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpenTransaction = false;
  isOpenExchangeOfficeList = false;

  // constructor(private currencyHttp : CurrencyStateHttpService,
  //             private transactionHttp : TransactionHttpService,
  constructor(private authService : AuthHttpService) { }

  ngOnInit() {
    // this.currencyHttp.getCurrencyStates();
    // this.transactionHttp.getTodayTransactionHistory();
  }

  onLoadData(){
    // this.currencyHttp.getCurrencyStates();
    // this.transactionHttp.getTodayTransactionHistory();
  }
  
  changeIsOpenTransaction(){
    this.isOpenTransaction = !this.isOpenTransaction;
  }

  changeIsOpenExchangeOfficeList(){
    this.isOpenExchangeOfficeList = !this.isOpenExchangeOfficeList;
  }

  onLogout(){
    this.authService.logout();
  }
}

