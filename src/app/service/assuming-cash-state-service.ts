import { CashRegisterState } from "../model/cash-register-state-model";
import { OnInit, OnDestroy, Injectable } from "@angular/core";
import { ExchangeOfficeService } from "./exchange-office-service";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { Transaction } from "../model/transaction-model";

@Injectable()
export class AssumingCashStateService implements OnInit, OnDestroy{
    
    private globalCurrencyStateList : CashRegisterState[] = [];
    private globalCurrencyStateListAfterBankTransaction : CashRegisterState [] = [];
    private bankTransactionList : Transaction[] = [];
    // zprivate currenciesAbbreviationList : string [] = ['EUR','USD','CHF','GBP','CAD','AUD','SEK','NOK','DKK','CZK','HUF'];
    private currenciesAbbreviationList : string [] = ['EUR','USD','NOK'];
    private cashRegisterSubscription : Subscription;
    globalCashRegisterChanged = new Subject<CashRegisterState []>();
    bankTransactionChanged = new Subject<Transaction []>();
    bankCashStateChanged = new Subject<CashRegisterState []>();

    constructor(private exchangeOfficeService : ExchangeOfficeService){
        // debugger
        this.cashRegisterSubscription = this.exchangeOfficeService.exchangeOfficeStateIsModify.subscribe( ( flag : boolean) => {
            if(flag == true) {
                this.globalCurrencyStateList = [];
                this.globalCurrencyStateListAfterBankTransaction = [];
                let sumCashRegisterState : CashRegisterState = null;

                this.currenciesAbbreviationList.forEach( (currencyName) => {
                    sumCashRegisterState = this.exchangeOfficeService.sumOfCurrency(currencyName);
                    this.globalCurrencyStateList.push(sumCashRegisterState);
                    this.globalCurrencyStateListAfterBankTransaction.push(
                                    this.updateGlobalCurrencyStateListAfterBankTransaction(sumCashRegisterState));
                })

                this.globalCashRegisterChanged.next(this.globalCurrencyStateList);
                this.bankCashStateChanged.next(this.globalCurrencyStateListAfterBankTransaction);
            }
        })

        // this.currenciesAbbreviationList.forEach( (currencyName) => {
        //     this.globalCurrencyStateList.push(this.exchangeOfficeService.sumOfCurrency(currencyName));
        // })
        // this.globalCashRegisterChanged.next(this.globalCurrencyStateList);
    }

    ngOnInit(){

    }

    getGlobalCurrencyStateList(){
        return this.globalCurrencyStateList;
    }

    getGlobalCurrencyStateListAfterBankTransaction(){
        return this.globalCurrencyStateListAfterBankTransaction;
    }

    setBankTransactionList( transactions : Transaction [] ){
        // debugger
        this.bankTransactionList = transactions;
    
        this.globalCurrencyStateListAfterBankTransaction = [];
        this.globalCurrencyStateList = [];
        let sumCashRegisterState : CashRegisterState = null;

        this.currenciesAbbreviationList.forEach( (currencyName) => {
            sumCashRegisterState = this.exchangeOfficeService.sumOfCurrency(currencyName);
            this.globalCurrencyStateList.push(sumCashRegisterState);
            this.globalCurrencyStateListAfterBankTransaction.push(
                            this.updateGlobalCurrencyStateListAfterBankTransaction(sumCashRegisterState));
        })
                
        this.globalCashRegisterChanged.next(this.globalCurrencyStateList);
        this.bankCashStateChanged.next(this.globalCurrencyStateListAfterBankTransaction);
        this.bankTransactionChanged.next(this.bankTransactionList.slice());
    }

    getBankTransactionList(){
        return this.bankTransactionList.slice();
    }

    addBankTransaction (transaction : Transaction){
        // debugger
        this.bankTransactionList.push(transaction);
        this.updateGlobalCurrencyStateListAfterBankTransactionBecauseNewBankTransaction(transaction);
        this.bankTransactionChanged.next(this.bankTransactionList.slice());
    }

    updateGlobalCurrencyStateListAfterBankTransaction(sumCashRegisterState : CashRegisterState){
        let CurrencyName = sumCashRegisterState.currency;
        let returnedCashRegisterState = new CashRegisterState(sumCashRegisterState.currency, sumCashRegisterState.currencyState,0,0);

        let transactions : Transaction [] = this.bankTransactionList.filter(transaction => transaction.currency == CurrencyName);
        
        transactions.forEach( (transaction) => {
            returnedCashRegisterState.currencyState = returnedCashRegisterState.currencyState - transaction.amountOfCurrency;
        })
        //console.log(returnedCashRegisterState);
        return returnedCashRegisterState;
    }

    updateGlobalCurrencyStateListAfterBankTransactionBecauseNewBankTransaction(transaction : Transaction){
        let currencyName = transaction.currency;
        let cashState : CashRegisterState = this.globalCurrencyStateListAfterBankTransaction
                                                                    .find(state => state.currency == currencyName);
        let cashStateIndex = this.globalCurrencyStateListAfterBankTransaction.indexOf(cashState);
        

        cashState.currencyState = cashState.currencyState - transaction.amountOfCurrency;
        this.globalCurrencyStateListAfterBankTransaction[cashStateIndex] = cashState;
    }

    ngOnDestroy(): void {
        this.cashRegisterSubscription.unsubscribe();
    }
    
}