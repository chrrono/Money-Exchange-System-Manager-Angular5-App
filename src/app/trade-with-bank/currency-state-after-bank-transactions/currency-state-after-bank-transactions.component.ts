import { Component, OnInit } from '@angular/core';
import { AssumingCashStateService } from '../../service/assuming-cash-state-service';
import { Subscription } from 'rxjs/Subscription';
import { CashRegisterState } from '../../model/cash-register-state-model';

@Component({
  selector: 'app-currency-state-after-bank-transactions',
  templateUrl: './currency-state-after-bank-transactions.component.html',
  styleUrls: ['./currency-state-after-bank-transactions.component.css']
})
export class CurrencyStateAfterBankTransactionsComponent implements OnInit {

  private cashRegisterSubscription : Subscription;
  private globalCurrencyStateAfterBankTransactionList : Array<CashRegisterState>;

  constructor(private assumingCashStateService : AssumingCashStateService) { 
    this.globalCurrencyStateAfterBankTransactionList = this.assumingCashStateService.getGlobalCurrencyStateListAfterBankTransaction();
  }

  ngOnInit() {

    this.cashRegisterSubscription = this.assumingCashStateService.bankCashStateChanged.subscribe( 
      (cashRegisterStateList : CashRegisterState []) => {
        this.globalCurrencyStateAfterBankTransactionList = cashRegisterStateList;
      })
      
  }

  ngOnDestroy(){
    this.cashRegisterSubscription.unsubscribe();
  }
}
