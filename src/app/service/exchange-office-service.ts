import { WorkPlace } from "../model/work-place-model";
import { Injectable } from "@angular/core";
import { Transaction } from "../model/transaction-model";
import { CashRegisterState } from "../model/cash-register-state-model";
import { Subject } from "rxjs/Subject";

@Injectable()
export class ExchangeOfficeService{

    exchangeOfficeList : Array<WorkPlace>;
    SumOfAllCurrencyStateList : Array<CashRegisterState>;
    SumOfAllCurrencyStateListAfterBankTransaction :  Array<CashRegisterState>;
    exchangeOfficeStateIsModify = new Subject<boolean>();
    

    constructor(){}

    sumOfCurrency(currencyName : string) : CashRegisterState {
        let currencySum : number = 0;
        let zloteSum : number = 0;
        let cashRegister : CashRegisterState;

        if(this.exchangeOfficeList == null)
            return new CashRegisterState(currencyName,0,0,0);
        
        this.exchangeOfficeList.forEach( (exchangeOffice) => {
            cashRegister = exchangeOffice.cashRegisterStateList.find(state => state.currency == currencyName);
            currencySum = currencySum + cashRegister.currencyState;
            zloteSum = zloteSum + cashRegister.zloteState;
        })

        let average;
        if(zloteSum == 0 || currencySum == 0)
            average = 0;
        else
            average = Math.round((zloteSum / currencySum)*10000)/10000;
        
        let cashRegisterSum : CashRegisterState = new CashRegisterState(cashRegister.currency, currencySum, zloteSum,average);

        return cashRegisterSum;
    }

    setExchangeOfficeState(exchangeOfficeList : Array<WorkPlace>){
        this.exchangeOfficeList = exchangeOfficeList;
        this.exchangeOfficeStateIsModify.next(true);
    }

    getExchangeOfficeState(name : string) : WorkPlace {
        return this.exchangeOfficeList.filter(n => n.name === name)[0];
    }

    addTransaction(transaction : Transaction ){
        let nameOfMoneyExchange = transaction.moneyExchangeOffice;
        
        let updatedWorkPlace : WorkPlace = this.exchangeOfficeList.find(workPlace => workPlace.name === nameOfMoneyExchange);
        let workPlaceIndex = this.exchangeOfficeList.indexOf(updatedWorkPlace);
        
        this.exchangeOfficeList[workPlaceIndex].transactionsList.push(transaction);
    }
    
    updateCashRegisterState(cashRegisterState : CashRegisterState, moneyExchangeName : string, currency : string){

        let updatedWorkPlace : WorkPlace = this.exchangeOfficeList.find(workPlace => workPlace.name === moneyExchangeName);
        let workPlaceIndex = this.exchangeOfficeList.indexOf(updatedWorkPlace);
        let updateCashRegister = this.exchangeOfficeList[workPlaceIndex].cashRegisterStateList.find(
            state => state.currency === currency);
        let cashRegisterIndex = this.exchangeOfficeList[workPlaceIndex].cashRegisterStateList.indexOf(updateCashRegister);
        this.exchangeOfficeList[workPlaceIndex].cashRegisterStateList[cashRegisterIndex] = cashRegisterState;
        
        this.exchangeOfficeStateIsModify.next(true);
    }

    updateTransactionOfParticularMoneyExchangeOffice(transactions : Transaction[], moneyExchangeName : string){
        let nameOfMoneyExchange = moneyExchangeName;
        let updatedWorkPlace : WorkPlace = this.exchangeOfficeList.find(workPlace => workPlace.name === nameOfMoneyExchange);
        let workPlaceIndex = this.exchangeOfficeList.indexOf(updatedWorkPlace);
        this.exchangeOfficeList[workPlaceIndex].transactionsList = transactions;
    }
}