import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthHttpService } from "./auth-http-service";
import { WorkPlace } from "../model/work-place-model";
import { Injectable, OnDestroy } from "@angular/core";
import { ExchangeOfficeService } from "../service/exchange-office-service";
import { Subscription } from "rxjs/Subscription";
import { Transaction } from "../model/transaction-model";
import { CashRegisterState } from "../model/cash-register-state-model";
import { Message } from "../model/message.model";

@Injectable()
export class ExchangeOfficeHttpService implements OnDestroy {

    private authSubscription : Subscription;

    constructor(private httpClient : HttpClient,
                private authService : AuthHttpService,
                private exchangeOfficeService : ExchangeOfficeService){

                    this.authSubscription = this.authService.ifLoginChanged.subscribe((state : boolean) => {
                        if(state == true)
                            this.getAllExchangeOfices();
                        else
                            this.exchangeOfficeService.setExchangeOfficeState(null);
                    })

                }

    getAllExchangeOfices() {
        this.httpClient.get<Array<WorkPlace>>('http://localhost:8080/WorkPlace/info/all', {
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        })
            .subscribe((wokPlaceList : Array<WorkPlace>) => {
               // console.log(wokPlaceList);
                this.exchangeOfficeService.setExchangeOfficeState(wokPlaceList);
            });
    }

    updateTransactionHistoryAndCashRegisterState( transaction : Transaction){
        let nameOfMoneyExchange : string = transaction.moneyExchangeOffice;
        let currency : string = transaction.currency; 
        
        this.httpClient.get<CashRegisterState>('http://localhost:8080/currencyState/moneyExchangeOffice/'
                +nameOfMoneyExchange+"/currency/"+currency, {
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((cashRegisterState : CashRegisterState) => {
            console.log(cashRegisterState);
            this.exchangeOfficeService.updateCashRegisterState(cashRegisterState,nameOfMoneyExchange,currency);
            this.exchangeOfficeService.addTransaction(transaction);
        });
        
    }

    updateStateOfParticularMoneyExchnageOffice(updateMessage : Message){
        let nameOfMoneyExchange : string = updateMessage.sender;
        let currency : string = updateMessage.content;

        this.httpClient.get<CashRegisterState>('http://localhost:8080/currencyState/moneyExchangeOffice/'
                +nameOfMoneyExchange+"/currency/"+currency, {
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((cashRegisterState : CashRegisterState) => {
            console.log(cashRegisterState);
            this.exchangeOfficeService.updateCashRegisterState(cashRegisterState,nameOfMoneyExchange,currency);
        });

        this.httpClient.get<Transaction []>('http://localhost:8080/transaction/all/'
                +nameOfMoneyExchange+"/currency/"+currency, {
            observe: 'body',
            responseType: 'json',
            headers : new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
        }).subscribe((transactions : Transaction []) => {
            console.log(transactions);
            this.exchangeOfficeService.updateTransactionOfParticularMoneyExchangeOffice(transactions, nameOfMoneyExchange);
});


    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
    

}