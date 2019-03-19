import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../../model/transaction-model';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
 
  @Input() transactionsList : Transaction;

  constructor() {}

  ngOnInit() {
  }

}
