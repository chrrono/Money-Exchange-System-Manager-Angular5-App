import { Injectable, OnDestroy } from "@angular/core";
import { AuthHttpService } from "./auth-http-service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Transaction } from "../model/transaction-model";
import { AssumingCashStateService } from "../service/assuming-cash-state-service";
import { Subscription } from "rxjs/Subscription";

@Injectable()
export class  BankTransactionsHttpService implements OnDestroy {
    
    private authSubscription : Subscription;

    constructor(private authService : AuthHttpService,
                private assumingService : AssumingCashStateService,
                private httpClient : HttpClient){

                    this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
                        if(state == true)
                            this.getAllBankTransaction();
                        else
                            this.assumingService.setBankTransactionList([]);
                    })
                }

    sendTransaction(transaction : Transaction){
        
        let currency = transaction.currency;
        let exchangeOfficeName = transaction.moneyExchangeOffice;
        this.httpClient.post('http://localhost:8080/transaction/sellToTheBank/create/'+exchangeOfficeName+'/'
                                                                                +currency, transaction,{
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        })
            .subscribe((response : Transaction) => {
                transaction = response; 
                console.log(transaction);
                this.assumingService.addBankTransaction(transaction);
            });
    }

    getAllBankTransaction(){
        this.httpClient.get<Transaction []>('http://localhost:8080/transaction/sellToTheBank/All',{
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((transactions : Transaction []) => {
            //console.log(transactions);
            this.assumingService.setBankTransactionList(transactions);
        })
    }

    ngOnDestroy(){
        this.authSubscription.unsubscribe();
    }

}