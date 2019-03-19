import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BankTransactionsHttpService } from '../http-service/bank-transactions-http-service';
import { AssumingCashStateService } from '../service/assuming-cash-state-service';
import { Transaction } from '../model/transaction-model';

@Component({
  selector: 'app-new-bank-transaction',
  templateUrl: './new-bank-transaction.component.html',
  styleUrls: ['./new-bank-transaction.component.css']
})
export class NewBankTransactionComponent implements OnInit {

    currencies = ["EUR","USD","GBP","NOK","SEK","DKK","CHF","AUD","CAD","CZK","HUF"];
    moneyExchangeOfficeList = ["Poczta","Szubryt","Krynica"];
    transactionForm : FormGroup;
    editMode : boolean = false;
    // transactionId : number = null;
    // editedTransaction : Transaction;
    
  
    constructor(private datePipe : DatePipe,
                private bankTransactionHttpService : BankTransactionsHttpService,
                private assumingCashStateService : AssumingCashStateService,
                private activeRoute : ActivatedRoute) { }
  
    ngOnInit() {
      // this.signupForm.setValue({
      //   'userData': {
      //     'username': 'Max',
      //     'email': 'max@test.com'
      //   },
      //   'gender': 'male',
      //   'hobbies': []
      // });
  
      this.transactionForm = new FormGroup({
        'transactionData' : new FormGroup({
          'moneyExchangeOffice' : new FormControl("Poczta"),
          'currency' : new FormControl("EUR"),
          'amountOfCurrency' : new FormControl(null),
          'rateOfExchange' : new FormControl(null),
          'amountOfZlotych' : new FormControl(null)
        })
      });

      this.transactionForm.setValue({
        'transactionData' : {
          'currency' : 'EUR',
          'moneyExchangeOffice' : 'Poczta',
          'amountOfCurrency' : '1200',
          'rateOfExchange' : '4.41',
          'amountOfZlotych' : '5292'
        }
      });
  
      // this.activeRoute.params.subscribe( (params : Params) =>{
      //   this.transactionId = +params['transactionId'];
      //   this.editMode = true;
      //   if(this.transactionId != 0)
      //     this.setValueWhenEditPastTransaction();
      //   else
      //     this.setValueWhenNewTransactionOccure();
      //   });
  
      // this.transactionForm.valueChanges.subscribe(
      //   (value) => console.log(value)
      // );
  
    }
  
    setValueWhenNewTransactionOccure(){
      // this.editMode = false;
      // this.editedTransaction = null;
      // this.transactionId = -1;
      this.transactionForm.setValue({
        'transactionData' : {
          'currency' : 'EUR',
          'type' : 'Buy',
          'amountOfCurrency' : '0',
          'rateOfExchange' : '0.0000',
          'amountOfZlotych' : '0'
        }
      });
    }
  
    // setValueWhenEditPastTransaction(){
    //   this.editedTransaction = this.transactionService.getTransactionById(this.transactionId)[0];
    //   this.transactionForm.setValue({
    //     'transactionData' : {
    //       'currency' : this.editedTransaction.currency,
    //       'type' : this.editedTransaction.type,
    //       'amountOfCurrency' : this.editedTransaction.amountOfCurrency,
    //       'rateOfExchange' : this.editedTransaction.rateOfExchange,
    //       'amountOfZlotych' : this.editedTransaction.amountOfZlotych
    //     }
    //   });
    //   this.transactionForm.get('transactionData.currency').disabled;
    //   this.transactionForm.get('transactionData.type').disabled;
    // }
  
    convert() {  
        let currencyAmount = +this.transactionForm.get('transactionData.amountOfCurrency').value;
        let rate = +this.transactionForm.get('transactionData.rateOfExchange').value;
        let zloteAmount = Math.round((currencyAmount * rate) * 100) / 100;
        this.transactionForm.patchValue({
          'transactionData' : {
            'amountOfZlotych' : zloteAmount
          }
        })
    }
  
    // executeTransaction(){
    //   if(!this.editMode)
    //     this.createAndSendTransaction();
    //   else if(this.editMode)
    //     this.editTransaction();
    // }
  
    // editTransaction(){
    //   let form = this.transactionForm;
    //   this.editedTransaction.amountOfCurrency = form.get('transactionData.amountOfCurrency').value;
    //   this.editedTransaction.amountOfZlotych = form.get('transactionData.amountOfZlotych').value;
    //   this.editedTransaction.rateOfExchange = form.get('transactionData.rateOfExchange').value;
    //   this.transactionHttpService.editTransaction(this.editedTransaction);
    // }
  
    executeTransaction(){
        this.createAndSendTransaction();
    }

    createAndSendTransaction(){
      let now = Date.now();
      let date = this.datePipe.transform(now, "yyyy-MM-dd");
      let time = this.datePipe.transform(now, "yyyy-MM-dd HH:mm:ss");
      let form = this.transactionForm;
      let id = -1;
      let newTransaction  = new Transaction(id,
                                            form.get('transactionData.currency').value,
                                            'SellToTheBank',
                                            form.get('transactionData.amountOfCurrency').value,
                                            form.get('transactionData.amountOfZlotych').value,
                                            form.get('transactionData.rateOfExchange').value,
                                            form.get('transactionData.moneyExchangeOffice').value,
                                            date, time);
                                            
      console.log(newTransaction);
      this.bankTransactionHttpService.sendTransaction(newTransaction);
      // this.transactionHttpService.sendTransaction(newTransaction);


    }
  
  }
  
