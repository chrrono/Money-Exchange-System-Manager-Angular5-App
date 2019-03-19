import { Transaction } from "./transaction-model";
import { CashRegisterState } from "./cash-register-state-model";

export class WorkPlace{
    name : string;
    location : string;
    role : string;
    id : number;
    transactionsList : Array<Transaction>;
    cashRegisterStateList : Array<CashRegisterState>;

    constructor(name : string, location : string, role : string, id : number, transactionList :Array<Transaction>, 
        cashRegisterState : Array<CashRegisterState>){
        this.name = name;
        this.location = location;
        this.role = role;
        this.id = id;
        this.transactionsList = transactionList;
        this.cashRegisterStateList = cashRegisterState;
    }
}