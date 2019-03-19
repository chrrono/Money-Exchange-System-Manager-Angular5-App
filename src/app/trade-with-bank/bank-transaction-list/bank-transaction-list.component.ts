import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { Transaction } from '../../model/transaction-model';
import { AssumingCashStateService } from '../../service/assuming-cash-state-service';
import { Subscription } from 'rxjs/Subscription';
import { BankTransactionsHttpService } from '../../http-service/bank-transactions-http-service';

@Component({
  selector: 'app-bank-transaction-list',
  templateUrl: './bank-transaction-list.component.html',
  styleUrls: ['./bank-transaction-list.component.css']
})
@Injectable()
export class BankTransactionListComponent implements OnInit, OnDestroy {
  

  private bankTransactionsList : Transaction [] = [new Transaction(0,"",'SellToTheBank',0,0,0,null,null,null)];
  private tansactionsSubscription : Subscription;

  constructor(private assumingService : AssumingCashStateService,
              private bankTransactionsHttpService : BankTransactionsHttpService) { 
    this.tansactionsSubscription = this.assumingService.bankTransactionChanged.subscribe( (transactions : Transaction []) => {
      this.bankTransactionsList = transactions;
    })
    if(this.assumingService.getBankTransactionList() != [])
      this.bankTransactionsList = this.assumingService.getBankTransactionList();
  }

  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    this.tansactionsSubscription.unsubscribe();
  }

}
